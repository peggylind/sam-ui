import React, { Component } from "react";
import DeckGL, { GeoJsonLayer, ScatterplotLayer, ArcLayer, LineLayer, GridLayer, GridCellLayer, HexagonLayer, PointCloudLayer, ContourLayer, MapController, Controller } from 'deck.gl';
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
            waiting: 1,
            toTest: {white:[230,159,0],black:[213,94,0]},
            forColors: this.props.samprops.forColors //maybe have in toShow - have to draw the flow again
        };
      }

      returnheight (factor) {
        let min = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].low
        let max = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].high
        //function(val, max, min) { return (val - min) / (max - min); }
        return ((factor[this.props.samprops.scaleShow]-min) / (max - min)) * (this.props.samprops.height/2)
      }

      returnColors (factor) {
        //if(this.props.samprops.toShow[this.props.samprops.categIndex].type == 'factor'){
          return this.props.samprops.forColors[factor]
        //}
      }
    componentDidMount(){
      console.log('componentDidMount in mapbox '+this.props.samprops.catShow)
      //this.setState({geojsonsam:this.props.geojsonsam})
    };

    componentDidUpdate(newProps, prevState) {
      //console.log('map-box updated'+JSON.stringify(newProps.samprops.waiting)+JSON.stringify(prevState.waiting))
      console.log('map-box updated'+JSON.stringify(this.props.samprops.catShow))
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
        this.props.onMapChange(this.state.viewport,dist4search,worldHeight);
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
  //onHover: ({object}) => this.setToolInfo(object),
  //autoHighlight: true,
  //getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
  getFillColor: [255, 255, 255, 255],
  getLineColor: [255, 0, 0, 255]
  //lightSettings: LIGHT_SETTINGS,

})

const PointCloudMap = new PointCloudLayer({
  id: 'point-cloud-layer',
  data: [...this.state.samdata],
  getPosition: d => [d.coords[0], d.coords[1], this.returnheight(d)],
  getColor: d => this.returnColors(d[this.props.samprops.catShow]),
  opacity: this.props.samprops.opacity,
  radiusMinPixels: this.props.samprops.radiusMinPixels,
  radiusMaxPixels: this.props.samprops.radiusMaxPixels,
  strokeWidth: this.props.samprops.strokeWidth,
  //radiusScale: this.props.samprops.radiusScale,
  outline: this.props.samprops.outline,
  pickable: this.props.samprops.pickable,
  autoHighlight: true,
  //onHover: ({object}) => this.setToolInfo(object),
  onClick: ({object}) => this.setClick(object)
});
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
    autoHighlight: true,
    //onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setClick(object)
  });
  const HexMap = new HexagonLayer({
    id: 'hex-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    radius: 1000,
    elevationScale: 4,
    getPosition: d => [d.coords[0], d.coords[1]],
    onHover: ({object}) => this.setToolInfo(`${object.position.join(', ')}\nCount: ${object.count}`)
  });
  const GridMap = new GridLayer({
    id: 'grid-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    cellSize: 1000,
    elevationScale: 4,
    getPosition: d => [d.coords[0], d.coords[1]],
    onHover: ({object}) => this.setToolInfo(`${object.position.join(', ')}\nCount: ${object.count}`)
  });
  const GridCellMap = new GridCellLayer({
    id: 'grid-cell-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    cellSize: 1000,
    elevationScale: 4,
    getPosition: d => [d.coords[0], d.coords[1]],
    onHover: ({object}) => this.setToolInfo(`${object.position.join(', ')}\nCount: ${object.count}`)
  });
  // const ContourMap = new ContourLayer({ //not working
  //   id: 'contourLayer',
  //   data: [...this.state.samdata],
  //   // Three contours are rendered.
  //   contours: [
  //     {threshold: 1, color: [255, 0, 0], strokeWidth: 1},
  //     {threshold: 5, color: [0, 255, 0], strokeWidth: 2},
  //     {threshold: 10, color: [0, 0, 255], strokeWidth: 5}
  //   ],
  //   cellSize: 200,
  //   getPosition: d => [d.coords[0], d.coords[1]]
  // });
  const main_layers_list = [
     GeoMap,
     ScatterMap,
     HexMap,
     PointCloudMap,
     GridMap,
     GridCellMap//,
  //   ContourMap
  ];
  const main_layers = main_layers_list[this.props.mapprops.mode]


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
