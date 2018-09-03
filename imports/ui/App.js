import React, {Component} from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
//import SidePane from "./side-pane"; //would liftup twice for components under SidePane

import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??
import Slide from './slider-input';
import LegendBox from './legend-box';
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
    {factorName:'black',factorColor:1},{factorName:'hispanic',factorColor:5},{factorName:'other.race',factorColor:4},
    {factorName:'multiracial',factorColor:0}]},
  {category: 'member', factors: [{factorName:'Adult',factorColor:3},{factorName:'Child',factorColor:2},
    {factorName:'Householder',factorColor:1},{factorName:'Wife',factorColor:6}]},
  {category: 'educational_attainment', factors: [{factorName:'High School Graduate',factorColor:3},{factorName:'Graduate or Professional Degree',factorColor:2},
    {factorName:"Bachelor's Degree",factorColor:1},{factorName:"Associate's degree",factorColor:5},{factorName:"Some College, no degree",factorColor:5},
    {factorName:"Less than 9th grade",factorColor:1},{factorName:"9th to 12th grade, no diploma",factorColor:5}]},
  {category: 'asthma', factors: [{factorName:'Yes',factorColor:3},{factorName:'No',factorColor:2}]}
];
// async getJSONnames => {
//   const res = await fetch('/json/unique_names.json')
//   const jsonnames = await res.json()
//   return jsonnames
// }

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
  limit: 6000,
  one_of: 10,
  member: "Adult",
  race: "white",
  age: 55,
  longitude: -95.29,
  latitude: 29.7,
  zoom: 10,
  opacity: 0.45,
  radiusMinPixels: 1.12,
  radiusMaxPixels: 1000,
  strokeWidth: 8,
  radiusScale: 100,
  outline: false,
  pickable: true,
  dist: 140000,
  allcolors: allcolors,
  toShow: toShow,
  forColors: assignColors(toShow[0]),
  changeColors: true, //let's you turn off select for colors on factors
  categIndex: 0,
  catShow: 'race', //faster color in map-box-app
  cloudOrPlot: 'Plot' //scatterplot or cloud on map
  //this logic will apply to everything we want to show - component should feed whole object here
};
export default class App extends Component {
   constructor(props) {
       super(props);
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onCatChange = this.onCatChange.bind(this);
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
                zoom: samprops.zoom,//16.051394480575627, //which is zoom for 1 meter for testing
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
  onCatChange = function(event){
    var samprops = {...this.state.samprops}
    samprops.toShow.forEach(function(row,r){
      if(row.category == event.target.value){
        samprops.categIndex = r;
        samprops.catShow = row.category; //only used in map-box right now
        samprops.forColors = assignColors(samprops.toShow[r]);
      }
    })
    this.setState({samprops});
  }

  onChangetoShow = function(showObj){
     var samprops = {...this.state.samprops}
     samprops.toShow.forEach(function (catRow, i){
       if (catRow.category==showObj.catName){
         catRow.factors.forEach(function (factorRow, j){
           if (factorRow.factorName == showObj.factorName){
             factorRow.factorColor = showObj.factorColor;
             samprops.toShow[i].factors[j] = factorRow;
             samprops.allcolors = samprops.allcolors;
             samprops.forColors = assignColors(samprops.toShow[i]); //may be able to make this smoother
             samprops.catShow = samprops.toShow[i].category; //only used in map-box right now
           };
         });
       };
     });
     this.setState({samprops});
  };


  onMapChange = function(mapstuff,dist){
    console.log("mapstuff"+JSON.stringify(mapstuff.zoom))
    var samprops = {...this.state.samprops}
    samprops.latitude = mapstuff.latitude;
    samprops.longitude = mapstuff.longitude;
    samprops.zoom = mapstuff.zoom;
    samprops.dist = dist;
    if(mapstuff.zoom <= 10){
      samprops.radiusMaxPixels = 1000
      samprops.opacity = 0.85
      samprops.strokeWidth = 8
      samprops.radiusScale = 80
    }
    if(mapstuff.zoom > 10){
      samprops.radiusMaxPixels = 1000
      samprops.opacity = 0.65
      samprops.strokeWidth = 6
      samprops.radiusScale = 70
    }
    if(mapstuff.zoom > 11){
      samprops.radiusMaxPixels = 1000
      samprops.opacity = 0.45
      samprops.strokeWidth = 4
      samprops.radiusScale = 60
    }
    if(mapstuff.zoom > 12){
      samprops.radiusMaxPixels = 1000
      samprops.opacity = 0.25
      samprops.strokeWidth = 2
      samprops.radiusScale = 40
    }
    if(mapstuff.zoom > 13){
      samprops.radiusMaxPixels = 1000
      samprops.opacity = 0.25
      samprops.strokeWidth = 1
      samprops.radiusScale = 8
      samprops.one_of = 1
    }
    this.setState({samprops});
  };

  onSamDataChange = function(datactrls){
    var samprops = {...this.state.samprops}
    samprops.toShow = datactrls.toShow;
    samprops.mapOrPlot = datactrls.mapOrPlot;//also use to set map to 80 degrees??May need to turn off map??
    this.setState({samprops});
  }
//use to populate sidepane? or popup? this is the tooltip
  setToolInfo = function(info){
    console.log(info)
  }

  // componentWillUnmount(){
  //   client.resetStore();
  // }

  render(){
      //if (loading) return null;
      return (
          <div>
          <div style={{position:"absolute",width:"100%",fontSize:"4em",textAlign:"center", zIndex:"3"}}>Sam City</div>

          <div style={{position:"absolute",marginLeft:"90%",backgroundColor:"#f8f8ff",zIndex:"3"}}>
          <span>
            <img style={{width:"100%"}} src='/images/DASHlogo.png' />
          </span>
          <hr/>
          <span>
            <img style={{width:"100%"}} src='/images/honors-the-honors-college-primary.png' />
          </span>

          </div>
            <LegendBox
              samprops={this.state.samprops}
              onPopChange={this.handlePopulationChange}
              onCatChange={this.onCatChange}
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
