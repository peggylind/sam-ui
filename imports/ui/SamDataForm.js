import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import MapBox from "./map-box-app";
import D3Scatter from "./d3-scatter";
import samQuery from "./samquery.graphql.js";
import houseQuery from "./housequery.graphql.js";
//import asyncComponent from "./asyncComponent";

//adding $age to query makes it fail with unexpected EOF??????
//if thesee don't match type coming from mongo, it just dies without an error!

const formatDollars = function(number){
  if (number!=undefined){
      var numstring = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '$'+numstring+'/year'
  }else{
    return null
  }
};

//https://www.howtographql.com/ --lots more to use with new graphql 2.1 features.
//could have ldg shared between 2
//there's a setting in the apollo to share the data

//try optimistic UI, and a feed for the loading??
//https://blog.apollographql.com/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2
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
        //house = <span>Loading</span>
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
)

//for later, in debugging
// const ShowingSomeErrors = () => (
//   <Query query={samQuery} errorPolicy="all">
//     {({ error, data, loading }) => {
//       if (loading) return <span>loading...</span>
//       return (
//         <div>
//           <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
//             <span key={i}>{message}</span>
//           ))}
//           </pre>
//         </div>
//       )
//     }}
//   </Query>
// );


class SamDataForm extends React.PureComponent {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.setWaiting = this.props.setWaiting;
       this.countData = this.props.countData;
       this.state = {
         household_id: this.props.samprops.household_id,
         account: this.props.samprops.account,
         openHousehold: this.props.samprops.openHousehold,
         showapts: 0,
         // plotWidth: '8%',
         // plotHeight: '4%',
         // containerwidth: '8',
         // containerheight: '4',
         //highlight_data: [],
         geojsonsam : {"type":"FeatureCollection","features":"tbd"}
       };
   }

   async componentDidMount() {
     const retrn = await fetch('/json/'+this.props.samprops.geojson_title)
     const geojsonsam = await retrn.json()
     this.setState({geojsonsam})
     // const res = await fetch('/json/sam_of_100.json') //only if loading json for faster process
     // const jsonsam = await res.json()
     //this.setState({jsonsam})
   }
   componentDidUpdate(newProps, prevState) {
     // if(newProps.samcity){
     // console.log('component did update in SamDataForm'+JSON.stringify(newProps.samcity.length))}
     // console.log('prevState.household_id: '+prevState.household_id)
     // console.log(newProps.samprops.household_id)
     // if(prevState.plotOpen && !prevState.plotOpen2){ //trying to get window to open first - might be able to keep it from reloading
     //   this.setState({plotOpen2:true})
     // };
     // if(!prevState.plotOpen && prevState.plotOpen2){
     //   this.setState({plotOpen2:false})
     // };
     //this was not setting in time for the plot
     // if (prevState.containerwidth != this.plotcontain.current.offsetWidth ||
     //     prevState.containerheight != this.plotcontain.current.offsetHeight ){
     //         this.setState({containerwidth:this.plotcontain.current.offsetWidth,
     //         containerheight:this.plotcontain.current.offsetHeight});
     // };
   }
   static getDerivedStateFromProps(props, state) {
     props.error ? console.log(props.error) : null
     // if(props.samcity){
     // console.log('inside getDerivedStateFromProps in SamDataForm'+props.samcity.length)}
       if(props.samprops.openHousehold){
         return{
           openHousehold:props.samprops.openHousehold,
           household_id:props.samprops.household_id,
           account:props.samprops.account
         }
       }else{
         if(props.samprops != state.samprops){
           //console.log(props.samprops)
           return {samprops:props.samprops}
         }else{
           if(props.highlight_data != state.highlight_data){
             return {highlight_data:props.highlight_data}
           }
        }
        return null
      }
    }
   //data={this.props.samprops.zoom <14 ? this.state.jsonsam : this.props.samcity}
   //how can we get them both as part of the same data stream, and not reloading when you do search on new data characteristics?
    render(){

      // const plotStyle = {
      //   position: 'absolute',
      //   left: '20%',
      //   bottom: '0',
      //   zindex: '3',
      //   backgroundColor: 'white', //transparent
      //   overflow: 'scroll'
      // };
      // const plotButtonStyle = {
      //   position: 'absolute',
      //   left: '50%',
      //   zIndex: '10',
      //   backgroundColor: 'white',
      //   bottom: '0'
      // };
      let patience = <div></div>
      if (this.props.loading){ patience =
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
            countData={this.props.countData}
            waiting={this.props.waiting}
            data={this.props.samcity}
            highlight_data={this.props.highlight_data}
            returnColors = {this.returnColors}
            //data={this.props.samprops.zoom <10 ? this.state.jsonsam : this.props.samcity}
            geojsonsam={this.state.geojsonsam}
            mapprops={this.props.mapprops}
            samprops={this.props.samprops}
            />
          </div>

        </div>

      //  <div>


      // {this.state.plotOpen && (
      // <div style={plotButtonStyle}>
      //         <button onClick={() => this.setState({ plotOpen: true, plotHeight: '75%', plotWidth: '75%' })}>
      //           Show Plots
      //         </button>
      // </div>)}
      // {this.state.plotOpen && (
      //   <div style={plotButtonStyle}>
      //           <button onClick={() => this.setState({ plotOpen: false, plotHeight: '4%', plotWidth: '8%' })}>
      //             Hide Plots
      //           </button>
      //   </div>
      // )}
      // <div style={plotStyle} ref={this.plotcontain}>
      // {this.state.plotOpen && (
      //     <div id="plotcontainer">
      //     <D3Scatter
      //         setToolInfo={this.props.setToolInfo}
      //         handlePopulationChange={this.props.handlePopulationChange}
      //         setClick={this.props.setClick}
      //         setWaiting={this.props.setWaiting}
      //         data={this.props.samcity}
      //         plotFactorColors={this.props.samprops.plotFactorColors}
      //         containerwidth={1200}
      //         containerheight={600}
      //     /></div>
      //   )}
      //  </div>
    //  </div>
    //</div>
  )
};
};

