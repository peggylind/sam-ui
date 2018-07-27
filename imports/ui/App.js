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
  member: "Adult",
  //this logic will apply to everything we want to show
};
//const App = ({ loading, resolutions, samcity, client, user }) => {
export default class App extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       //don't know if bind helps
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       //bbox is NW,NE,SE,SW
       const bbox = [[-95.91,28.93],[-94.67,28.93],[-94.67,30.47],[-95.91,30.47]];
       this.state = {
         samprops : samprops,
         bbox: bbox,
         mapprops : {
              mapboxApiAccessToken: 'pk.eyJ1IjoibWRjaW90dGkiLCJhIjoiY2l1cWdyamw5MDAxcTJ2bGFmdzJxdGFyNyJ9.2b6aTKZNlT1_DEJiJ9l3hw',
//this viewport is reaad in as object, but is a "new" class in map-box-app.js
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: (bbox[1][1] + bbox[2][1]) / 2,
                latitude: (bbox[1][2] + bbox[3][2]) / 2,
                zoom: 10,
                pitch: 60,
                bearing: 0
              }
            }
         };
   };

  //handleSamChanges(limit,member, etc. etc.; set all to the prop in the component?)
  handlePopulationChange = function(limit) {
    console.log('limit resend graphql'+limit)
    var samprops = {...this.state.samprops}
    samprops.limit = limit;
    this.setState({samprops});
  };

  render(){
      //if (loading) return null;
      return (
          <div>
            <h1 style={{position:'absolute',marginLeft:'35%',zIndex:'3'}}>Practice Sam</h1>
            <SidePane
              onPopChange = {this.handlePopulationChange}
            />
            <SamDataForm
              samprops={this.state.samprops}
              limit={this.state.samprops.limit}
              member="Child"/>
          </div>
      );
    };
  };
