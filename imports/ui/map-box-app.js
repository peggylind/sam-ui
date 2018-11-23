import React, { Component } from "react";
import DeckGL, { CompositeLayer, GeoJsonLayer, ScatterplotLayer, ArcLayer, TextLayer, LineLayer, GridLayer, GridCellLayer, HexagonLayer, PointCloudLayer, ContourLayer, MapController, Controller } from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport, {getDistanceScales} from 'viewport-mercator-project';
//import debounce from 'lodash.debounce';
import SamMapControls from './SamMapController';
import RoundedRectangleLayer from './rounded_rectangle_layer';

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
// class MapCompositeLayer extends CompositeLayer {
//   renderLayers() {
//     return [
//       this._renderGroupOfSubLayers()//, // returns an array of layers
//       //this.props.showScatterplot && new ScatterplotLayer(...)
//     ];
//   }
//
//   shouldUpdateState({props, oldProps, context, oldContext, changeFlags}){
//     // console.log(props[0].props.waiting)
//     // console.log(this.state)
//     //if(this.state.gl_local_wait){this.setState({gl_local_wait:0})}
//
//     // if(!props[0].props.waiting && changeFlags.propsChanged){
//     //   this.setState({gl_local_wait:1})
//     //   //props[0].props.setWaiting(0)
//     // }
//     if(oldProps[2].props.cellSize){
//         if(oldProps[2].props.cellSize != props[2].props.cellSize){
//         //  props[2].draw();
//         //  this.draw(props[2])
//         //  this.setState({cellSize:props[2].props.cellSize})
//           console.log(props[2].props.cellSize)
//           console.log(oldProps[2].props)//.cellSize)
//       }
//     }
//   //}
//
//
//     //if(changeFlags.propsOrDataChanged){console.log('changeFlags.propsOrDataChanged: ' +changeFlags.propsOrDataChanged)}
//     //if(changeFlags.dataChanged){console.log('changeFlags.dataChanged: ' +changeFlags.dataChanged)}
//      //if(changeFlags.propsChanged){console.log('changeFlags.propsChanged: ' +changeFlags.propsChanged)}
//     // if(changeFlags.stateChanged){console.log('changeFlags.stateChanged: ' +changeFlags.stateChanged)}
//     // if(changeFlags.updateTriggersChanged){console.log('changeFlags.updateTriggersChanged: ' +changeFlags.updateTriggersChanged)}
//     // console.log(changeFlags)
//     // console.log(oldContext)
//     //if(this.props[2].lifecycle == "Matched. State transferred from previous layer"){console.log("Matched. State transferred from previous layer")}
//     // console.log(changeFlags)
//     //return this.state.gl_local_wait ? super.shouldUpdateState : false
//     return super.shouldUpdateState
//   }
//
//
//
//   // finalizeState() {
//   //   console.log('final')
//   // }
//
//   renderLayers() {
//     //console.log(this.props[2]) // need to move logic into this component
//     return [
//       this.props[0],
//       this.props[1],
//       this.props[2]
//       //this.props[2]
//       //this._renderGroupOfSubLayers()//, // returns an array of layers
//   //    this.props.showScatterplot && new ScatterplotLayer(...)
//     ];
//   }
// }

