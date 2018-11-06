import React, {Component} from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
//import SidePane from "./side-pane"; //would liftup twice for components under SidePane
import debounce from 'lodash.debounce'
//import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??
import Slide from './slider-input';
import LegendBox from './legend-box';
import {model_explanations} from "./model_explanations";
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
const color10 = {name: 'red', RGB: [255,0,0], CMYK: [0,0,0,0], HEX: '#FF0000', indexnumber:10};
const color11 = {name: 'blue', RGB: [0,0,255], CMYK: [0,0,0,0], HEX: '#0000FF', indexnumber:11};
const allcolors = [color0,color1,color2,color3,color4,color5,color6,color7,color8,color9,color10,color11];
//as list means we can resort to match data
//should add a title for showing pretty?
//move into separate file
//tofind should be what would be inserted in the pipe - with limit always given?
//tofind is used in SamDataForm to filter
//rest is sent as part of gql to resolver and made into a request
const toShow = [{category: 'race', pretty_name: 'race', type: 'factor', factors: [{factorName:'white',factorColor:3},{factorName:'asian',factorColor:2},
    {factorName:'black',factorColor:1},{factorName:'hispanic',factorColor:5},{factorName:'other.race',factorColor:4},
    {factorName:'multiracial',factorColor:0}],fnd:''},
  {category: 'educational_attainment', pretty_name: 'education', type: 'factor', factors: [{factorName:'High School Graduate',factorColor:3},{factorName:'Graduate or Professional Degree',factorColor:2},
    {factorName:"Bachelor's Degree",factorColor:1},{factorName:"Associate's degree",factorColor:5},{factorName:"Some College, no degree",factorColor:5},
    {factorName:"Less than 9th grade",factorColor:1},{factorName:"9th to 12th grade, no diploma",factorColor:5}],fnd:''},

  {category: 'racial_entropy_index', pretty_name: 'racial entropy', type: 'range', low: -.01, high:-.13, factors:
    [{factorName:'low',factorColor:3},{factorName:'high',factorColor:6}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0},
  // {category: 'member', type: 'factor', factors: [{factorName:'Adult',factorColor:3},{factorName:'Child',factorColor:2},
  //   {factorName:'Householder',factorColor:1},{factorName:'Wife',factorColor:6}],fnd:''},
  {category: 'household_income', pretty_name: 'income', type: 'range', low: 30000, high:70000, factors:
    [{factorName:'low',factorColor:5},{factorName:'high',factorColor:1}],fnd:'',fnd_top_num:1000000,fnd_bottom_num:0},
  // {category: 'sex', type: 'factor', factors: [{factorName:'Male',factorColor:5},{factorName:'Female',factorColor:1}],fnd:''},
  {category: 'age', pretty_name: 'age', type: 'range', low: 0, high:120, factors:
    [{factorName:'low',factorColor:11},{factorName:'high',factorColor:10}],fnd:'',fnd_top_num:100,fnd_bottom_num:0},
  {category: 'employment', pretty_name: 'employment', type: 'factor', factors: [{factorName:'Not in labor force',factorColor:3},{factorName:'Employed',factorColor:2},
    {factorName:'Unemployed',factorColor:1},{factorName:'In Armed Forces',factorColor:6}],fnd:''},
  // {category: 'stresslevelincome', type: 'factor', factors: [{factorName:'yes',factorColor:5},{factorName:'no',factorColor:1}],fnd:''},
  // {category: 'quality_description', type: 'factor', factors: [{factorName:'Average',factorColor:3},{factorName:'Good',factorColor:2},
  //   {factorName:'Excellent',factorColor:1},{factorName:'Poor',factorColor:6},{factorName:"Superior",factorColor:1},{factorName:"Low",factorColor:5}],fnd:''},
  {category: 'disability', pretty_name: 'disability', type: 'factor', factors: [{factorName:'No Disabilities',factorColor:3},{factorName:'With One Type of Disability',factorColor:2},
    {factorName:'With Two or More Types of Disabilities',factorColor:1}],fnd:''},
  {category: 'veteran_status', pretty_name: 'veteran', type: 'factor', factors: [{factorName:'Nonveteran',factorColor:1},{factorName:'Veteran',factorColor:11}],fnd:''}
];

function assignColors (newColors) {
    let forColors = {};
      newColors.factors.forEach(function (factor, i){
        forColors[factor.factorName] = allcolors[factor.factorColor].RGB
    });
  return forColors
};

function makePlotColors (showCategories) {
  let plotColors = [];
  showCategories.forEach(function (row){
    let rowObj = {'category':row.category, 'factorcolors':assignColors(row)};
    //rowObj[row.category] = assignColors(row)
    //plotColors[row.category] = assignColors(row);
    plotColors.push(rowObj)
  })
  return plotColors
  //return ({'category':row.category, 'factorColors':plotColors})
};
function list4plots (plots) {
  let plotList = [];
  plots.forEach(function (categ){
    toShow.forEach(function (row){
      if (row.category == categ){
        plotList.push(row)
      }
    })
  })
  return makePlotColors(plotList) //which is a list of objects from toShow
}

const firstzoom = 10.3;
const calcOpacity = (zoom) => { return 1 - (zoom/25)};
const calcStrokeWidth = (zoom) =>
  (zoom *1.3) < 22 ? 23 - (zoom * 1.3) : 1;
// const calcRadiusScale = (zoom) =>
//   (zoom *13) < 210 ? 216 - (zoom * 13) : 6;
const calcOneOf = (zoom) =>
  zoom > 12.8 ? 1 : zoom > 12 ? 10 : zoom > 11 ? 100 : 1000;
  //zoom > 12.7 ? 1 : zoom < 11 ? 1000: zoom > 11 ? 100 : 10;


const samprops = { //have all decided with same logic??
  //racial_entropy_index: '',
  explainIndex: 0,
  geojson_title: 'Super_Neighborhoods.geojson',// 'Harvey_Houston.geojson',
  limit: 40000,
  one_of: calcOneOf(firstzoom),
  member: "",
  race: "",
  age: 55,
  bottom_range: 0,
  top_range: 100,
  educational_attainment: '',
  stresslevelincome: '',
  employment: '',
  longitude: -95.315,
  latitude: 29.75,
  zoom: firstzoom,
  opacity: calcOpacity(firstzoom),
  radiusMinPixels: 2.5,
  radiusMaxPixels: 100,
  strokeWidth: calcStrokeWidth(firstzoom),
  //radiusScale: calcRadiusScale(firstzoom), //letting it do automatic
  outline: false,
  pickable: true,
  dist: 170000,
  allcolors: allcolors,
  toShow: toShow,
  forColors: assignColors(toShow[0]),
  changeColors: false, //let's you turn off select for colors on factors - if we can change that with an input, perhaps forces reload??
  categIndex: 0,
  catShow: 'race', //faster color in map-box-app - if can also read opacity off of toShow[categIndex], then have per color control.
  cloudOrPlot: 'Plot', //scatterplot or cloud on map
  plotFactorColors: list4plots(['race','educational_attainment','employment'])
  //this logic will apply to everything we want to show - component should feed whole object here
};

export default class App extends React.PureComponent {
   constructor(props) {
       super(props);
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onCatChange = this.onCatChange.bind(this);
       this.onFactortoShow = this.onFactortoShow.bind(this);
       this.onChangetoShow = this.onChangetoShow.bind(this);
       this.onMapChange = this.onMapChange.bind(this);
       this.setToolInfo = this.setToolInfo.bind(this);
       this.setClick = this.setClick.bind(this);
       this.setExplanation = this.setExplanation.bind(this);
       this.setWaiting = this.setWaiting.bind(this);
       //bbox is NW,NE,SE,SW
       const bbox = [[-95.91,28.93],[-94.67,28.93],[-94.67,30.47],[-95.91,30.47]];
       this.state = {
         waiting: 1,
         toolTipInfo : {text:'Hover over features or sam citizens for info.'},
         //explanation : model_explanations()[samprops.explainIndex],//{text: <div><span>We can have any number of things here.</span><span>Start with why health disparities research requires understanding how individual people contribute to the whole (and are not just statistics).</span></div>},
         samprops : samprops,
         mapprops : {
              bbox: bbox, //may use later for searches - now based on geonear in circle
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: samprops.longitude, //-95.315,
                latitude: samprops.latitude, //29.75,
                zoom: samprops.zoom,//16.051394480575627, //which is zoom for 1 meter for testing
                pitch: 20,
                bearing: 0
              }
            }
         };
         this.onMapChange = debounce(this.onMapChange, 1000);
         this.setToolInfo = debounce(this.setToolInfo, 200);
         this.handlePopulationChange = debounce(this.handlePopulationChange, 1000);
   };
  //this lets you step up on data in scatter and mapbox; not just slider
  setWaiting = function(wait){
    this.setState({waiting:wait})
  };
  handlePopulationChange = function(limit) {
    var samprops = {...this.state.samprops}
    samprops.limit = limit;
    this.setState({samprops});
  };
  handleGeoJSONChange = function(geojson_title) {
    var samprops = {...this.state.samprops}
    samprops.geojson_title = geojson_title;
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
    });
    this.setState({samprops});
  }
  onFactortoShow = function(e){
    var samprops = {...this.state.samprops}
    var newr = 0;
    samprops.toShow.forEach(function(row,r){
      if(samprops.categIndex == r){ //if "all" is the factorName = '', then all will be returned
        samprops[samprops.toShow[r].category] = e.factorName; //this writes it out to the args in resolver.js
        samprops.toShow[r].fnd = e.factorName;
      }
    })
    this.setWaiting(1);
    this.setState({samprops});
  }

  onChangetoShow = function(showObj){
    console.log(showObj)
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
    samprops.opacity = calcOpacity(mapstuff.zoom);
    samprops.strokeWidth = calcStrokeWidth(mapstuff.zoom);
    samprops.one_of = calcOneOf(mapstuff.zoom);
    if(this.state.samprops.one_of != samprops.one_of){this.setWaiting(1)}
    this.setState({samprops});
  };

  onSamDataChange = function(datactrls){
    var samprops = {...this.state.samprops}
    samprops.toShow = datactrls.toShow;
    samprops.mapOrPlot = datactrls.mapOrPlot;//also use to set map to 80 degrees??May need to turn off map??
    this.setState({samprops});
  };
  //expl should be an object {text: valid_html} - will usually be set from model selector
  setExplanation = function(e){
    console.log(e.target.value) //should have a target - should set the explainIndex, and the explanation?? pull in model_explanation.js??
    var samprops = {...this.state.samprops}
    samprops.explainIndex = e.target.value;
    //explanation = expl
    this.setState({samprops})
    //could also set the toShow, etc. to go along with different models, if the pull-downs are too long
  };
