import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
//import Sam20k from '../api/sam_citizens/sam_20k';

const samQuery = gql`
  query SamCitizens(
    $limit: Int,
    $one_of: Int,
    $member: String,
    $race: String,
    $dist: Float,
    $coords: [Float]
  ) {
    samcity2(
      limit: $limit,
      one_of: $one_of,
      member: $member,
      race: $race,
      dist: $dist,
      coords: $coords
    ) {
      _id
      member
      race
      age
      coords
    }
  }
`;

class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
   }
    render(){

    return (
      <div>
        <MapBox
          onMapChange={this.props.onMapChange}
          setToolInfo={this.props.setToolInfo}
          data={this.props.samcity2}
          mapprops={this.props.mapprops}
          allcolors={this.props.samprops.allcolors}
          toShow={this.props.samprops.toShow[0]}
          forColors={this.props.samprops.forColors}
          />
      </div>
    );
  }
}

export default graphql(samQuery,
  {
    options: props => ({
      variables: {
      //  toShow: props.samprops.toShow, //object with array for factors and colors
        limit:  props.samprops.limit,
        member: props.samprops.member,
        one_of: props.samprops.one_of,
        race: props.samprops.race,
        dist: props.samprops.dist,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.29,29.7]
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
