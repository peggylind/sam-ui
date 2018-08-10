import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
//import Sam20k from '../api/sam_citizens/sam_20k';

const samQuery = gql`
  query SamCitizens(
    $limit: Int,
    $member: String,
    $race: String,
    $dist: Float,
    $coords: [Float]
  ) {
    samcity2(
      limit: $limit,
      member: $member,
      race: $race,
      dist: $dist,
      coords: $coords
    ) {
      _id
      member
      race
      age
      total_income
      coords
    }
  }
`;

class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       //console.log('inSamDataForm '+JSON.stringify(this.props))
       this.state = {
        }
   }
    render(){

    return (
      <div>
        <MapBox
          onMapChange={this.props.onMapChange}
          setToolInfo={this.props.setToolInfo}
          data={this.props.samcity}
          mapprops={this.props.mapprops}
          />
      </div>
    );
  }
}

export default graphql(samQuery,
  {
    options: props => ({
      variables: {
        toShow: props.samprops.toShow, //object with array for factors and colors
        limit:  props.samprops.limit,
        member: props.samprops.member,
        race: props.samprops.race,
        dist: props.samprops.dist,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.29,29.7]
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
