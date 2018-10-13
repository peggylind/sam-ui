import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
//import Sam20k from '../api/sam_citizens/sam_20k';

const samQuery = gql`
  query SamCitizens(
    $limit: Int,
    $one_of: Int,
    $fnd: [String],
    $member: String,
    $educational_attainment: String,
    $employment: String,
    $household_income: Int,
    $household_type: String,
    $quality_description: String,
    $asthma: String,
    $disability: String,
    $citizenship: String,
    $race: String,
    $veteran_status: String,
    $dist: Float,
    $coords: [Float]
  ) {
    samcity(
      limit: $limit,
      one_of: $one_of,
      fnd: $fnd,
      member: $member,
      educational_attainment: $educational_attainment,
      employment: $employment,
      disability: $disability,
      household_income: $household_income,
      household_type: $household_type,
      quality_description: $quality_description,
      asthma: $asthma,
      citizenship: $citizenship,
      race: $race,
      veteran_status: $veteran_status,
      dist: $dist,
      coords: $coords
    ) {
      _id
      member
      race
      age
      citizenship
      employment
      household_income
      household_type
      quality_description
      one_of
      educational_attainment
      veteran_status
      disability
      asthma
      coords
    }
  }
`;

// _id: String!
// individual_id: Int
// age: Int
// bracket_age: String
// asthma: String
// citizenship: String
// coords: [Float]
// date_erected: String
// disability: String
// educational_attainment: String
// employment: String
// english_speaking_skills: String
// health_insurance: String
// household_income: Int
// household_type: String
// limit: Int
// member: String
// nativity: String
// one_of: Int
// race: String
// sex: String
// size: Int
// veteran_status: String

class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.state = {
//         jsonsam : ['age':'','race':''], //load json data faster than mongodb
          geojsonsam : {"type":"FeatureCollection","features":"tbd"}
       }
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
   // componentWillUnmount(){
   //   client.resetStore();
   // }
   //data={this.props.samprops.zoom <14 ? this.state.jsonsam : this.props.samcity}
   //how can we get them both as part of the same data stream, and not reloading when you do search on new data characteristics?
    render(){

    return (
      <div>
        <MapBox
          onMapChange={this.props.onMapChange}
          setToolInfo={this.props.setToolInfo}
          handlePopulationChange={this.props.handlePopulationChange}
          setClick={this.props.setClick}
          data={this.props.samcity}
          //data={this.props.samprops.zoom <10 ? this.state.jsonsam : this.props.samcity}
          geojsonsam={this.state.geojsonsam}
          mapprops={this.props.mapprops}
          samprops={this.props.samprops}
          />
      </div>
    );
  }
}

export default graphql(samQuery,
  {
    options: props => ({
      variables: {
        limit:  props.samprops.limit,
        member: props.samprops.member,
        one_of: props.samprops.one_of,
        race: props.samprops.race,
        dist: props.samprops.dist,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.35,29.75]
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
