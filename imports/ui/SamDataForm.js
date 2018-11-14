import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import MapBox from "./map-box-app";
import D3Scatter from "./d3-scatter";
//import asyncComponent from "./asyncComponent";

//adding $age to query makes it fail with unexpected EOF??????
//if thesee don't match type coming from mongo, it just dies without an error!
const samQuery = gql`
  query SamCitizens(
    $age: Int,
    $asthma: String,
    $autism_by_CRH: String,
    $autism_by_maternal_age: String,
    $bottom_range: Int,
    $citizenship: String,
    $coords: [Float],
    $disability: String,
    $dist: Float,
    $education_entropy_index: Float,
    $educational_attainment: String,
    $employment: String,
    $english_speaking_skills: String,
    $health_insurance: String,
    $household_id: ID,
    $household_income: Int,
    $household_type: String,
    $limit: Int,
    $loc_num: String,
    $loc_name: String,
    $lowbirthweightbyrace: String,
    $maternal_CRH: FloatwNA,
    $means_of_transportation_to_work: String,
    $member: String,
    $nativity: String,
    $one_of: Int,
    $pregnant: String,
    $prenatal_first_tri: String,
    $quality_description: String,
    $race: String,
    $racial_entropy_index: Float,
    $stresslevelincome: FloatwNA,
    $stresslevelrace: FloatwNA,
    $travel_time_to_work: FloatwNA,
    $top_range: Int,
    $veteran_status: String,
    $zip: String,
    $zip_education_entropy_index: Float,
    $zip_racial_entropy_index: Float
  ) {
    samcity(
      age: $age,
      asthma: $asthma,
      autism_by_CRH: $autism_by_CRH,
      autism_by_maternal_age: $autism_by_maternal_age,
      bottom_range: $bottom_range
      citizenship: $citizenship,
      coords: $coords,
      disability: $disability,
      dist: $dist,
      education_entropy_index: $education_entropy_index,
      educational_attainment: $educational_attainment,
      employment: $employment,
      english_speaking_skills: $english_speaking_skills,
      health_insurance: $health_insurance,
      household_id: $household_id,
      household_income: $household_income,
      household_type: $household_type,
      limit: $limit,
      loc_num: $loc_num,
      loc_name: $loc_name,
      lowbirthweightbyrace: $lowbirthweightbyrace,
      maternal_CRH: $maternal_CRH,
      means_of_transportation_to_work: $means_of_transportation_to_work,
      member: $member,
      nativity: $nativity,
      one_of: $one_of,
      pregnant: $pregnant,
      prenatal_first_tri: $prenatal_first_tri,
      quality_description: $quality_description,
      race: $race,
      racial_entropy_index: $racial_entropy_index,
      stresslevelincome: $stresslevelincome,
      stresslevelrace: $stresslevelrace,
      top_range: $top_range,
      travel_time_to_work: $travel_time_to_work,
      veteran_status: $veteran_status,
      zip: $zip,
      zip_education_entropy_index: $zip_education_entropy_index,
      zip_racial_entropy_index: $zip_racial_entropy_index
    ) {
      age
      asthma
      autism_by_CRH
      autism_by_maternal_age
      citizenship
      coords
      disability
      education_entropy_index
      educational_attainment
      employment
      english_speaking_skills
      health_insurance
      household_id
      household_income
      household_type
      limit
      loc_num
      loc_name
      lowbirthweightbyrace
      maternal_CRH
      means_of_transportation_to_work
      member
      nativity
      one_of
      pregnant
      prenatal_first_tri
      quality_description
      race
      racial_entropy_index
      stresslevelincome
      stresslevelrace
      travel_time_to_work
      veteran_status
      zip
      zip_education_entropy_index
      zip_racial_entropy_index
    }
  }
`;

