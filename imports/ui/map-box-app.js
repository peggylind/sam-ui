import React from 'react';
import DeckGL, { ScatterplotLayer, ArcLayer, LineLayer, MapController, Controller } from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport, {getDistanceScales} from 'viewport-mercator-project';
//import debounce from 'lodash.debounce';
import SamMapControls from './SamMapController';

const west = -95.91;
const east = -94.67;
const north = 30.47;
const south = 28.93;
const coords = [[east,south],[west,north]];

export default class MapBox extends React.Component {
  constructor(props) {
      super(props);
      //console.log('in mapbox'+JSON.stringify(props.mapprops))
      //const { data = {coords:[]} } = this.props;

      const age = [];
      const race = [];
      this.SamControls = new SamMapControls({wtf:'wert'});
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
        this.props.onMapChange(this.state.viewport,dist4search*1.2);
        //console.log(this.state.viewport)
      };
    };
//https://github.com/uber-common/viewport-mercator-project/blob/master/docs/api-reference/web-mercator-utils.md
    componentDidMount() {
      // var scale = getDistanceScales(this.state.viewport).metersPerPixel[0];
      // //centerWorld gives array of two
      // var centerWorld = lngLatToWorld([this.state.viewport.longitude,
      //   this.state.viewport.latitude],scale);
      // var width = window.innerWidth;
      // var worldWidth = width*scale;
      // console.log('worldWidth')
      // console.log(worldWidth)
      // var height = window.innerHeight;
      // var worldHeight = height*scale; //number of meters in window
      // var topLeft = [centerWorld[0]-(width/2),centerWorld[1]+(height/2)]
      // var topLeftLL = worldToLngLat(topLeft,scale);
      // console.log('topLeftLL')
      // console.log(topLeftLL)
      //
      // var bottomRight = [centerWorld[0]+(width/2),centerWorld[1]-(height/2)]
      // var bottomRightLL = worldToLngLat(bottomRight,scale)
      // console.log('bottomRightLL')
      // console.log(bottomRightLL)
      // var fit2bounds = fitBounds({width: width, height: height,
      //   bounds:[topLeftLL,bottomRightLL]})
      // console.log(fit2bounds)
      //it has the right middle point, but not the right zoom - distances are right;
      //take larger of two for distance in mongo search??
//fit2bounds gives the new
    }
    // handleEvent(event) {
    //   console.log(event)
    //     if (event.type === 'panend') {
    //       console.log('panedn')
    //         // do something
    //     } else {
    //         super.handleEvent(event);
    //     }
    // }
    // handleChange(e) {
    //   console.log('this is just'+e)
    //   this.evalue = e.target.value;
    //   this.emitChangeDebounced(e.target.value);
    // }
    // //register value on parent's function
    // emitChange(value) {
    //   this.props.onChange(value);
    // }


  render() {

    const layers = [
  // new ArcLayer({
  //   id: 'arc-layer',
  //   strokeWidth: 10,
  //   data: [
  //     { sourcePosition: [-95.91, 30.47], targetPosition: [-95.91, 30.93], color: [255, 0, 255] },
  //   ],
  // }),
  new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: [...this.state.samdata],
		getPosition: d => [d.coords[0], d.coords[1]],
    // data: [
    //   { position: [-94.67, 28.93], radius: 50, color: [0, 255, 0] },
    // ],
    getColor: d => (d.age === "25 to 29" ? [0, 255, 0] : [0, 0, 255]),
    opacity: 0.35,
    radiusMinPixels: 1.12,
    radiusScale: 10,
    outline: false,
    pickable: true
    //panEnd: info => console.log('panend:', info),
    // onHover: info => console.log('Hovered:', info),
    // onClick: info => console.log('Clicked:', info)
  }),
  // new LineLayer({
  //   id: 'line-layer',
  //   strokeWidth: 10,
  //   data: [
  //     { sourcePosition: [-95.01, 30.47], targetPosition: [-95.01, 28.93], color: [255, 0, 0] },
  //   ],
  // }),
]

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
