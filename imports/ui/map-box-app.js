import React, { Component } from "react";
import DeckGL, { GeoJsonLayer, ScatterplotLayer, ArcLayer, LineLayer, PointCloudLayer, MapController, Controller } from 'deck.gl';
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

const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};
const firstgeojson = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
};

export default class MapBox extends Component {
  constructor(props) {
      super(props);
      this.SamControls = new SamMapControls();
      this.setToolInfo = this.props.setToolInfo;
      this.setClick = this.props.setClick;
      this.setWaiting = this.props.setWaiting;
      this.handlePopulationChange = this.props.handlePopulationChange;
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport(this.props.mapprops.viewport),
            time: 0,
            samdata: this.props.samdata || [],
          //  geojsonsam: [firstgeojson],
            waiting: 1,
            //toShow: this.props.samprops.toShow[0],
            toTest: {white:[230,159,0],black:[213,94,0]},
            forColors: this.props.samprops.forColors //maybe have in toShow - have to draw the flow again
        };
  //      this.handleEvent = this.handleEvent.bind(this);
  //      this.emitChangeDebounced = debounce(this.emitChange, 250);
      }

      returnColors (factor) {
        //do color array here for ranges - also in scatterdata
        //if "factor" is a string, then ...; else {
          //or have things saved on app.js that let us know how to do the interpolation?
        // console.log('in ' +'this.props.samprops.forColors[factor]'+factor)
        if(this.props.samprops.toShow[this.props.samprops.categIndex].type == 'factor'){
          return this.props.samprops.forColors[factor]
        }else{
          var low = this.props.samprops.toShow[this.props.samprops.categIndex].low;
          var high = this.props.samprops.toShow[this.props.samprops.categIndex].high;
          var lowrgb = this.props.samprops.allcolors[this.props.samprops.toShow[this.props.samprops.categIndex].factors[0].factorColor].RGB
          var highrgb = this.props.samprops.allcolors[this.props.samprops.toShow[this.props.samprops.categIndex].factors[1].factorColor].RGB
          let RGB = lowrgb;
          if(factor>1){
            let half = (high+low)/2;
            if (factor>half){RGB=highrgb};
          }else{
            console.log(factor)
            if(factor <= -0.45){RGB=highrgb};
          }
          // var r = lowrgb[0]+(Math.abs(highrgb[0]-lowrgb[0])/high)*factor;
          // if (r>255){r=255}
          // if (r<0){r=0}
          // //var g = lowrgb[1]+(Math.abs(highrgb[1]-lowrgb[1])/high)*factor;
          // var g = ((lowrgb[1]+255)/high)*factor;
          // if (g>255){g=255}
          // if (g<0){g=0}
          // var b = lowrgb[2]+(Math.abs(highrgb[2]-lowrgb[2])/high)*factor;
          // if (b>255){b=255}
          // if (b<0){b=0}
          // var RGB = [Math.round(r),Math.round(g),Math.round(b)];
          return RGB
        }
      }
    componentDidMount(){
      //console.log('componentDidMount')
      //this.setState({geojsonsam:this.props.geojsonsam})
    };

    componentDidUpdate(newProps, prevState) {
      console.log('map-box updated'+JSON.stringify(newProps.samprops.waiting)+JSON.stringify(prevState.waiting))
      //console.log(JSON.stringify(this.props.samprops.catShow))
      if (this.props.geojsonsam != newProps.geojsonsam){
        console.log(this.props.geojsonsam)
         this.setState({geojsonsam:this.props.geojsonsam})
       };
      if (this.props.data && prevState.waiting == 1){
      //  this.setState({geojsonsam:this.props.geojsonsam})
        console.log('set samdata '+(Date.now()))
        this.setState({samdata: this.props.data, waiting: 0});
        this.setWaiting(0);
        // if (this.props.samprops.limit < 10001){
        //   this.handlePopulationChange(this.props.samprops.limit+500)
        // }
      };
      if (this.props.data != prevState.samdata && prevState.waiting == 0){
        console.log('set samdata new '+(Date.now()))
        this.setState({samdata: this.props.data});
        this.setWaiting(0);
        // if (this.props.samprops.limit < 10001){ //instead of 40001
        //   this.handlePopulationChange(this.props.samprops.limit+7000)
        // }
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
    //const data = this.state.geojsonsam;
    //this.props.geojsonsam
const GeoMap = new GeoJsonLayer({
  id: 'geojson-layer',
  data: this.state.geojsonsam,
  pickable: true,
  stroked: false,
  filled: true,
  extruded: false,
  lineWidthScale: 20,
  lineWidthMinPixels: 2,
//    getFillColor: [160, 160, 180, 200],
//    getLineColor: d => colorToRGBArray(d.properties.color),
  getRadius: 100,
  getLineWidth: 100,
  getElevation: 30,
  onHover: ({object}) => this.setToolInfo(object),

  //getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
  getFillColor: [255, 255, 255, 50],
  getLineColor: [0, 0, 0]
  //lightSettings: LIGHT_SETTINGS,

})

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
    //radiusScale: this.props.samprops.radiusScale,
    outline: this.props.samprops.outline,
    pickable: this.props.samprops.pickable,
    //onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setToolInfo(object) //,this.setClick(object)
  });
  const main_layers = [
     GeoMap,
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
      
        <DeckGL
          {...this.state.viewport}
          initialViewState={this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
          layers={main_layers}
          >
          </DeckGL>

      </ReactMapGL>
    );
  }
}
