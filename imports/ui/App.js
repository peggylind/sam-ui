import React, {Component} from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
//import SidePane from "./side-pane"; //would liftup twice for components under SidePane
import debounce from 'lodash.debounce'
//import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??
import Slide from './slider-input';
import LegendBox from './legend-box';
import {model_explanations} from "./model_explanations";
import {categories} from "./categories";
import ModelDivs from './model_div';
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
const toShow = categories([11,2,3,5,7,8,9,10,13,16]); //can order as pleased
const toShowScale = categories([0,6,1,4,12,14,15]);

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
const firstdist = 100000;
const calcOpacity = (zoom) => { return 1 - (zoom/25)};
const calcStrokeWidth = (zoom) =>
  (zoom *1.3) < 22 ? 23 - (zoom * 1.3) : 1;
// const calcRadiusScale = (zoom) =>
//   (zoom *13) < 210 ? 216 - (zoom * 13) : 6;
const calcOneOf = (zoom) =>
  zoom > 14.3 ? 1 : zoom > 13 ? 10 : zoom > 11 ? 100 : 1000;
  //zoom > 12.7 ? 1 : zoom < 11 ? 1000: zoom > 11 ? 100 : 10;


const samprops = { //have all decided with same logic?? //a bunch of stuff should be fixed if we go apollo 3.1 - for now need it in both for search!!
  //racial_entropy_index: '',
  explainIndex: 0,
  geojson_title: 'Super_Neighborhoods.geojson',// 'Harvey_Houston.geojson',
  limit: 14000,
  one_of: calcOneOf(firstzoom),
  // member: "",
  age: 55,
  asthma: '',
  autism_by_CRH: '',
  autism_by_maternal_age: '',
  bottom_range: 0,
  bracket_age: '',
  citizenship: '',
  date_erected: '',
  disability: '',
  dist: firstdist,
  educational_attainment: '',
  education_entropy_index: null,
  employment: '',
  english_speaking_skills:'',
  health_insurance: '',
  household_type: '',
  individual_id: '',
  language_at_home: '',
  lowbirthweightbyrace: '',
  maternal_CRH: '',
  means_of_transportation_to_work: '',
  member: "",
  nativity: '',
  pregnant: '',
  prenatal_first_tri: '',
  quality_description: '',
  race: "",
  racial_entropy_index: null,
  stresslevelincome: '',
  stresslevelrace: '',
  top_range: 100,
  travel_time_to_work: '',
  veteran_status: '',
  zip: '',
  zip_education_entropy_index: null,
  zip_racial_entropy_index: null,
  height: 40000,
  longitude: -95.315,
  latitude: 29.75,
  zoom: firstzoom,
  cellSize: firstdist/50,
  opacity: calcOpacity(firstzoom),
  radiusMinPixels: 2.5,
  radiusMaxPixels: 100,
  strokeWidth: calcStrokeWidth(firstzoom),
  //radiusScale: calcRadiusScale(firstzoom), //letting it do automatic
  outline: false,
  pickable: true,
  allcolors: allcolors,
  toShow: toShow,
  toShowScale: toShowScale,
  forColors: assignColors(toShow[0]),
  changeColors: false, //let's you turn off select for colors on factors - if we can change that with an input, perhaps forces reload??
  categIndex: 0,
  scaleIndex: 0,
  catShow: 'race', //faster color in map-box-app - if can also read opacity off of toShow[categIndex], then have per color control.
  scaleShow: 'none', //'income',
  openHousehold: 1,
  textname: '',
  textposition: []
  //this logic will apply to everything we want to show - component should feed whole object here
};

