import React, { Component } from "react";
import DeckGL, { ScatterplotLayer, ArcLayer, LineLayer, PointCloudLayer, MapController, Controller } from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport, {getDistanceScales} from 'viewport-mercator-project';
//import debounce from 'lodash.debounce';
import SamMapControls from './SamMapController';

const west = -95.91;
const east = -94.67;
const north = 30.47;
const south = 28.93;
const coords = [[east,south],[west,north]];


export default class MapBox extends Component {
  constructor(props) {
      super(props);
      //console.log('in mapbox'+JSON.stringify(props.mapprops))
//props should include color1 - color7
//props should include liftup for color and for data to show and for position on map or not?
      const age = [];
      const race = [];
      this.SamControls = new SamMapControls();
      this.setToolInfo = this.props.setToolInfo;
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport(this.props.mapprops.viewport),
            time: 0,
            samdata: [coords,age,race],
            waiting: 1
        };
  //      this.handleEvent = this.handleEvent.bind(this);
  //      this.emitChangeDebounced = debounce(this.emitChange, 250);
      }


    componentDidUpdate(prevProps, prevState) {
      //console.log(this.props.data)
      //there's a 'loading' on the graphQL stuff, but starts late
      //cannot go straight into map, because data async requires waiting.
      if (this.props.data && prevState.waiting == 1){
        this.setState({samdata: this.props.data, waiting: 0});
      }
      if (this.props.data != prevState.samdata && prevState.waiting == 0){
        this.setState({samdata: this.props.data});
        //have to do the set state here with everything from the viewport!!!
        //this.forceUpdate();
      }
      if (this.state.viewport != prevState.viewport){
        var scale = getDistanceScales(this.state.viewport).metersPerPixel[0];
        var width = window.innerWidth;
        var worldWidth = width*scale;
        var height = window.innerHeight;
        var worldHeight = height*scale; //number of meters in window
        if (worldHeight>worldWidth){
          var dist4search = worldHeight
        }else{
          var dist4search = worldWidth
        };
        this.props.onMapChange(this.state.viewport,dist4search);
        console.log('dist4search')
        console.log(dist4search)
      };
    };

//https://github.com/uber-common/viewport-mercator-project/blob/master/docs/api-reference/web-mercator-utils.md

  render() {

//have layers list from named layers - so can move between easier
//point-cloud layer lets you do 3d - https://github.com/uber/deck.gl/blob/master/docs/layers/point-cloud-layer.md
//     const layers = [
    //   layerTests,
//   // new ArcLayer({
//   //   id: 'arc-layer',
//   //   strokeWidth: 10,
//   //   data: [
//   //     { sourcePosition: [-95.91, 30.47], targetPosition: [-95.91, 30.93], color: [255, 0, 255] },
//   //   ],
//   // }),

const PointCloudMap = new PointCloudLayer({
  id: 'point-cloud-layer',
  data: [...this.state.samdata],
  getPosition: d => [d.coords[0], d.coords[1], 1000],
  getColor: d => (d.race === "White" ? [133, 137, 247] :
                  d.race === "Black or African American" ? [65, 247, 37] :
                  d.race === "Asian" ? [247, 36, 155] :
                  d.race === "Hispanic or Latino" ? [24, 249, 238] :
                  d.race === "Some Other Race" ? [119, 3, 196] :
                  d.race === "Two or More Races" ? [242, 100, 72] : [63, 61, 60]),
  opacity: 0.85,
  radiusMinPixels: 1.12,
  radiusMaxPixels: 100,
  strokeWidth: 2,
  radiusScale: 10,
  outline: false,
  pickable: true,
  onHover: ({object}) => this.setToolInfo(object?`${object.race}\n${object.total_income}`:null)
  //panEnd: info => console.log('panend:', info),
  // onHover: info => console.log('Hovered:', info),
  // onClick: info => console.log('Clicked:', info)
});
const ScatterMap = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: [...this.state.samdata],
		getPosition: d => [d.coords[0], d.coords[1]],
    // data: [
    //   { position: [-94.67, 28.93], radius: 50, color: [0, 255, 0] },
    // ],
//either nested ternary or an input that builds a list??
    // getColor: nested ternary for race, age, income, ?? d => (d.age === "25 to 29" ? [0, 255, 0] :
    //                 d.age === "55 to 64" ? [0, 0, 255] : [255, 0, 0]),
    getColor: d => (d.race === "White" ? [133, 137, 247] :
                    d.race === "Black or African American" ? [65, 247, 37] :
                    d.race === "Asian" ? [247, 36, 155] :
                    d.race === "Hispanic or Latino" ? [24, 249, 238] :
                    d.race === "Some Other Race" ? [119, 3, 196] :
                    d.race === "Two or More Races" ? [242, 100, 72] : [63, 61, 60]),
    opacity: 0.85,
    radiusMinPixels: 1.12,
    radiusMaxPixels: 100,
    strokeWidth: 2,
    radiusScale: 10,
    outline: false,
    pickable: true,
    onHover: ({object}) => this.setToolInfo(object?`${object.race}\n${object.total_income}`:null)
    //panEnd: info => console.log('panend:', info),
    // onHover: info => console.log('Hovered:', info),
    // onClick: info => console.log('Clicked:', info)
  });
  // new LineLayer({
  //   id: 'line-layer',
  //   strokeWidth: 10,
  //   data: [
  //     { sourcePosition: [-95.01, 30.47], targetPosition: [-95.01, 28.93], color: [255, 0, 0] },
  //   ],
  // }),
  const layers = [
     ScatterMap
    //PointCloudMap
];

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.state.mapboxApiAccessToken}
        waiting={this.state.waiting}
        mapControls={this.SamControls}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        {this.state.waiting && <div style={{position:"absolute",
            marginTop:"30%", marginLeft:"30%", color:"green", fontSize:"2em"}}>
            Loading Data ... please wait</div>}

        <DeckGL
          {...this.state.viewport}
          initialViewState={this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          layers={layers}
        >
        </DeckGL>
      </ReactMapGL>
    );
  }
}
