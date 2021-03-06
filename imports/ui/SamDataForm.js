import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';

//import { withTracker } from 'meteor/react-meteor-data';
import SamCitizens from '/imports/api/sam_citizens/sam_citizens';

import MapBox from "./map-box-app";


const formatDollars = function(number){
  if (number!=undefined){
      var numstring = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '$'+numstring+'/year'
  }else{
    return null
  }
};


/* move into its own HOC??
const GetHousehold = ({ account, household_id, showapts }) => (
  <Query
    query={houseQuery}
    variables={{ account, household_id }}
    notifyOnNetworkStatusChange
  >
  {({ loading, error, data, refetch, networkStatus }) => {
      let account_count = <span></span>
      let house_header = <span></span>
      let house_header2 = <span></span>
      let house_title = <span></span>
      let house = <span></span>
      let hr = <span></span>
      let apt = <span></span>
      let storybutton = <span></span>
      let ldg = <span></span>  //copying patience from App.js
      if (loading){
        ldg =
              <div style={{position:"absolute",zIndex:'10',width:"100%",height:"100%",backgroundColor:"#7f7f7f33"}}>
              <div style={{marginTop:"30%", marginLeft:"3%", color:"green", fontSize:"2em",textAlign:"center"}}>
              <div>Loading Data ... </div><div>thank you for your patience</div></div></div>
      }else{
        ldg = <span></span>
      };
      if(data){
        if(data.samhouse){
          if(data.samhouse.length>0){
            account_count = <div style={{fontSize:".8em",textAlign:"center"}}>{data.samhouse.length} people live at this house/apartment address</div>
            let loc_name = data.samhouse[0].loc_name.charAt(0).toUpperCase() + data.samhouse[0].loc_name.slice(1).toLowerCase()
            hr = <hr></hr>
            house_header = <div style={{fontSize:"1.2em",textAlign:"center"}}>Household Characteristics</div>
            house_header2 = <div>Household Income: {formatDollars(data.samhouse[0].household_income)}, HCAD quality of housing: {data.samhouse[0].quality_description}</div>
            house_title = <div>This is not real data, but represents a plausible household for: <br></br> {data.samhouse[0].loc_num} {loc_name}, TX {data.samhouse[0].zip} based on census data.</div>
            house = data.samhouse.map((citizen, ind) =>
              (citizen.household_id == household_id ?
                <div key={ind+"cit"+citizen.household_id}>
                <div>This {citizen.member.toLowerCase()} is {citizen.age} years old, {citizen.employment.toLowerCase()} a {citizen.nativity.toLowerCase()} {citizen.citizenship.toLowerCase()} of the U.S., with {citizen.educational_attainment.toLowerCase()}</div>
                <div></div></div> : null))
            if(showapts){
            apt = data.samhouse.map((citizen, ind) =>
              (citizen.household_id != household_id ?
                <div key={ind+"cit"+citizen.household_id}>
                <div>This {citizen.member.toLowerCase()} is {citizen.age} years old, {citizen.employment.toLowerCase()} a {citizen.nativity.toLowerCase()} {citizen.citizenship.toLowerCase()} of the U.S., with {citizen.educational_attainment.toLowerCase()}</div>
                <div></div></div> : null))
            }
            storybutton = <button style={{width:"100%"}}>Show this person's story</button>
            //need second .map with categories that are searchable in PullDown per model, and to deal with NA, etc. above
          }
        }
      }
      //if (error) return `Error!: ${error}`;

      //  <span style={{zIndex:"6",left:"98%",fontSize:"1.8em"}} onClick=(this.setState({openHousehold:0}))>X</span>
      return (
        <div>
        {ldg}
          <div>
            {house_header}
            {hr}
            {account_count}
            {hr}
            {house_title}
            {hr}
            {house_header2}
            {hr}
            {storybutton}
            {house}
            {hr}
            {hr}
            {apt}
          </div>
        </div>
      );
    }}
  </Query>
) */

