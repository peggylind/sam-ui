import React, {Component} from "react";
//import SidePane from "./side-pane"; //would liftup twice for components under SidePane
import debounce from 'lodash.debounce'
//import asyncComponent from './asyncComponent'; //may not use - still testing
import SamDataForm from './SamDataForm'; //change to just samdatamap??

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

const firstzoom = 9.3;
const firstdist = 100000;
const calcOpacity = (zoom) => { return 1 - (zoom/25)};
const calcStrokeWidth = (zoom) =>
  (zoom *1.3) < 22 ? 23 - (zoom * 1.2) : 1;
// const calcRadiusScale = (zoom) =>
//   (zoom *13) < 210 ? 216 - (zoom * 13) : 6;
const calcOneOf = (zoom) =>
  zoom > 14.3 ? 1 : zoom > 13 ? 10 : zoom > 11.3 ? 100 : 1000;
  //zoom > 12.7 ? 1 : zoom < 11 ? 1000: zoom > 11 ? 100 : 10;
const bbox_bl = []; // [-97.1,28.16]; //first one should get everything
const bbox_ur = []; //[-94.1,30.94];

const samprops = { //have all decided with same logic?? //a bunch of stuff should be fixed if we go apollo 3.1 - for now need it in both for search!!
  //racial_entropy_index: '',
  explainIndex: 0,
  geojson_title: 'Super_Neighborhoods.geojson',// 'Harvey_Houston.geojson',
  limit: 14000,
  one_of: calcOneOf(firstzoom),
  //factors: {}, //will replace individual categories, but need to test.
  // member: "",
  _id: null,
  account: null,
  age: null,
  asthma: null,
  autism_by_CRH: null,
  autism_by_maternal_age: null,
  bbox_bl: bbox_bl,
  bbox_ur: bbox_ur,
  bottom_range: 0,
  bracket_age: null,
  citizenship: null,
  date_erected: null,
  disability: null,
  dist: firstdist,
  educational_attainment: null,
  education_entropy_index: null,
  employment: null,
  english_speaking_skills:null,
  health_insurance: null,
  household_type: null,
  individual_id: null,
  language_at_home: null,
  lowbirthweightbyrace: null,
  maternal_CRH: null,
  means_of_transportation_to_work: null,
  member: null,
  nativity: null,
  pregnant: null,
  prenatal_first_tri: null,
  quality_description: null,
  race: null,
  racial_entropy_index: null,
  stresslevelincome: null,
  stresslevelrace: null,
  top_range: null,
  travel_time_to_work: null,
  veteran_status: null,
  zip: null,
  zip_education_entropy_index: null,
  zip_racial_entropy_index: null,
  datacount: {initialcount:1,totalpop:0},
  height: 40000,
  longitude: -95.355, //starting center
  latitude: 29.8,
  zoom: firstzoom,
  cellSize: 5000,
  opacity: 1,//calcOpacity(firstzoom),
  radiusMinPixels: 2.8,
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
  step_index : 0,
  modeltext : '',
  openHousehold: 0,
  textname: '',
  textposition: []
  //this logic will apply to everything we want to show - component should feed whole object here
};