export default class App extends React.PureComponent {
   constructor(props) {
       super(props);
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onCatChange = this.onCatChange.bind(this);
       this.onScaleChange = this.onScaleChange.bind(this);
       this.onFactortoShow = this.onFactortoShow.bind(this);
       this.onChangetoShow = this.onChangetoShow.bind(this);
       this.onMapChange = this.onMapChange.bind(this);
       this.setToolInfo = this.setToolInfo.bind(this);
       this.setClick = this.setClick.bind(this);
       this.setHighlight = this.setHighlight.bind(this);
       this.setText = this.setText.bind(this);
       this.setExplanation = this.setExplanation.bind(this);
       this.setWaiting = this.setWaiting.bind(this);
       //bbox is NW,NE,SE,SW
       const bbox = [[-95.91,28.93],[-94.67,28.93],[-94.67,30.47],[-95.91,30.47]];
       this.state = {
         waiting: 1,
         toolTipInfo : {text:'Hover cursor for info.'},
         //explanation : model_explanations()[samprops.explainIndex],//{text: <div><span>We can have any number of things here.</span><span>Start with why health disparities research requires understanding how individual people contribute to the whole (and are not just statistics).</span></div>},
         highlight_data : [],
         samprops : samprops,
         mapprops : {
              bbox: bbox, //may use later for searches - now based on geonear in circle
              mode: 1, //[GeoMap,ScatterMap,HexMap,PointCloudMap,GridMap,GridCellMap,ContourMap]
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: samprops.longitude, //-95.315,
                latitude: samprops.latitude, //29.75,
                zoom: samprops.zoom,//16.051394480575627, //which is zoom for 1 meter for testing
                pitch: 10,
                bearing: 0
              }
            }
         };
         this.onMapChange = debounce(this.onMapChange, 1000);
         this.setToolInfo = debounce(this.setToolInfo, 200);
         this.handlePopulationChange = debounce(this.handlePopulationChange, 1000);
   };
  //if update to Apollo 3, won't need
  setWaiting = function(wait){
    this.setState({waiting:wait})
  };
  //use generally for slider in HOC
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
  onScaleChange = function(event){
    var samprops = {...this.state.samprops}
    var mapprops = {...this.state.mapprops}
    if(event==''){
      mapprops.mode = 4
      // if (mapprops.mode>0 && mapprops.mode<5){
      //   mapprops.mode+=1
      //   }else{
      //   mapprops.mode=1
      // }
    }else{
      samprops.toShowScale.forEach(function(row,r){
        if(row.category == event.target.value){
          samprops.scaleIndex = r;
          samprops.scaleShow = row.category; //only used in map-box right now --fix this and catShow!!
          if(r==0){mapprops.mode=1}else{mapprops.mode=3}; //other scale possibilities later
          //samprops.forColors = assignColors(samprops.toShow[r]); -- need one for size settings?
      }})
    };

    this.setState({samprops,mapprops});
  }
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
     var samprops = {...this.state.samprops}
     samprops.toShow.forEach(function (catRow, i){
       if (catRow.category==showObj.catName){
         console.log(catRow.category+' tochange to categIndex '+i)
         catRow.factors.forEach(function (factorRow, j){
           if (factorRow.factorName == showObj.factorName){
             factorRow.factorColor = showObj.factorColor;
             samprops.toShow[i].factors[j] = factorRow;
             samprops.allcolors = samprops.allcolors;
             samprops.forColors = assignColors(samprops.toShow[i]); //may be able to make this smoother
             samprops.categIndex = i;
             samprops.catShow = samprops.toShow[i].category; //only used in map-box right now
           };
         });
       };
     });
     this.setState({samprops});
  };

  onMapChange = function(mapstuff,dist,height){ //height is used for normalizing for plot -- and can be used to make height of legendbox, too
    console.log("mapstuff dist "+dist+"  "+height)
    var samprops = {...this.state.samprops}
    samprops.latitude = mapstuff.latitude;
    samprops.longitude = mapstuff.longitude;
    samprops.zoom = mapstuff.zoom;
    samprops.dist = dist;
    samprops.cellSize = dist/50;
    samprops.height = height;
    samprops.opacity = calcOpacity(mapstuff.zoom);
    samprops.strokeWidth = calcStrokeWidth(mapstuff.zoom);
    samprops.one_of = calcOneOf(mapstuff.zoom);
    if(this.state.samprops.one_of != samprops.one_of){this.setWaiting(1)}
    this.setState({samprops});
  };
//not using onSamDataChange??
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
    this.setState({samprops,exp_width: model_explanations(samprops.explainIndex).div_width})
    //could also set the toShow, etc. to go along with different models, if the pull-downs are too long
  };
  setHighlight = function(object){
    console.log(object)
    this.setState({highlight_data:[object]})
  }
  setText = function(txt,position){ //not sure what's wrong with this - need to control deck.gl render!!!
    var samprops = {...this.state.samprops}
    samprops.textname = txt;
    samprops.textposition = position;
    this.setState({samprops})
  }
//this is the tooltip
  setToolInfo = function(info){
    var toolTipInfo = {...this.state.toolTipInfo}
    toolTipInfo.info = info
    //toolTipInfo.text = '' //should be set from
    //console.log(info)
    this.setState({toolTipInfo})
  };
  setClick = function(info){
    var toolTipInfo = {...this.state.toolTipInfo}
    toolTipInfo.info = info
    //toolTipInfo.text = ''
    var samprops = {...this.state.samprops}
    //console.log('in App'+info.household_id)
    samprops.household_id = info.household_id
    samprops.openHousehold = 1
    this.setState({toolTipInfo,samprops})
  };

  // componentWillUnmount(){
  //   client.resetStore();
  // }

  render(){
    let patience = <div></div>
    if (this.state.waiting){ patience =
        <div style={{position:"absolute",zIndex:'10',width:"100%",height:"100%",backgroundColor:"#7f7f7f33"}}>
        <div style={{marginTop:"30%", marginLeft:"3%", color:"green", fontSize:"2em",textAlign:"center"}}>
        <div>Loading Data ... </div><div>thank you for your patience</div></div></div>
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
            <ModelDivs
              samprops={this.state.samprops}
              toolTipInfo={this.state.toolTipInfo}
            />

            <LegendBox
              samprops={this.state.samprops}
              onPopChange={this.handlePopulationChange}
              onCatChange={this.onCatChange}
              onScaleChange={this.onScaleChange}
              onFactortoShow={this.onFactortoShow}
              onChangetoShow={this.onChangetoShow}
              onMapChange={this.onMapChange}
              setExplanation={this.setExplanation}
              setToolInfo={this.setToolInfo}
            />

            <SamDataForm
              mapprops={this.state.mapprops}
              samprops={this.state.samprops}
              highlight_data={this.state.highlight_data}
              onMapChange={this.onMapChange}
              setToolInfo={this.setToolInfo}
              setText={this.setText}
              setClick={this.setClick}
              setHighlight={this.setHighlight}
              setWaiting={this.setWaiting}
              handlePopulationChange={this.handlePopulationChange}
              />
          </div>
      );
    };
  };