//this is the tooltip
  setToolInfo = function(info){
    var toolTipInfo = {...this.state.toolTipInfo}
    toolTipInfo.info = info
    toolTipInfo.text = ''
    console.log(toolTipInfo)
    console.log(toolTipInfo.account)
    this.setState({toolTipInfo})
  };
  setClick = function(info){
    var toolTipInfo = {...this.state.toolTipInfo}
    toolTipInfo.info = info
    toolTipInfo.text = ''
    console.log(toolTipInfo)
    console.log('toolTipInfo.account')
    this.setState({toolTipInfo})
  };
  formatDollars = function(number){
    if (number!=undefined){
        var numstring = number.toString();
      return '$'+numstring+'/year'
    }else{
      return 'undefined'
    }
  };

  // componentWillUnmount(){
  //   client.resetStore();
  // }

  render(){
    let patience = <div></div>
    if (this.state.waiting){ patience =
        <div style={{position:"absolute",zIndex:'10',width:"100%",height:"100%",backgroundColor:"#7f7f7f33"}}>
        <div style={{marginTop:"30%", marginLeft:"30%", color:"green", fontSize:"2em"}}>
        Loading Data ... thank you for your patience</div></div>
      }


      //if (loading) return null;
      return (
          <div>
          {patience}
              <div style={{position:"absolute",width:"100%",fontSize:"4em",textAlign:"center", zIndex:"3"}}>
                <span title="Houston on a first name basis" style={{backgroundColor:"#7f7f7f33",borderRadius:"25px"}}>Sam City</span>
              </div>
              <div style={{position:"absolute",top:"75%",left:"85%",width:"10%",backgroundColor:"#f8f8ff",zIndex:"3"}}>
                <hr/>
                <span title="Data Analytics in Student Hands">
                  <img style={{width:"100%"}} src='/images/DASHlogo.png' />
                </span>
                <hr/>
                <span title="The Honors College at the University of Houston">
                  <img style={{width:"100%"}} src='/images/honors-the-honors-college-primary.png' />
                </span>
              </div>
              <div style={{position:"absolute",width:model_explanations(this.state.samprops.explainIndex).div_width,
                            left:model_explanations(this.state.samprops.explainIndex).div_left,height:"100%",
                            overflow: "scroll",backgroundColor:"#f8f8ff",zIndex:"3"}}>

                <span style={{position:"relative",backgroundColor:"#f8f8ff",zIndex:"4",borderRadius:"25px"}}>

                {(model_explanations(this.state.samprops.explainIndex).model_name != 'none') && <div><hr/></div>}
                  <h2 style={{textAlign:"center"}}>{model_explanations(this.state.samprops.explainIndex).h2_title}</h2>
                  <div style={{textAlign:"center",fontWeight: "bold"}}>{model_explanations(this.state.samprops.explainIndex).author}</div>
                  {(model_explanations(this.state.samprops.explainIndex).model_name != 'none') && <div><hr/><br/></div>}
                  <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).text}</div>
                  {(model_explanations(this.state.samprops.explainIndex).model_name != 'none') && <div><hr/><br/></div>}
                  <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.samprops.explainIndex).img} />

                  <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.samprops.explainIndex).img1} />
                  <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.samprops.explainIndex).img2} />
                  <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.samprops.explainIndex).img3} />
                  <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.samprops.explainIndex).img4} />
                  <p style={{textAlign:"center",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).img_title}</p>
                  <h3>{model_explanations(this.state.samprops.explainIndex).div2}</h3>
                  <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).text2}</div>
                  <h3>{model_explanations(this.state.samprops.explainIndex).div3}</h3>
                  <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).text3}</div>
                {(model_explanations(this.state.samprops.explainIndex).model_name != 'none') && <div><hr/></div>}
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations}</div>
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations1}</div>
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations2}</div>
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations3}</div>
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations4}</div>
                  <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.samprops.explainIndex).citations5}</div>

                {(model_explanations(this.state.samprops.explainIndex).model_name != 'none') && <div><hr/></div>}
                  {this.state.toolTipInfo.text}
                  {this.state.toolTipInfo.info ?
                    <div style={{position:"relative"}}>
                      {this.state.toolTipInfo.info.age != "NA" & this.state.toolTipInfo.info.age != ""   &&
                        <div> Age -  {this.state.toolTipInfo.info.age} </div>}
                      {this.state.toolTipInfo.info.citizenship != "NA" & this.state.toolTipInfo.info.citizenship != "" &&
                        <div> Citizen -  {this.state.toolTipInfo.info.citizenship} </div>}
                      {this.state.toolTipInfo.info.educational_attainment != "NA" & this.state.toolTipInfo.info.educational_attainment != "" &&
                        <div> Education -  {this.state.toolTipInfo.info.educational_attainment} </div>}
                      {this.state.toolTipInfo.info.employment != "NA" & this.state.toolTipInfo.info.employment != "" &&
                        <div> Employment -  {this.state.toolTipInfo.info.employment} </div>}
                      {this.state.toolTipInfo.info.sex != "NA" & this.state.toolTipInfo.info.sex != "" &&
                        <div> Sex -  {this.state.toolTipInfo.info.sex} </div>}
                      {this.state.toolTipInfo.info.race != "NA" & this.state.toolTipInfo.info.race != "" &&
                        <div> Race -  {this.state.toolTipInfo.info.race} </div>}
                      {this.state.toolTipInfo.info.household_income != "NA" & this.state.toolTipInfo.info.household_income != "" &&
                        <div> Household Income -  {this.formatDollars(this.state.toolTipInfo.info.household_income)} </div>}
                      {this.state.toolTipInfo.info.household_type != "NA" & this.state.toolTipInfo.info.household_type != "" &&
                        <div> Household Type -  {this.state.toolTipInfo.info.household_type} </div>}
                      {this.state.toolTipInfo.info.quality_description != "NA" & this.state.toolTipInfo.info.quality_description != "" &&
                        <div> HCAD Quality Rating -  {this.state.toolTipInfo.info.quality_description} </div>}
                      </div>
                      : null
                    }
                </span>
              </div>
            <LegendBox
              samprops={this.state.samprops}
              onPopChange={this.handlePopulationChange}
              onCatChange={this.onCatChange}
              onFactortoShow={this.onFactortoShow}
              onChangetoShow={this.onChangetoShow}
              onMapChange={this.onMapChange}
              setExplanation={this.setExplanation}
              setToolInfo={this.setToolInfo}
            />

            <SamDataForm
              mapprops={this.state.mapprops}
              samprops={this.state.samprops}
              onMapChange={this.onMapChange}
              setToolInfo={this.setToolInfo}
              setClick={this.setClick}
              setWaiting={this.setWaiting}
              handlePopulationChange={this.handlePopulationChange}
              />
          </div>
      );
    };
  };
