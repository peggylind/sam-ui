import React, { Component } from "react";
import DeckGL, { GeoJsonLayer, ScatterplotLayer, ArcLayer, TextLayer, LineLayer, GridLayer, GridCellLayer, HexagonLayer, PointCloudLayer, PathLayer } from 'deck.gl';
//import {ContourLayer} from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport, {getDistanceScales} from 'viewport-mercator-project';
//import debounce from 'lodash.debounce';
import SamMapControls from './SamMapController';
import RoundedRectangleLayer from './layers/rounded_rectangle_layer';
import ContourLayer from './layers/contour-layer/contour-layer'; //still not sure why it wouldn't import from deck.gl, but always returned undefined...


const west = -95.91;
const east = -94.67;
const north = 30.47;
const south = 28.93;
const coords = [[east,south],[west,north]];
const age = [];
const race = [];

//didn't use LIGHT_SETTINGS ... yet
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
const formatKms = function(number){
  if (number!=undefined){
      var num = number/1000000 //for if it's coming in already squared
      var numstring = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numstring+'/km2'
  }else{
    return null
  }
};
const formatCommas = function(number){
  if (number!=undefined){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }else{
    return null
  }
};

export default class MapBox extends Component {
  constructor(props) {
      super(props);
      this.SamControls = new SamMapControls();
      this.setToolInfo = this.props.setToolInfo;
      this.setClick = this.props.setClick;
      this.setHighlight = this.props.setHighlight;
      this.setText = this.props.setText;
      this.setWaiting = this.props.setWaiting;
      this.setUpdate = this.props.setUpdate;
      this.handlePopulationChange = this.props.handlePopulationChange;
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport(this.props.mapprops.viewport),
            bbox: this.props.mapprops.bbox,
            time: 0,
            samdata: [], //this.props.data ||
            pathdata: [],  //either push more paths or replace
            waiting: this.props.waiting,
            categIndex: this.props.samprops.categIndex,
            cellSize: this.props.samprops.cellSize,
            highlight_data: this.props.highlight_data || [],
            textdata: [{text:this.props.samprops.textname,coords:this.props.samprops.textposition}],
            //toTest: {white:[230,159,0],black:[213,94,0]},
            forColors: this.props.samprops.forColors //maybe have in toShow - have to draw the flow again
        };
      }

      returnheight (factor) {
        //should do some as log!!!
        //think through!!!!
        let min = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].low
        let max = this.props.samprops.toShowScale[this.props.samprops.scaleIndex].high
        //function(val, max, min) { return (val - min) / (max - min); }
        return ((factor[this.props.samprops.toShowScale[this.props.samprops.scaleIndex].category]-min) / (max - min)) * (this.props.samprops.toShowScale[this.props.samprops.scaleIndex].ScaleHeight/2)
      }

      returnColors (factor) {
          return this.props.samprops.forColors[factor]
      }
      returnText (txt) {
        console.log('returnText '+txt)
        return txt //toString(parseInt(txt)*parseInt(this.props.samprops.one_of))
      }

    static getDerivedStateFromProps(props, state) {
      if(state.viewport.zoom < 9){
        var viewport = {...state.viewport}
        viewport.zoom = 9
        return {viewport}
      }
      if(props.samprops){
        if(props.samprops.categIndex != state.categIndex){
          props.countData(props.data.fetch());
          return {categIndex:props.samprops.categIndex}
        };
      };
      if(props.samprops.scaleIndex){
        if(props.samprops.scaleIndex != state.scaleIndex || props.samprops.toShowScale[props.samprops.scaleIndex].low != state.bottom ||
              props.samprops.toShowScale[props.samprops.scaleIndex].high != state.top  ){
          props.countData(props.data.fetch());
          return {scaleIndex:props.samprops.scaleIndex,
                  bottom:props.samprops.toShowScale[props.samprops.scaleIndex].low,
                  top:props.samprops.toShowScale[props.samprops.scaleIndex].high
                  }
        };
      };
      if(props.data != state.samdata && !props.waiting){ //adding the catch for props.waiting seems to make a huge difference in speed
        return {samdata:props.data}
      };
      if(props.update!=state.update){
        return {update:props.update}
      };
      if (state.update){
        var tmpViewPort = new WebMercatorViewport(state.viewport) //the state.viewport can't be accessed after first time so have to make a new one
        var scale = getDistanceScales(state.viewport).metersPerPixel[0];
        var width = window.innerWidth;
        var worldWidth = width*scale;
        var height = window.innerHeight;
        var worldHeight = height*scale; //number of meters in window
        if (worldHeight>worldWidth){
          var dist4search = worldHeight
        }else{
          var dist4search = worldWidth
        };
        //could put box on slider instead of writing 20
        var linemargin = 50;
        var tl = tmpViewPort.unproject([linemargin,linemargin])
        var bl = tmpViewPort.unproject([linemargin,height-linemargin])
        var tr = tmpViewPort.unproject([width-linemargin,linemargin])
        var br = tmpViewPort.unproject([width-linemargin,height-linemargin])
        var pathdata = [
          { path:[tl,tr,br,bl,tl],
            name: 'Testing what to show -- datacounts??'+tl,
            color: [0,255,0,255] }
        ];
        props.onMapChange(state.viewport,dist4search,worldHeight,tr,bl);
        if(state.samdata.collection && !props.waiting){
          props.countData(props.data.fetch());
        }
        props.setUpdate(0);
        return {update:0,samdata:props.data,pathdata:pathdata}
      }else{
        return null
      }
      if (state.cellSize != props.samprops.cellSize){
        return {cellSize: props.samprops.cellSize}
      }
      if (state.textdata[0].coords != props.samprops.textposition){
        //have to load in and do a push??
        //console.log('prevState.textdata[0].text: '+state.textdata[0].text + ' : '+ props.samprops.textname)
        return {
          text: formatCommas(props.samprops.textname*props.samprops.one_of),
          textdata:
          [{text:props.samprops.textname,
            coords:props.samprops.textposition}]}
      }else{
        if(props.highlight_data != state.highlight_data){
          return {highlight_data:props.highlight_data}
        }else{
        return null
      }}
    }

    componentDidUpdate(newProps, prevState) {
      if (this.props.geojsonsam != newProps.geojsonsam){
        //console.log(this.props.geojsonsam)
         this.setState({geojsonsam:this.props.geojsonsam})
      };
      //
      if (newProps.data != prevState.samdata && prevState.samdata.collection){ //only does first one
        newProps.countData(newProps.data.fetch());
      }
      if (this.state.viewport != prevState.viewport){
        if(this.state.viewport.zoom >= prevState.viewport.zoom){
          //newProps.setWaiting(1)
          newProps.setUpdate(1)
        };
      };
    };

  render() {
  const GeoMap = new GeoJsonLayer({
    id: 'geojson-layer',
    data: this.state.geojsonsam,
  //  pickable: true,
  //  stroked: true,
  //  filled: true,
  //  extruded: false,
    wireframe: true,
    fp64:true,
    // lineWidthScale: 20,
    lineWidthMinPixels: 2,
  //    getFillColor: [160, 160, 180, 200],
  //    getLineColor: d => colorToRGBArray(d.properties.color),
    // getRadius: 100,
    // getLineWidth: 100,
    // getElevation: 30,
    //onHover: ({object}) => this.setToolInfo(object),
    //autoHighlight: true,
    //getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
    getFillColor: [255, 255, 255, 100],
    getLineColor: f => [0, 0, 0]
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
    onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setClick(object)
  });

  const ScatterMap = new ScatterplotLayer({ //new RoundedRectangleLayer({ // doesn't pass the onHover and onClick properly; not sure why
    id: 'scatterplot-layer',
    data: [...this.state.samdata],
		getPosition: d => [d.coords[0], d.coords[1]],
    getFillColor: d => this.returnColors(d[this.props.samprops.catShow]),
    opacity: this.props.samprops.opacity,
    radiusMinPixels: this.props.samprops.radiusMinPixels,
    radiusMaxPixels: this.props.samprops.radiusMaxPixels,
    getLineWidth: this.props.samprops.strokeWidth,
    //radiusScale: this.props.samprops.radiusScale,
    stroked: this.props.samprops.outline,
    pickable: this.props.samprops.pickable,
    cornerRadius: .2,
    //autoHighlight: true,
    onHover: ({object}) => this.props.setToolInfo(object), //for some reason, object is undefined if in RoundedRectangleLayer????
    onClick: ({object}) => this.props.setClick(object)
  });
  const HighlightMap = new ScatterplotLayer({
    id: 'highlight-layer',
    data: [...this.props.highlight_data],
		getPosition: d => [d.coords[0], d.coords[1]],
    getFillColor: [255,0,0,255],// d => this.returnColors(d[this.props.samprops.catShow]),
    opacity: 1, //this.props.samprops.opacity,
    radiusMinPixels: this.props.samprops.radiusMinPixels,
    radiusMaxPixels: this.props.samprops.radiusMaxPixels,
    getLineWidth: this.props.samprops.strokeWidth*20,
    //radiusScale: 2000,
    stroked: this.props.samprops.outline,
    pickable: this.props.samprops.pickable,
    autoHighlight: true,
    //onHover: ({object}) => this.setToolInfo(object),
    onClick: ({object}) => this.setClick(object)
  });
  //You can subClassing HexagonLayer and override the _onGetSublayerElevation method with your own. This method takes each cell {centroid: [], points: []. index} as input , and returns the elevation. Note the points: [] is the array of data points that contained by each cell. You can use these array of points to calculate your own elevation.
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
    onHover: ({object}) => object? this.setText(object.count,object.position) : null,
    onClick: ({object}) => object?
              window.alert(formatCommas(object.count*this.props.samprops.one_of)+
                ' people in '+formatKms(this.state.cellSize*this.state.cellSize)) : null
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
  });
  const PathMap = new PathLayer({
    id: 'path-layer',
    data: [...this.state.pathdata],
    pickable: true,
    widthScale: 1,
    widthMinPixels: 1,
    getPath: d => d.path,
    getColor: d => d.color,
    getWidth: d => 5,
    onHover: ({object, x, y}) => {
      console.log(object)
      const tooltip = object ? object.name : null;
    }
  });
  const ContourMap = new ContourLayer({ //not working with [6-10] because PolygonLayer not loading in same way ContourLayer wouldn't load... maybe reinstalling???
    id: 'contour-layer',
    data: [...this.state.samdata],
    // Three contours are rendered.
    contours: [
      {threshold: 1, color: [255, 0, 0], strokeWidth: 1},
      {threshold: 5, color: [0, 255, 0], strokeWidth: 2},
      {threshold: 10, color: [0, 0, 255], strokeWidth: 5}
    ],
    cellSize: 700,
    getPosition: d => [d.coords[0], d.coords[1]]
  });
  const main_layers_list = [
     GeoMap,
     ScatterMap,
     PointCloudMap,
     GridMap,
     HexMap,
     GridCellMap,
     PathMap,
     ContourMap
  ];
  const main_layers = [main_layers_list[this.props.mapprops.mode]] //PathMap works, but need to rethink the modes...
  //const main_layers = [HighlightMap,TextMap,main_layers_list[this.props.mapprops.mode]]
  //const CompositeMap = new MapCompositeLayer(main_layers); onHover stopped working!

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={this.state.mapboxApiAccessToken}
        mapControls={this.SamControls}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
      <div style={{position:"absolute",zIndex:"5",
                  textAlign:"center",width:"100%",top:"15%"}}>
                  {this.state.text}
      {this.state.text ?
        <span style={{backgroundColor:"#7f7f7f33",borderRadius:"12px"}}><span> people in </span><br></br>
        <span>{formatKms(this.state.cellSize*this.state.cellSize)}</span></span> : null}

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

//if need control over changeFlags on maps:
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
