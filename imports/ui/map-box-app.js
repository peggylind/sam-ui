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
      this.handlePopulationChange = this.props.handlePopulationChange;
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
          var lowrgb = this.props.samprops.allcolors[this.props.samprops.toShow[this.props.samprops.categIndex].factors[0].factorColor].RGB
          var highrgb = this.props.samprops.allcolors[this.props.samprops.toShow[this.props.samprops.categIndex].factors[1].factorColor].RGB
          var r = lowrgb[0]+(Math.abs(highrgb[0]-lowrgb[0])/high)*factor;
          if (r>255){r=255}
          if (r<0){r=0}
          //var g = lowrgb[1]+(Math.abs(highrgb[1]-lowrgb[1])/high)*factor;
          var g = ((lowrgb[1]+255)/high)*factor;
          if (g>255){g=255}
          if (g<0){g=0}
          var b = lowrgb[2]+(Math.abs(highrgb[2]-lowrgb[2])/high)*factor;
          if (b>255){b=255}
          if (b<0){b=0}
          var RGB = [Math.round(r),Math.round(g),Math.round(b)];
          return RGB
        }
      }


    componentDidUpdate(prevProps, prevState) {
      if (this.props.data && prevState.waiting == 1){
        console.log('set samdata '+(Date.now()))
        this.setState({samdata: this.props.data, waiting: 0});
        if (this.props.samprops.limit < 10001){
          this.handlePopulationChange(this.props.samprops.limit+500)
        }
      };
      if (this.props.data != prevState.samdata && prevState.waiting == 0){
        console.log('set samdata again '+(Date.now()))
        this.setState({samdata: this.props.data});
        if (this.props.samprops.limit < 40001){
          this.handlePopulationChange(this.props.samprops.limit+500)
        }
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
        this.props.onMapChange(this.state.viewport,dist4search*1.8);
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
        Loading Data ... thank you for your patience</div>
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