export default class App extends React.PureComponent {
   constructor(props) {
       super(props);
       this.handlePopulationChange = this.handlePopulationChange.bind(this);
       this.onGridSizeChange = this.onGridSizeChange.bind(this);
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
       this.setWaiting = this.setWaiting.bind(this); //still need for resetting boundaries
       this.setUpdate = this.setUpdate.bind(this);
       this.setOpenHousehold = this.setOpenHousehold.bind(this);
       this.countData = this.countData.bind(this);
       this.changeSamProps = this.changeSamProps.bind(this);

       this.state = {
         waiting: 1,
         update: 1,
         toolTipInfo : {text:''}, //{text:'Hover or click for info.'},
         //explanation : model_explanations()[samprops.explainIndex],//{text: <div><span>We can have any number of things here.</span><span>Start with why health disparities research requires understanding how individual people contribute to the whole (and are not just statistics).</span></div>},
         highlight_data : [],
         samprops : samprops,
         mapprops : {
              // bbox_ur: bbox_ur,
              // bbox_bl: bbox_bl, //may use later for searches - now based on geonear in circle
              mode: 1, //[GeoMap,ScatterMap,HexMap,PointCloudMap,GridMap,GridCellMap,ContourMap]
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                longitude: samprops.longitude, //-95.315,
                latitude: samprops.latitude, //29.75,
                zoom: samprops.zoom,//16.051394480575627, //which is zoom for 1 meter for testing
                pitch: 5,
                bearing: 0
              }
            }
         };
         this.onMapChange = debounce(this.onMapChange, 100);
         this.setUpdate = debounce(this.setUpdate, 100);
         this.setWaiting = debounce(this.setWaiting, 100);
         this.setToolInfo = debounce(this.setToolInfo, 100);
         this.handlePopulationChange = debounce(this.handlePopulationChange, 100);
   };
  setWaiting = function(wait){
    console.log('setWaiting fired '+wait)
    this.setState({waiting:wait})
  };
  setUpdate = function(up){
    console.log('setUpdate '+up)
    this.setState({update:up})
  }
  setOpenHousehold = function(open){
    console.log(open)
    var samprops = {...this.state.samprops}
    samprops.openHousehold = open
    this.setState({samprops})
  };
  countData = function(data){
    var samprops = {...this.state.samprops}
    let category = samprops.toShow[samprops.categIndex].category
    samprops.datacount[category] = {all:0}
    for(let i=0; i<data.length; i++) {
      samprops.datacount[category]['all'] += samprops.one_of
      let factor = data[i][category]
      if(samprops.datacount.initialcount){
        samprops.datacount['totalpop'] += samprops.one_of
      };
      if(!samprops.datacount[category][factor]){
        samprops.datacount[category][factor] = 0
      }
      samprops.datacount[category][factor] += samprops.one_of

    }
    samprops.datacount['initialcount'] = 0;
    this.setState({samprops});
  }
  onGridSizeChange = function(size) {
    var samprops = {...this.state.samprops}
    samprops.cellSize = size;
    this.setState({samprops});
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
  onScaleChange = function(e_obj){
    var samprops = {...this.state.samprops}
    var mapprops = {...this.state.mapprops}
    mapprops.mode = e_obj.Mode;
    // console.log(e_obj)
    // if(isNaN(event)){
        samprops.toShowScale.forEach(function(row,r){
          if(row.category == e_obj.ScaletoShow){
            samprops.scaleIndex = r;
            samprops.scaleShow = row.category; //only used in map-box right now --fix this and catShow!!
            //samprops.toShowScale[r].fnd = row.category;
            samprops.toShowScale[r].fnd_bottom_num = e_obj.ScaleBottom;
            samprops.toShowScale[r].fnd_top_num = e_obj.ScaleTop;
            samprops.toShowScale[r].ScaleHeight = e_obj.ScaleHeight;
            samprops.toShowScale[r].Mode = e_obj.Mode;
            if(r==0){mapprops.mode=1}else{mapprops.mode=7}; //other scale possibilities later
            //samprops.forColors = assignColors(samprops.toShow[r]); -- need one for size settings?
        }})
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
        samprops[samprops.toShow[r].category] = e.factorName; //this writes it out to the args in resolver.js //old way
        //samprops['factors'][samprops.toShow[r].category] = e.factorName; //new way - testing.
        samprops.toShow[r].fnd = e.factorName;
      }
    })
    this.setUpdate(1);
    this.setState({samprops});
  }

  onChangetoShow = function(showObj){
     var samprops = {...this.state.samprops}
     samprops.toShow.forEach(function (catRow, i){
       if (catRow.category==showObj.catName){
         //console.log(catRow.category+' tochange to categIndex '+i)
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

  onMapChange = function(mapstuff,dist,height,bl,ur){ //height is used for normalizing for plot -- and can be used to make height of legendbox, too
    // console.log("mapstuff dist ")
    // console.log(mapstuff)
    var samprops = {...this.state.samprops}
    //var mapprops = {...this.state.mapprops}
    samprops.latitude = mapstuff.latitude;
    samprops.longitude = mapstuff.longitude;
    samprops.zoom = mapstuff.zoom < 9 ? 9 : mapstuff.zoom;
    samprops.dist = dist;
    //samprops.cellSize = dist/50;
    samprops.height = height;
    samprops.opacity = calcOpacity(mapstuff.zoom);
    samprops.strokeWidth = calcStrokeWidth(mapstuff.zoom);
    samprops.one_of = calcOneOf(mapstuff.zoom);
    samprops.bbox_bl = bl;
    samprops.bbox_ur = ur;
    //console.log(bbox_bl,bbox_ur)
    //if(this.state.samprops.one_of != samprops.one_of){this.setWaiting(1)}
    console.log('onMapChange')
    this.setUpdate(1);
    // this.setWaiting(1);
    this.setState({samprops});
  };
//not using onSamDataChange??
  // onSamDataChange = function(datactrls){
  //   var samprops = {...this.state.samprops}
  //   samprops.toShow = datactrls.toShow;
  //   samprops.mapOrPlot = datactrls.mapOrPlot;//also use to set map to 80 degrees??May need to turn off map??
  //   this.setState({samprops});
  // };
  //expl should be an object {text: valid_html} - will usually be set from model selector
  setExplanation = function(e){
    //console.log(e.target.value) //should have a target - should set the explainIndex, and the explanation?? pull in model_explanation.js??
    var samprops = {...this.state.samprops}
    samprops.explainIndex = e.target.value;
    this.setUpdate(1);
    //explanation = expl
    this.setState({samprops,exp_width: model_explanations(samprops.explainIndex).div_width})
    //could also set the toShow, etc. to go along with different models, if the pull-downs are too long
  };
  changeSamProps = function(obj){
    var samprops = {...this.state.samprops}
    samprops['categIndex'] = obj.categIndex;
    samprops['step_index'] = obj.step_index;
  //need something for no reload  - maybe separate call for ones that don't need a reload??
    if(obj.categories){
      obj = obj.categories
      categories = categories(-1) //finds all of them, not just the subset for toShow, etc.
      categories.forEach(function(cat,k){ //leaving none in list
        obj.forEach(function(ocat,n){
          samprops[cat.category] = ocat[cat.category] ? ocat[cat.category].factor : null
          samprops['bottom_range'] = ocat['bottom_range'] ? ocat['bottom_range'] : null
          samprops['top_range'] = ocat['top_range'] ? ocat['top_range'] : null
        })
      })
  //need to get obj.fnd
      samprops.toShow.forEach(function(categ,i){
        obj.forEach(function(ocateg,m){
        //have to walk all to clear earlier ones if they start tour inside...
          samprops.toShow[i].fnd = ocateg[categ.category] ? ocateg[categ.category].fnd ? ocateg[categ.category].fnd : null : null
        })
      })
      samprops.toShowScale.forEach(function(categ,i){
        console.log('toShowScale '+categ)
        //need to fix logic for range variables!!!
        samprops.toShowScale[i].bottom_range = obj[0].bottom_range
        samprops.toShowScale[i].top_range = obj[0].top_range
        obj.forEach(function(ocateg,m){
        //have to walk all to clear earlier ones if they start tour inside...
          samprops.toShowScale[i].fnd = ocateg[categ.category] ? ocateg[categ.category].fnd ? ocateg[categ.category].fnd : null : null
        })
      })
    }
    this.setState({samprops})
  }

  setHighlight = function(array){
    this.setState({highlight_data:array})
  }
  setText = function(txt,position){ //not sure what's wrong with this on TextLayer - need to control deck.gl render!!! for now, ignoring position
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
    // var toolTipInfo = {...this.state.toolTipInfo}
    // toolTipInfo.info = info
    //toolTipInfo.text = ''
    var samprops = {...this.state.samprops}
    samprops.household_id = info.household_id
  //  console.log(info)
    samprops.account = info.account
    samprops.openHousehold = 1
    this.setState({samprops})
  };
  numberWithCommas = function(x) {
    if(x!=undefined){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return null
    }
  }
  // componentWillUnmount(){
  //   client.resetStore();
  // }

  render(){

//not sure about fonts ---
      return (
          <div style={{fontFamily:"League Gothic"}}>
              <div style={{position:"absolute",width:"100%",textAlign:"center", zIndex:"3"}}>
                <span title="Houston on a first name basis" style={{backgroundColor:"#F6BE00",borderRadius:"12px",fontSize:"4em",borderStyle:"groove",borderColor:"#888B8D"}}>Sam City</span>
                <span style={{position:"absolute",left:"15%"}}>
                {this.state.samprops.toShow.map((category,ind) =>
                  category.fnd &&
                    <div style={{backgroundColor:"#F6BE00",fontSize:"1em",zIndex:6}} key={'fnd'+ind}>
                    <span>
                    <div>Filtered by</div>
                      {category.pretty_name.substring(0,20)} : {category.fnd.substring(0,20).toLowerCase()}
                      <br></br>
                      {this.state.samprops.datacount[category.category] &&
                        this.numberWithCommas(this.state.samprops.datacount[category.category][category.fnd])}
                    </span>
                    </div>
                )}

                {this.state.samprops.toShowScale.map((category,ind) =>
                  category.fnd &&
                    <div style={{backgroundColor:"#F6BE00",fontSize:"1em",zIndex:6}}
                    key={ind}>
                      {category.pretty_name.substring(0,20)} : {category.bottom_range} - {category.top_range}
                      <br></br>
                      {this.state.samprops.datacount[category.category] &&
                        this.numberWithCommas(this.state.samprops.datacount[category.category][category.fnd])}
                    </div>
                )}
                </span>

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
              changeSamProps={this.changeSamProps}
            />

            <LegendBox
              mapprops={this.state.mapprops}
              samprops={this.state.samprops}
              //changeSamProps={this.changeSamProps}
              onPopChange={this.handlePopulationChange}
              onCatChange={this.onCatChange}
              onScaleChange={this.onScaleChange}
              onFactortoShow={this.onFactortoShow}
              onChangetoShow={this.onChangetoShow}
              onMapChange={this.onMapChange}
              onGridSizeChange={this.onGridSizeChange}
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
              setUpdate={this.setUpdate}
              update={this.state.update}
              countData={this.countData}
              waiting={this.state.waiting}
              setOpenHousehold={this.setOpenHousehold}
              handlePopulationChange={this.handlePopulationChange}
              />
          </div>
      );
    };
  };
