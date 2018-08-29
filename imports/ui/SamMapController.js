import {experimental} from 'react-map-gl';

  export default class MyMapControls extends experimental.MapControls {

    constructor(props) {
      super(props);

      //this.handleEvent= this.handleEvent.bind(this);
      this.state = props;
      this.events = ['panend','doubletap'];
    }
    // _onDoubleTap(event) {
    //   //this.props.onMapChange(this.getMapState())
    // //  console.log(this.getDistanceScales)
    //   console.log(JSON.stringify(this.state))
    //   // Go to New York City
    //   // this.updateViewport(this.getMapState(), {
    //   //   longitude: -74.0,
    //   //   latitude: 40.7,
    //   //   zoom: 10
    //   // });
    // }
    mapChangeInput(opts){
      //this.state.onMapChange(opts)
    }
    // Override the default handler in MapControls
    //remember zoom can be done in several ways. should probably debounce some...
    handleEvent(event) {
      if (event.type === 'panend' || event.type === 'doubletap' ) {
      //  console.log(this.getDistanceScales())
        //this.mapChangeInput('opts')
        // console.log(JSON.stringify(this.state))
        // this.state.onMapChange('this.getMapState()')
      }
    //  console.log(JSON.stringify(this.state))
      return super.handleEvent(event);
    }
  }
