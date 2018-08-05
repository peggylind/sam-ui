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

//could have this and the other values in a JSON file??
//https://www.ginifab.com/feeds/pms/cmyk_to_pantone.php
//Wong, Bang, "Color Blindness," Nature Methods. Jun2011, Vol. 8 Issue 6, p441-441. 1p.
const color1 = {name: 'orange', RGB : [230, 159, 0], CMYK: [0, 50, 100, 0],HEX: '#ff8000'};
const color2 = {name: 'sky blue', RGB: [86, 180, 233], CMYK: [80,0,0,0],HEX: '#33ffff'};
const color3 = {name: 'bluish green', RGB: [0, 158, 115], CMYK: [97,0,75,0],HEX: '#08ff40'};
const color4 = {name: 'yellow', RGB: [240, 228, 66], CMYK: [10,5,90,0], HEX: '#e6f219'};
const color5 = {name: 'blue', RGB: [0, 114, 178], CMYK: [100, 50, 0, 0], HEX: '#0080ff'};
const color6 = {name: 'vermillion', RGB: [213, 94, 0], CMYK: [0, 80, 100, 0], HEX: '#ff3300'};
const color7 = {name: 'reddish purple', RGB: [204, 121, 167], CMYK: [10,70,0,0], HEX: '#e64dff'};
const color8 = {name: 'black', RGB: [0,0,0], CMYK: [0,0,0,100], HEX: '#000000'};
const color9 = {name: 'white', RGB: [255,255,255], CMYK: [0,0,0,0], HEX: '#ffffff'};
const allcolors = [color1,color2,color3,color4,color5,color6,color7,color8,color9];
//as list means we can resort to match data

const samprops = {
  limit: 20000,
  member: "Adult",
  race: "Black or African American",
  age: "55 to 64",
  longitude: -95.29,
  latitude: 29.7,
  zoom: 10,
  dist: 140000,
  allcolors: allcolors,
  toShow: { category: 'race', factors: [['White':'color1'],['Black':'color2'],['Hispanic':'color3'],['Asian':'color4']]},
  cloudOrPlot: 'Plot' //scatterplot or cloud on map
  //this logic will apply to everything we want to show - component should feed whole object here
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
              bbox: bbox, //may use later for searches - now based on geonear in circle
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: -95.29,
                latitude: 29.7,
                zoom: 10,//16.051394480575627, //which is zoom for 1 meter for testing
                pitch: 20,
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

  onChangetoShow = function(showObj){
    var samprops = {...this.state.samprops};
    samprops.toShow = showObj;
    this.setState({samprops});
  };

  onMapChange = function(mapstuff,dist){
    var samprops = {...this.state.samprops}
    samprops.latitude = mapstuff.latitude;
    samprops.longitude = mapstuff.longitude;
    samprops.zoom = mapstuff.zoom;
    samprops.dist = dist;
    this.setState({samprops});
  };

  onSamDataChange = function(datactrls){
    var samprops = {...this.state.samprops}
    samprops.toShow = datactrls.toShow;
    samprops.mapOrPlot = datactrls.mapOrPlot;//also use to set map to 80 degrees??May need to turn off map??
    this.setState({samprops});
  }
//use to populate sidepane? or popup?
  setToolInfo = function(info){
    console.log(info)
  }

  render(){
      //if (loading) return null;
      return (
          <div>
            <h1 style={{position:'absolute',marginLeft:'35%',zIndex:'3'}}>Practice Sam</h1>
            <SidePane
              samprops={this.state.samprops}
              onPopChange={this.handlePopulationChange}
              onChangetoShow={this.onChangetoShow}
              onMapChange={this.onMapChange}
              setToolInfo={this.setToolInfo}
            />
            <SamDataForm
              mapprops={this.state.mapprops}
              samprops={this.state.samprops}
              onMapChange={this.onMapChange}
              setToolInfo={this.setToolInfo}
              />
          </div>
      );
    };
  };
