import React, {Component} from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import SidePane from "./side-pane"; //would liftup twice for components under SidePane

import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??
import Slide from './slider-input';
// var DASHlogo = require('/public/images/DASHlogo.png');
// var UHLogo = require('/public/images/honors-the-honors-college-tertiary2.png');

//could have this and the other values in a JSON file??
//https://www.ginifab.com/feeds/pms/cmyk_to_pantone.php
//Wong, Bang, "Color Blindness," Nature Methods. Jun2011, Vol. 8 Issue 6, p441-441. 1p.
const color0 = {name: 'gray', RGB: [181,181,181], CMYK: [0,0,0,20], HEX: '#b5b5b5', indexnumber:0};
const color1 = {name: 'orange', RGB : [230, 159, 0], CMYK: [0, 50, 100, 0],HEX: '#ff8000', indexnumber:1};
const color2 = {name: 'sky blue', RGB: [86, 180, 233], CMYK: [80,0,0,0],HEX: '#33ffff', indexnumber:2};
const color3 = {name: 'bluish green', RGB: [0, 158, 115], CMYK: [97,0,75,0],HEX: '#08ff40', indexnumber:3};
const color4 = {name: 'yellow', RGB: [240, 228, 66], CMYK: [10,5,90,0], HEX: '#e6f219', indexnumber:4};
const color5 = {name: 'blue', RGB: [0, 114, 178], CMYK: [100, 50, 0, 0], HEX: '#0080ff', indexnumber:5};
const color6 = {name: 'vermillion', RGB: [213, 94, 0], CMYK: [0, 80, 100, 0], HEX: '#ff3300', indexnumber:6};
const color7 = {name: 'reddish purple', RGB: [204, 121, 167], CMYK: [10,70,0,0], HEX: '#e64dff', indexnumber:7};
const color8 = {name: 'black', RGB: [0,0,0], CMYK: [0,0,0,100], HEX: '#000000', indexnumber:8};
const color9 = {name: 'white', RGB: [255,255,255], CMYK: [0,0,0,0], HEX: '#ffffff', indexnumber:9};
const allcolors = [color0,color1,color2,color3,color4,color5,color6,color7,color8,color9];
//as list means we can resort to match data
const toShow = [{category: 'race', factors: [{factorName:'white',factorColor:3},{factorName:'asian',factorColor:2},
  {factorName:'black',factorColor:1},{factorName:'hispanic',factorColor:5}]},
  {category: 'member', factors: [{factorName:'Adult',factorColor:3},{factorName:'Child',factorColor:2}]}
];

function assignColors (newColors) {
  let forColors = {};
  newColors.factors.forEach(function (factor, i){
    forColors[factor.factorName] = allcolors[factor.factorColor].RGB
  })
  return forColors
}
//for factors, maybe ensure only get 10 or fewer??
// const factorQuery = gql`
//   query SamCitizens(
//     $category: String
//   ) {
//     factorlist(
//       category: $category
//     ) {
//       Factor
//     }
//   }
// `;


const samprops = {
  limit: 4000,
  one_of: 10,
  member: "Adult",
  race: "white",
  age: 55,
  longitude: -95.29,
  latitude: 29.7,
  zoom: 10,
  dist: 140000,
  allcolors: allcolors,
  //toShow: { category: 'race', factors: ['White','Asian','Black','Hispanic'],colors: [1,2,3,4]},
  toShow: toShow,
  forColors: assignColors(toShow[0]),
  cloudOrPlot: 'Plot' //scatterplot or cloud on map
  //this logic will apply to everything we want to show - component should feed whole object here
};
export default class App extends Component {
   constructor(props) {
       super(props);
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onChangetoShow = this.onChangetoShow.bind(this);
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
     var samprops = {...this.state.samprops}
     samprops.toShow.forEach(function (catRow, i){
       if (catRow.category==showObj.catName){
         catRow.factors.forEach(function (factorRow, j){
           if (factorRow.factorName == showObj.factorName){
             factorRow.factorColor = showObj.factorColor;
             samprops.toShow[i].factors[j] = factorRow;
             samprops.forColors = assignColors(samprops.toShow[i]); //may be able to make this smoother
           };
         });
       };
     });
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
          <div style={{position:'absolute',marginLeft:'15%',zIndex:'3',width:'20%'}}>

          <span style={{fontSize:"2em"}}>Practice Sam</span>

          <span>
          <img style={{width:"70%"}} src='/images/honors-logo.png' />
          </span>
          <span>
          <img style={{width:"50%"}} src='/images/DASHlogo.png' />
          </span>

          </div>
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
  // export default graphql(factorQuery,
  //   {
  //     options: props => ({
  //       variables: {
  //         category:  'race'
  //       }
  //     }),
  //     props: ({ data }) => ({ ...data })
  //   })(App)