export default class SamDataForm extends React.PureComponent {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.setWaiting = this.props.setWaiting;
       this.setUpdate = this.props.setUpdate;
       this.countData = this.props.countData;
       this.state = {
         firstload: 1,
         waiting: this.props.waiting,
         samcity_data: [],// SamCitizens.find({}),
         highlight_data: [],
         samprops: this.props.samprops,
         household_id: this.props.samprops.household_id,
         account: this.props.samprops.account,
         openHousehold: this.props.samprops.openHousehold,
         showapts: 0,
         geojsonsam : {"type":"FeatureCollection","features":"tbd"}
       };
   }


   async componentDidMount() {
     const retrn = await fetch('/json/'+this.props.samprops.geojson_title)
     const geojsonsam = await retrn.json()
     this.setState({geojsonsam})
   }

   static getDerivedStateFromProps(props, state) {
     //there is a .stop on a subscription that could help clear cache??https://docs.meteor.com/api/pubsub.html#Meteor-subscribe
     //props.error ? console.log(props.error) : null
     if(props.waiting!=state.waiting){
       return {waiting:props.waiting}
     }
     if(props.update!=state.update){
       return {update:props.update}
     }
     // if(props.samprops != state.samprops){
     //   return {samprops:props.samprops}
     // }

     if(state.firstload){
       console.log('first load')
       const pipeline = {}
       pipeline['query'] = {one_of:{$gte : 1000}}
       var fields = {one_of:1,coords:1};
       props.samprops.toShow.forEach(function(cat){
         fields[cat.category] = 1;
       });
       props.samprops.toShowScale.forEach(function(cat){
         fields[cat.category] = 1;
       });
       pipeline['fields']=fields;
       Meteor.subscribe('samcity',pipeline,{
         onReady: function() {
           props.setWaiting(0)
         },
         onError: function(error) {
           console.log("error on dataload: "+error)
         }
       });
       return {firstload:0}
     };

     if(props.update==1){
       console.log('update SamDataForm')
       var pipe = {};
        //props.setUpdate(0) //should try to reimplement this logic - not clear if need to threads for update logic
        var qdb = {
         coords: {
           $geoWithin: {
             $box: [props.samprops.bbox_ur,props.samprops.bbox_bl] //needs [[bottom-left],[upper-right]]
           }
         },
         one_of:{$gte : props.samprops.one_of}
       };
       var query = {};
       var fields = {one_of:1,coords:1};
       props.samprops.toShow.forEach(function(cat){
         fields[cat.category] = 1;
         if(cat.fnd){
           query[cat.category] = cat.fnd;
         }
       });

       props.samprops.toShowScale.forEach(function(cat){
         fields[cat.category] = 1;
         if(cat.fnd){
           query[cat.category] = {$gte : parseFloat(cat.low),$lte : parseFloat(cat.high) };
         }
         //console.log('query in top update: '+JSON.stringify(query))
       });
       //if(state.samprops){
       var long_change = (state.samprops.bbox_bl[0] - props.samprops.bbox_bl[0]) != 0 ?
          (state.samprops.bbox_bl[0] - props.samprops.bbox_bl[0])/(state.samprops.bbox_bl[0]-state.samprops.bbox_ur[0]) : 0;
          //console.log(long_change)
       var lat_change = (state.samprops.bbox_bl[1] - props.samprops.bbox_bl[1]) != 0 ?
         (state.samprops.bbox_bl[1] - props.samprops.bbox_bl[1])/(state.samprops.bbox_bl[1]-state.samprops.bbox_ur[1]) : 0;
         //console.log(lat_change)
         //console.log(props.samprops.one_of)
       if(props.samprops.one_of != state.samprops.one_of || props.samprops.one_of < 1000){
         if(long_change > .08 || lat_change > .08 || props.samprops.explainIndex != state.samprops.explainIndex ){
         console.log('update subscribe')
         pipe['query'] = qdb;
         pipe['fields'] = fields;
         pipe['update'] = 1
         props.setWaiting(1);
           Meteor.subscribe('samcity',pipe,{
             onReady: function() {
               props.setWaiting(0);
               props.setUpdate(0);
             },
             onError: function(error) {
               console.log("error on dataload: "+error)
             }
           })}else{
             props.setWaiting(0);
             props.setUpdate(0);
           };
         };
         // console.log('query: '+JSON.stringify(query))
         // console.log('fields: '+JSON.stringify(fields))
      //

       return {samprops:props.samprops,
               samcity_data: SamCitizens.find(query,{fields:fields})} //, highlight_data: SamCitizens.find({race:'white'})}
   }else{
     console.log('null for else in update SamDataForm')
     return null
   }
  }

  render(){

      let patience = <div></div>
      if (this.state.waiting==1){ patience =
          <div style={{position:"absolute",zIndex:'10',width:"100%",height:"100%",backgroundColor:"#7f7f7f33"}}>
          <div style={{marginTop:"30%", marginLeft:"3%", color:"green", fontSize:"2em",textAlign:"center"}}>
          <div>Loading Data ... </div><div>thank you for your patience</div></div></div>
        }
    return (
      <div>
      {patience}
        <div style={{position:"absolute",width:"100%",height:"100%"}}>
          {this.props.samprops.openHousehold && (
            <div style={{position:"absolute",zIndex:"5",top:"15%",left:"20%",width:"50%",fontSize:"1.2em",overflow:"scroll",backgroundColor:"#f8f8ff"}}>
            <button style={{position:"absolute",cursor:"pointer",zIndex:"2",left:"85%",top:"4px",fontSize:".8em",backgroundColor:"#f8f8ff",borderRadius:"25px"}}
                onClick={ () => this.props.setOpenHousehold(0) }>
                close
            </button>
            <button style={{position:"absolute",cursor:"pointer",zIndex:"2",left:"5%",top:"4px",fontSize:".8em",backgroundColor:"#f8f8ff",borderRadius:"25px"}}
                onClick={ () => this.setState({showapts: !this.state.showapts})}>
                neighbors
            </button>
              <GetHousehold account={this.state.account} household_id={this.state.household_id} showapts={this.state.showapts}/></div>
            )}
        </div>

        <div>
          <MapBox
            onMapChange={this.props.onMapChange}
            setToolInfo={this.props.setToolInfo}
            handlePopulationChange={this.props.handlePopulationChange}
            setClick={this.props.setClick}
            setHighlight={this.props.setHighlight}
            setText={this.props.setText}
            setWaiting={this.props.setWaiting}
            setUpdate={this.props.setUpdate}
            countData={this.props.countData}
            waiting={this.props.waiting}
            update={this.props.update}
            data={this.state.samcity_data}
            highlight_data={this.state.highlight_data}
            returnColors = {this.returnColors}
            geojsonsam={this.state.geojsonsam}
            mapprops={this.props.mapprops}
            samprops={this.props.samprops}
            />
          </div>

        </div>
  )
};
};
  // export default withTracker((props) => {
  //   var pipeline = {};
  //   props.samprops.toShow.forEach(function(cat){
  //     if(cat.fnd){
  //       pipeline[cat.category] = cat.fnd;
  //     }
  //     if(cat.fnd_top_num){
  //       pipeline[cat.category] = {$gte : cat.fnd_bottom_num,$lte : cat.fnd_top_num};
  //     }
  //   })
  //   return {samcity_data: SamCitizens.find(pipeline).fetch()}
  // })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
