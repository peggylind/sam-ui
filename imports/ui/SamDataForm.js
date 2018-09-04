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
    $educational_attainment: String,
    $asthma: String,
    $race: String,
    $dist: Float,
    $coords: [Float]
  ) {
    samcity(
      limit: $limit,
      one_of: $one_of,
      member: $member,
      educational_attainment: $educational_attainment,
      asthma: $asthma,
      race: $race,
      dist: $dist,
      coords: $coords
    ) {
      _id
      member
      race
      age
      one_of
      educational_attainment
      asthma
      coords
    }
  }
`;

class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.state = {
         jsonsam : ['age':'','race':'']
       }
   }
   async componentDidMount() {
     const res = await fetch('/json/sam_of_100.json')
     const jsonsam = await res.json()
     this.setState({jsonsam})
   }
   // componentWillUnmount(){
   //   client.resetStore();
   // }
    render(){

    return (
      <div>
        <MapBox
          onMapChange={this.props.onMapChange}
          setToolInfo={this.props.setToolInfo}
          setClick={this.props.setClick}
          data={this.props.samprops.zoom <14 ? this.state.jsonsam : this.props.samcity}
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
