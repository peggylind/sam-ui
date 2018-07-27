import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
//import Sam20k from '../api/sam_citizens/sam_20k';

const sam20kQuery = gql`
  query Sam20k($limit: Int, $member: String) {
    samcity20k(limit: $limit, member: $member) {
      _id
      member
      race
      total_income
      coords
    }
  }
`;
// const limit = 5555;
// const member = "Child";

// const queryOptsWrap = (limit1=44,member1="ugh") => {
//   return {
//     options: props => ({
//       variables: {
//         limit: limit1 || "450",
//         member: member1 || "Adult"
//       }
//     }),
//     props: ({ data }) => ({ ...data })
//   };
// }

//console.log(JSON.stringify(this.state.Qopts))



const submitForm = () => {
    // this.limit = 6666;
    // this.setState({Qopts:queryOptsWrap({limit1:"22222",member1:"ughable"})});
    // console.log(queryOptsWrap({limit1:"22222",member1:"ughable"}))
    // this.forceUpdate();
    // this.props.variables.limit = this.state.limit.value;
    // this.props.variables.member = this.state.limit.member;
    //this.setProps({variables:{limit:"555"}});
    //console.log('tag'+JSON.stringify('this.input'))
    // this.props
    //   .sam20kQuery({
    //     variables: {
    //       limit: this.state.limit.value,
    //       member: this.state.member.value
    //     }
    //   })
    //   .then(() => {
    //     this.state.limit.value = "";
    //     this.state.member.value = "";
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
};
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('sam is loading'+JSON.stringify(nextProps))
  // }
  // Limit<input type="text" ref={input => (this.limit = input )} />
  // Family Member Type<input type="text" ref={input => (this.member = input )} />
  // <button onClick={this.submitForm}>Submit</button>
  // <div>{this.props.limit}</div>
  //<MapBox data={samcity20k} zoom={10}/>
//const SamDataForm = ({ loading, error, samcity20k, props }) => {
class SamDataForm extends Component {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.state = {
         passedProps : props
       }
  //     this.props = {
  //       samcity20k : {loading:true},
  //     }
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

//this.props only starts mattering here
    // if (error) {console.log("error in SamDataForm graphql: "+error)};
    // if (loading) return null;
    // {this.props.samcity20k.loading && <div style={{position:"absolute",zIndex:"400",
    //     marginTop:"0%", marginLeft:"30%", color:"blue", fontSize:"2em"}}>
    //     Loading Data ... please wait</div>}
    return (
      <div>
        <div>WTF</div>
        <MapBox data={this.props.samcity20k} zoom={10}/>

      </div>
    );
  }
}

export default graphql(sam20kQuery,
  {
    options: props => ({
      variables: {
        limit:  props.samprops.limit || "450", //have this come from state...
        member: props.samprops.member || "Adult"
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