//can't seem to create this variable list dynamically
export default graphql(samQuery,
  {
    options: props => ({
      variables: {
        account: props.samprops.account,
        age: props.samprops.age,
        asthma: props.samprops.asthma,
        autism_by_CRH: props.samprops.autism_by_CRH,
        autism_by_maternal_age: props.samprops.autism_by_maternal_age,
        bbox_bl: props.samprops.bbox_bl,
        bbox_ur: props.samprops.bbox_ur,
        bottom_range: props.samprops.bottom_range,
        bracket_age: props.samprops.bracket_age,
        citizenship: props.samprops.citizenship,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.35,29.75],
        date_erected: props.samprops.date_erected,
        disability: props.samprops.disability,
        dist: props.samprops.dist,
        education_entropy_index: props.samprops.education_entropy_index,
        educational_attainment: props.samprops.educational_attainment,
        employment: props.samprops.employment,
        english_speaking_skills: props.samprops.english_speaking_skills,
        health_insurance: props.samprops.health_insurance,
        household_id: props.samprops.household_id,
        household_income: props.samprops.household_income,
        household_type: props.samprops.household_type,
        individual_id: props.samprops.individual_id,
        language_at_home: props.samprops.language_at_home,
        limit:  props.samprops.limit,
        lowbirthweightbyrace: props.samprops.lowbirthweightbyrace,
        maternal_CRH: props.samprops.maternal_CRH,
        means_of_transportation_to_work: props.samprops.means_of_transportation_to_work,
        member: props.samprops.member,
        nativity: props.samprops.nativity,
        one_of: props.samprops.one_of,
        pregnant: props.samprops.pregnant,
        prenatal_first_tri: props.samprops.prenatal_first_tri,
        quality_description: props.samprops.quality_description,
        race: props.samprops.race,
        racial_entropy_index: props.samprops.racial_entropy_index,
        sex: props.samprops.sex,
        stresslevelincome: props.samprops.stresslevelincome,
        stresslevelrace: props.samprops.stresslevelrace,
        top_range: props.samprops.top_range,
        travel_time_to_work: props.samprops.travel_time_to_work,
        veteran_status: props.samprops.veteran_status,
        zip: props.samprops.zip,
        zip_education_entropy_index: props.samprops.zip_education_entropy_index,
        zip_racial_entropy_index: props.samprops.zip_racial_entropy_index
      }
    }),
    props: ({ loading, error, data }) => ({ loading, error, ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
