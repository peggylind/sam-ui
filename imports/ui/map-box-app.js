import React from 'react';
import DeckGL, { ScatterplotLayer, ArcLayer, LineLayer, MapController, Controller } from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
//import debounce from 'lodash.debounce';
import SamMapControls from './SamMapController';

const west = -95.91;
const east = -94.67;
const north = 30.47;
const south = 28.93;

export default class MapBox extends React.Component {
  constructor(props) {
      super(props);
      console.log('in mapbox'+JSON.stringify(props.mapprops))
      //const { data = {coords:[]} } = this.props;
      const coords = [[east,south],[west,north]];
      const age = [];
      const race = [];
      this.SamControls = new SamMapControls({wtf:'wert'});
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            // viewport: new WebMercatorViewport({
            //     width: window.innerWidth,
            //     height: window.innerHeight,
            //     longitude: (west + east) / 2,
            //     latitude: (north + south) / 2,
            //     zoom: this.props.mapprops.viewport.zoom,
            //     pitch: 60,
            //     bearing: 0
            // }),
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
        this.props.onMapChange(this.state.viewport)
      }
    };

    componentDidMount() {
    //  this.props.onMapChange('this.state.viewport')
    //  this.emitChangeDebounced.cancel();
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
  new ArcLayer({
    id: 'arc-layer',
    strokeWidth: 10,
    data: [
      { sourcePosition: [-95.91, 30.47], targetPosition: [-95.91, 30.93], color: [255, 0, 255] },
    ],
  }),
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
  new LineLayer({
    id: 'line-layer',
    strokeWidth: 10,
    data: [
      { sourcePosition: [-95.01, 30.47], targetPosition: [-95.01, 28.93], color: [255, 0, 0] },
    ],
  }),
]
//set up waiting logo

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
