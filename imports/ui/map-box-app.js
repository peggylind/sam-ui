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
const age = [];
const race = [];


export default class MapBox extends Component {
  constructor(props) {
      super(props);
      this.SamControls = new SamMapControls();
      this.setToolInfo = this.props.setToolInfo;
      this.setClick = this.props.setClick;
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport(this.props.mapprops.viewport),
            time: 0,
            samdata: [coords,age,race],
            waiting: 1,
            //toShow: this.props.samprops.toShow[0],
            toTest: {white:[230,159,0],black:[213,94,0]},
            forColors: this.props.samprops.forColors //maybe have in toShow - have to draw the flow again
        };
  //      this.handleEvent = this.handleEvent.bind(this);
  //      this.emitChangeDebounced = debounce(this.emitChange, 250);
      }
      returnColors (factor) {
        //do color array here for ranges
        //if "factor" is a string, then ...; else {
          //or have things saved on app.js that let us know how to do the interpolation?
        //console.log('in ' +'this.props.samprops.forColors[factor]')
        if(this.props.samprops.toShow[this.props.samprops.categIndex].type == 'factor'){
          return this.props.samprops.forColors[factor]
        }else{
          var low = this.props.samprops.toShow[this.props.samprops.categIndex].low;
          var high = this.props.samprops.toShow[this.props.samprops.categIndex].high;
          var r = 0;
          var g = 0;
          var b = 255;
          var s = (b/high)*factor;
          if (s>255){s=255};
          var RGB = [r+s,g,b-s];
          return RGB
        }
      }


    componentDidUpdate(prevProps, prevState) {
      console.log('this.props.samprops.forColors '+JSON.stringify(this.props.samprops.forColors) + '  ' + this.props.samprops.categIndex)
      if (this.props.data && prevState.waiting == 1){
        this.setState({samdata: this.props.data, waiting: 0});
      };
      if (this.props.data != prevState.samdata && prevState.waiting == 0){
        this.setState({samdata: this.props.data});
        //have to do the set state here with everything from the viewport!!!
        //this.forceUpdate();
      };
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
      };
    };


//https://github.com/uber-common/viewport-mercator-project/blob/master/docs/api-reference/web-mercator-utils.md

  render() {


// const PointCloudMap = new PointCloudLayer({
//   id: 'point-cloud-layer',
//   data: [...this.state.samdata],
//   getPosition: d => [d.coords[0], d.coords[1], 1000],
//   getColor: d => this.props.samprops.forColors[d.race],
//   opacity: 0.85,
//   radiusMinPixels: 1.12,
//   radiusMaxPixels: 100,
//   strokeWidth: 2,
//   radiusScale: 10,
//   outline: false,
//   pickable: true,
//   onHover: ({object}) => this.setToolInfo(object?`${object.race}\n${object.total_income}`:null)
//   //panEnd: info => console.log('panend:', info),
//   // onHover: info => console.log('Hovered:', info),
//   // onClick: info => console.log('Clicked:', info)
// });
//const showCat = 'race'
const ScatterMap = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: [...this.state.samdata],
		getPosition: d => [d.coords[0], d.coords[1]],
    getColor: d => this.returnColors(d[this.props.samprops.catShow]),
    opacity: this.props.samprops.opacity,
    radiusMinPixels: this.props.samprops.radiusMinPixels,
    radiusMaxPixels: this.props.samprops.radiusMaxPixels,
    strokeWidth: this.props.samprops.strokeWidth,
    radiusScale: this.props.samprops.radiusScale,
    outline: this.props.samprops.outline,
    pickable: this.props.samprops.pickable,
    onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setClick(object)
  });
  const layers = [
     ScatterMap
    //PointCloudMap
  ];
    let patience = <div></div>
    if (this.state.waiting){ patience =
        <div style={{position:"absolute",
        marginTop:"30%", marginLeft:"30%", color:"green", fontSize:"2em"}}>
        Loading Data ... please wait</div>
      }

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.state.mapboxApiAccessToken}
        waiting={this.state.waiting}
        mapControls={this.SamControls}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
      {patience}
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
