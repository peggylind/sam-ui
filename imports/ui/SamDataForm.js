import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import MapBox from "./map-box-app";
import D3Scatter from "./d3-scatter";
//import asyncComponent from "./asyncComponent";

//adding $age to query makes it fail with unexpected EOF??????

const samQuery = gql`
  query SamCitizens(
    $age: Int,
    $asthma: String,
    $bottom_range: Int,
    $citizenship: String,
    $coords: [Float],
    $disability: String,
    $dist: Float,
    $educational_attainment: String,
    $employment: String,
    $household_id: ID,
    $household_income: Int,
    $household_type: String,
    $limit: Int,
    $member: String,
    $one_of: Int,
    $quality_description: String,
    $race: String,
    $racial_entropy_index: Float,
    $top_range: Int,
    $veteran_status: String
  ) {
    samcity(
      age: $age,
      asthma: $asthma,
      bottom_range: $bottom_range
      citizenship: $citizenship,
      coords: $coords,
      disability: $disability,
      dist: $dist,
      educational_attainment: $educational_attainment,
      employment: $employment,
      household_id: $household_id,
      household_income: $household_income,
      household_type: $household_type,
      limit: $limit,
      member: $member,
      one_of: $one_of,
      quality_description: $quality_description,
      race: $race,
      racial_entropy_index: $racial_entropy_index,
      top_range: $top_range,
      veteran_status: $veteran_status
    ) {
      age
      asthma
      citizenship
      coords
      disability
      educational_attainment
      employment
      household_id
      household_income
      household_type
      limit
      member
      one_of
      quality_description
      race
      racial_entropy_index
      veteran_status
    }
  }
`;

const GetHousehold = ({ household_id }) => (
  <Query
    query={samQuery}
    variables={{ household_id }}
    notifyOnNetworkStatusChange
  >
  {({ loading, error, data, refetch, networkStatus }) => {
      let house_header = <span></span>
      let house = <span></span>
      if (loading){house = <span>Loading</span>};
      if(data.samcity){
        if(data.samcity.length>0){
          house_header = <div>Household Income: ${data.samcity[0].household_income} and household_id:{data.samcity[0].household_id}</div>
          house = data.samcity.map((citizen, ind) => ( //should be able to get income, etc. off of ind == 0
            <div key={ind+`citizen.age`}>{citizen.member} age: {citizen.age} employment: {citizen.employment}</div>
        ))
      console.log('honestly'+JSON.stringify(data.samcity[0]))}}
      //if (error) return `Error!: ${error}`;

      return (
        <div>
          <div style={{position:"absolute",zIndex:"5",top:"5%",left:"10%",width:"90%",fontSize:"2em",backgroundColor:"#f8f8ff",}}>
          <div>{house_header}</div>
          {house}
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
       console.log('insamdata: '+this.props.samprops.household_id)
       this.state = {
         household_id: this.props.samprops.household_id,
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
     console.log(geojsonsam)

     this.setState({geojsonsam})
     // const res = await fetch('/json/sam_of_100.json') //only if loading json for faster process
     // const jsonsam = await res.json()
     //this.setState({jsonsam})
   }
   componentDidUpdate(newProps, prevState) {
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
     if(props.samprops.household_id != state.household_id){
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