//https://www.howtographql.com/ --lots more to use with new graphql 2.1 features.
const GetHousehold = ({ household_id }) => (
  <Query
    query={samQuery}
    variables={{ household_id }}
    notifyOnNetworkStatusChange
  >
  {({ loading, error, data, refetch, networkStatus }) => {
      let house_header = <span></span>
      let house_header2 = <span></span>
      let house_title = <span></span>
      let house = <span></span>
      let hr = <span></span>
      let ldg = <span></span>  //copying patience from App.js
      if (loading){
        ldg =
              <div style={{position:"absolute",zIndex:'10',width:"100%",height:"100%",backgroundColor:"#7f7f7f33"}}>
              <div style={{marginTop:"30%", marginLeft:"3%", color:"green", fontSize:"2em",textAlign:"center"}}>
              <div>Loading Data ... </div><div>thank you for your patience</div></div></div>
        //house = <span>Loading</span>
      }else{
        ldg = <span></span>
        console.log('how to call setWaiting???')
      };
      if(data.samcity){
        if(data.samcity.length>0){
          let loc_name = data.samcity[0].loc_name.charAt(0).toUpperCase() + data.samcity[0].loc_name.slice(1).toLowerCase()
          hr = <hr></hr>
          house_header = <div style={{fontSize:"1.8em",textAlign:"center"}}>Household Characteristics</div>
          house_header2 = <div>Household Income: ${data.samcity[0].household_income}, HCAD quality of housing: {data.samcity[0].quality_description}</div>
          house_title = <div>This is not real data, but represents a plausible household for: <br></br> {data.samcity[0].loc_num} {loc_name}, TX {data.samcity[0].zip} based on census data.</div>
          house = data.samcity.map((citizen, ind) => (
            <div key={ind+"cit"}><div>This {citizen.member.toLowerCase()} is {citizen.age} years old, {citizen.employment.toLowerCase()} a {citizen.nativity.toLowerCase()} {citizen.citizenship.toLowerCase()} of the U.S., with {citizen.educational_attainment.toLowerCase()}</div>
            <div></div></div>//need second .map with categories that are searchable in PullDown per model, and to deal with NA, etc. above
        ))
      }}
      //if (error) return `Error!: ${error}`;

      //  <span style={{zIndex:"6",left:"98%",fontSize:"1.8em"}} onClick=(this.setState({openHousehold:0}))>X</span>
      return (
        <div>
        {ldg}
          <div style={{position:"absolute",zIndex:"5",top:"15%",left:"20%",width:"50%",fontSize:"1.2em",backgroundColor:"#f8f8ff"}}>
            {house_header}
            {hr}
            {house_title}
            {hr}
            {house_header2}
            {hr}
            {house}
            {hr}
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
       //this.plotcontain = React.createRef();
       this.setWaiting = this.props.setWaiting;
       this.state = {
         household_id: this.props.samprops.household_id,
         openHousehold: 1, //this.props.samprops.openHousehold,
         setWaiting: this.props.setWaiting,
         plotOpen : false,  //plot stuff is just turned off at the button with a ! inline
         plotOpen2 : false,
         plotWidth: '8%',
         plotHeight: '4%',
         containerwidth: '8',
         containerheight: '4',
         geojsonsam : {"type":"FeatureCollection","features":"tbd"}
       };
   }

   async componentDidMount() {
     const retrn = await fetch('/json/'+this.props.samprops.geojson_title)
     const geojsonsam = await retrn.json()
     //console.log(geojsonsam)

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
     if(prevState.plotOpen && !prevState.plotOpen2){ //trying to get window to open first - might be able to keep it from reloading
       this.setState({plotOpen2:true})
     };
     if(!prevState.plotOpen && prevState.plotOpen2){
       this.setState({plotOpen2:false})
     };
     //this was not setting in time for the plot
     // if (prevState.containerwidth != this.plotcontain.current.offsetWidth ||
     //     prevState.containerheight != this.plotcontain.current.offsetHeight ){
     //         this.setState({containerwidth:this.plotcontain.current.offsetWidth,
     //         containerheight:this.plotcontain.current.offsetHeight});
     // };
   }
   static getDerivedStateFromProps(props, state) {
     // if(props.samcity){
     // console.log('inside getDerivedStateFromProps in SamDataForm'+props.samcity.length)}
     if(props.samprops.household_id != state.household_id){
       //props.setWaiting(1)
       return{
         household_id:props.samprops.household_id
       }
     }else{
       return null
     }
   }
   //data={this.props.samprops.zoom <14 ? this.state.jsonsam : this.props.samcity}
   //how can we get them both as part of the same data stream, and not reloading when you do search on new data characteristics?
    render(){

      const plotStyle = {
        position: 'absolute',
        left: '20%',
        bottom: '0',
        zindex: '3',
        backgroundColor: 'white', //transparent
        overflow: 'scroll'
      };
      const plotButtonStyle = {
        position: 'absolute',
        left: '50%',
        zIndex: '10',
        backgroundColor: 'white',
        bottom: '0'
      };

    return (
      <div>
      {this.state.household_id && (
          <GetHousehold household_id={this.state.household_id} />
        )}
        <div>
          <MapBox
            onMapChange={this.props.onMapChange}
            setToolInfo={this.props.setToolInfo}
            handlePopulationChange={this.props.handlePopulationChange}
            setClick={this.props.setClick}
            setWaiting={this.props.setWaiting}
            data={this.props.samcity}
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
        age: props.samprops.age,
        bottom_range: props.samprops.bottom_range,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.35,29.75],
        dist: props.samprops.dist,
        educational_attainment: props.samprops.educational_attainment,
        employment: props.samprops.employment,
        limit:  props.samprops.limit,
        member: props.samprops.member,
        one_of: props.samprops.one_of,
        race: props.samprops.race,
        stresslevelincome: props.samprops.stresslevelincome,
        top_range: props.samprops.top_range
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