export default class MapBox extends Component {
  constructor(props) {
      super(props);
      this.SamControls = new SamMapControls();
      this.setToolInfo = this.props.setToolInfo;
      this.setClick = this.props.setClick;
      this.setHighlight = this.props.setHighlight;
      this.setText = this.props.setText;
      this.setWaiting = this.props.setWaiting;
      this.handlePopulationChange = this.props.handlePopulationChange;
      //this.factorcounts = 0,
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport(this.props.mapprops.viewport),
            time: 0,
            samdata: this.props.samdata || [],
            waiting: this.props.waiting,
            gl_wait: 1, //perhaps from app.js??
            cellSize: this.props.samprops.cellSize,
            highlight_data: this.props.highlight_data || [],
            textdata: [{text:this.props.samprops.textname,coords:this.props.samprops.textposition}],
            //toTest: {white:[230,159,0],black:[213,94,0]},
            forColors: this.props.samprops.forColors //maybe have in toShow - have to draw the flow again
        };
      }

      returnheight (factor) {
        //should do some as log!!!
        let min = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].low
        let max = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].high
        //function(val, max, min) { return (val - min) / (max - min); }
        return ((factor[this.props.samprops.scaleShow]-min) / (max - min)) * (this.props.samprops.height/2)
      }

      returnColors (factor) {
          //this.factorcounts = this.factorcounts+1
          return this.props.samprops.forColors[factor]
        //}
      }
      returnText (txt) {
        console.log('returnText '+txt)
        return txt //toString(parseInt(txt)*parseInt(this.props.samprops.one_of))
      }

    static getDerivedStateFromProps(props, state) {
      //props.setWaiting(0)
      // if(props.data){
      // console.log('props.data.length'+props.data.length)}
      // console.log(props.waiting)
      if(props.data && state.waiting){
        props.setWaiting(0)
        return {samdata:props.data,waiting:0}
      }
      if (props.data){
      if(props.data.length > 0 && props.data != state.samdata){
        props.setWaiting(0)
        return {samdata:props.data,waiting:0}
      }}

      // if(state.samdata.length>0 && state.waiting){
      //     props.setWaiting(0)
      //     return {samdata:props.data,waiting:0}
      // }

      if (state.cellSize != props.samprops.cellSize){
        return {cellSize: props.samprops.cellSize}
      }
      if (state.textdata[0].coords != props.samprops.textposition){
        //have to load in and do a push??
        //console.log('prevState.textdata[0].text: '+state.textdata[0].text + ' : '+ props.samprops.textname)
        return {
          text: 'pop: '+props.samprops.textname*props.samprops.one_of,
          textdata:
          [{text:props.samprops.textname,
            coords:props.samprops.textposition}]}
      }else{
        if(props.highlight_data != state.highlight_data){
          console.log('in mapbox '+props.highlight_data)
          return {highlight_data:props.highlight_data}
        }else{
        return null
      }}
    }

    componentDidMount(){
      // console.log('componentDidMount in mapbox '+this.props.samprops.catShow)
      // if (this.props.data){console.log('data')}
      //this.setState({geojsonsam:this.props.geojsonsam})
    };

    componentDidUpdate(newProps, prevState) {
      //console.log(this.factorcounts) //it is running through the whole thing twice!!!
      //if (!newProps.waiting){this.setWaiting(0)};
      //console.log('map-box updated'+JSON.stringify(newProps.samprops.waiting)+JSON.stringify(prevState.waiting))
      if (prevState.cellSize != newProps.samprops.cellSize){
        //this.GridMap.setState({cellSize:newProps.samprops.cellSize})
      }
      if (this.props.geojsonsam != newProps.geojsonsam){
        //console.log(this.props.geojsonsam)
         this.setState({geojsonsam:this.props.geojsonsam})
      };

      // if (prevState.textdata[0].text != newProps.samprops.textname){
      //   //have to load in and do a push??
      //   console.log('prevState.textdata[0].text: '+prevState.textdata[0].text + ' : '+ newProps.samprops.textname)
      //   this.setState({textdata: [{text:newProps.samprops.textname,coords:newProps.samprops.textposition}]});
      // }
      // if (newProps.data && newProps.waiting){
      // // //  this.setState({geojsonsam:this.props.geojsonsam})
      // //   console.log('set samdata '+(Date.now())+JSON.stringify(newProps))
      // //   this.setState({samdata: this.props.data, waiting: 0});
      //    this.setWaiting(0);
      // //   // if (this.props.samprops.limit < 10001){
      // //   //   this.handlePopulationChange(this.props.samprops.limit+500)
      // //   // }
      // };
      // if (this.props.data != prevState.samdata && prevState.waiting == 0){
      //   console.log('set samdata new '+(Date.now()))
      //   this.setState({samdata: this.props.data});
      //   this.setWaiting(0);
      //   // if (this.props.samprops.limit < 10001){ //instead of 40001
      //   //   this.handlePopulationChange(this.props.samprops.limit+7000)
      //   // }
      // };
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
    //console.log('in mb render: '+this.state.highlight_data)
    //const data = this.state.geojsonsam;
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

  const ScatterMap = new RoundedRectangleLayer({ // ScatterplotLayer({
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
    //autoHighlight: true,
    onHover: ({object}) => this.setToolInfo(object),
    //onHover: ({object}) => this.setHighlight(object),
    onClick: ({object}) => this.setClick(object)
  });
  const HighlightMap = new ScatterplotLayer({
    id: 'highlight-layer',
    data: [...this.state.highlight_data],
		getPosition: d => [d.coords[0], d.coords[1]],
    getColor: [255,0,0,255],// d => this.returnColors(d[this.props.samprops.catShow]),
    opacity: 1, //this.props.samprops.opacity,
    radiusMinPixels: this.props.samprops.radiusMinPixels,
    radiusMaxPixels: this.props.samprops.radiusMaxPixels,
    strokeWidth: this.props.samprops.strokeWidth*200,
    //radiusScale: 2000,
    outline: this.props.samprops.outline,
    pickable: this.props.samprops.pickable,
    autoHighlight: true,
    //onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setClick(object),
    waiting: this.state.waiting,
    gl_wait: this.state.gl_wait,
    setWaiting: this.props.setWaiting
  });
  const HexMap = new HexagonLayer({
    id: 'hex-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    autoHighlight: true,
    radius: this.state.cellSize/2, //without operation it doesn't rerender size
    elevationScale: 1,
    opacity: .1,
    getPosition: d => [d.coords[0], d.coords[1]],
    // onClick: ({object}) => this.setText(object.index,object.centroid),
    // onHover: ({object}) => this.setText(object.index,object.centroid),
  });
  const GridMap = new GridLayer({
    id: 'grid-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    opacity: .1,
    autoHighlight: true,
    cellSize: this.state.cellSize/2,
    elevationScale: .21, //4
    getPosition: d => [d.coords[0], d.coords[1]],
    // updateTriggers: {
    //   ...updateTrigger,
    //   cellSize: [this.state.cellSize]
    // },
    onHover: ({object}) => this.setText(object.count,object.position),
    onClick: ({object}) => this.setText(object.count,object.position)
  });
  const GridCellMap = new GridCellLayer({
    id: 'grid-cell-layer',
    data: [...this.state.samdata],
    pickable: true,
    extruded: true,
    cellSize: 1000,
    elevationScale: 4,
    getPosition: d => [d.coords[0], d.coords[1]],
    onHover: ({object}) => this.setToolInfo(object)
  });
  const TextMap = new TextLayer({
    id: 'text-layer',
    data: [...this.state.textdata],
    pickable: true,
    getPosition: d => [d.coords[0], d.coords[1]],
    getText: d => [d.text], //this.returnText([d.text]),
    getSize: 22, //this.props.samprops.zoom*4,
    getColor: [0,255,0,255],
    getAngle: 0,
    getPixelOffset: [0,-30],
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center'//,
    //onHover: ({object}) => setTooltip(`${object.name}\n${object.address}`)
  })
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
  //const main_layers = [TextMap,main_layers_list[this.props.mapprops.mode]]
  const main_layers = [HighlightMap,TextMap,main_layers_list[this.props.mapprops.mode]]
  //const CompositeMap = new MapCompositeLayer(main_layers); onHover stopped working!

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.state.mapboxApiAccessToken}
        waiting={this.state.waiting}
        mapControls={this.SamControls}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
      <div style={{position:"absolute",zIndex:"5",
                  textAlign:"center",width:"100%",top:"15%"}}>
      {this.state.text}
      </div>
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
