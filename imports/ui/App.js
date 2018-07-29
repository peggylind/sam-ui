import React, {Component} from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withApollo } from "react-apollo";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import SidePane from "./side-pane"; //would liftup twice for components under SidePane

import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??
import Slide from './slider-input';

const samprops = {
  limit: 100,
  member: "Child",
  longitude: -95.29,
  latitude: 29.7,
  zoom: 10
  //this logic will apply to everything we want to show
};
//const App = ({ loading, resolutions, samcity, client, user }) => {
export default class App extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       //don't know if bind helps
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onMapChange = this.onMapChange.bind(this);
       //bbox is NW,NE,SE,SW
       const bbox = [[-95.91,28.93],[-94.67,28.93],[-94.67,30.47],[-95.91,30.47]];
       this.state = {
         samprops : samprops,
         mapprops : {
              mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
//this viewport is reaad in as object, but is a "new" class in map-box-app.js
              bbox: bbox,
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: -95.29,
                latitude: 29.7,
                zoom: 10,
                pitch: 60,
                bearing: 0
              }
            }
         };
   };

  //handleSamChanges(limit,member, etc. etc.; set all to the prop in the component?)
  handlePopulationChange = function(limit) {
    var samprops = {...this.state.samprops}
    samprops.limit = limit;
    this.setState({samprops});
  };

  onMapChange = function(mapstuff){
    var samprops = {...this.state.samprops}
    samprops.latitude = mapstuff.latitude;
    samprops.longitude = mapstuff.longitude;
    samprops.zoom = mapstuff.zoom;
    this.setState({samprops});
    //var mapprops = {...this.state.mapprops}

    // console.log('mapstuff '+JSON.stringify(this.state.mapprops))
    // console.log('mapstuff '+JSON.stringify(mapstuff))
  }

  render(){
      //if (loading) return null;
      return (
          <div>
            <h1 style={{position:'absolute',marginLeft:'35%',zIndex:'3'}}>Practice Sam</h1>
            <SidePane
              onPopChange={this.handlePopulationChange}
            />
            <SamDataForm
              mapprops={this.state.mapprops}
              samprops={this.state.samprops}
              onMapChange={this.onMapChange}
              limit={this.state.samprops.limit}
              member="Child"/>
          </div>
      );
    };
  };
