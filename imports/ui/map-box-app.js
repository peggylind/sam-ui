import React from 'react';
import DeckGL, { ScatterplotLayer, ArcLayer, LineLayer, MapController } from 'deck.gl';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

// Set your mapbox access token here
//const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFzaGF0dWgiLCJhIjoiY2ppaXV5Z29nMXdxNTNxcXlicXBjeGhmayJ9.sG4Yw6rMHIBMRNlWwWphYQ';

// Initial viewport settings
// const initialViewState = {
//   longitude: -122.41669,
//   latitude: 37.7853,
//   zoom: 13,
//   pitch: 0,
//   bearing: 0
// };

// Data to be used by the LineLayer
//const linedata = [{sourcePosition: [-95.91, 30.47], targetPosition: [-94.67, 28.93]}];

const west = -95.91;
const east = -94.67;
const north = 30.47;
const south = 28.93;
export default class MapBox extends React.Component {
  constructor(props) {
      super(props);
      ///console.log('in mapbox'+props)
      //const { data = {coords:[]} } = this.props;
      const coords = [[east,south],[west,north]];
      const age = [];
      const race = [];
      this.state = {
            mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
            viewport: new WebMercatorViewport({
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: (west + east) / 2,
                latitude: (north + south) / 2,
                zoom: props.zoom,
                pitch: 60,
                bearing: 0
            }),
            time: 0,
            samdata: [coords,age,race],
            waiting: 1
        };
      }
    componentDidUpdate(prevProps, prevState) {
      //console.log(this.props.data)
      //there's a loading on the graphQL stuff, but starts late
      if (this.props.data && prevState.waiting == 1){
        this.setState({samdata: this.props.data, waiting: 0});
      }
      if (this.props.data != prevState.samdata && prevState.waiting == 0){
        this.setState({samdata: this.props.data});
        console.log('why not update??')
        //have to do the set state here with everything from the viewport!!!
        //this.forceUpdate();
      }
    }

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
    pickable: true,
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
