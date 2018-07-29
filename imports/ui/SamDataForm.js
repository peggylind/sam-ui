import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
//import Sam20k from '../api/sam_citizens/sam_20k';

const sam20kQuery = gql`
  query Sam20k(
    $limit: Int,
    $member: String,
    $coords: [Float]
  ) {
    samcity20k(
      limit: $limit,
      member: $member,
      coords: $coords
    ) {
      _id
      member
      race
      total_income
      coords
    }
  }
`;

class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       console.log('inSamDataForm '+JSON.stringify(this.props))
       this.state = {
         passedProps : props
       }
   }
   //https://reactjs.org/docs/react-component.html#componentdidupdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.samprops.limit !== prevProps.samprops.limit) {
      //console.log('should I call somethign?')
      //this.refetchQueries();
    }
    //console.log(this.state.passedProps)
    // this.setState(
    //   {loading: true}
    // )
  }
    render(){

    return (
      <div>
        <MapBox
          onMapChange={this.props.onMapChange}
          data={this.props.samcity20k}
          mapprops={this.props.mapprops}
          />
      </div>
    );
  }
}

export default graphql(sam20kQuery,
  {
    options: props => ({
      variables: {
        limit:  props.samprops.limit || "450", //have this come from state...
        member: props.samprops.member || "Adult",
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.29,29.7]
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
