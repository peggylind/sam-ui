import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import MapBox from "./map-box-app";
import D3Scatter from "./d3-scatter";
//import asyncComponent from "./asyncComponent";
//import Sam20k from '../api/sam_citizens/sam_20k';

const samQuery = gql`
  query SamCitizens(
    $limit: Int,
    $one_of: Int,
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
    $racial_entropy_index: Float,
    $coords: [Float]
  ) {
    samcity(
      limit: $limit,
      one_of: $one_of,
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
      age: $age,
      veteran_status: $veteran_status,
      racial_entropy_index: $racial_entropy_index,
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

class SamDataForm extends React.PureComponent {
   constructor(props) { //this doesn't behave as I expect, and doesn't seem to matter
       super(props);
       this.plotcontain = React.createRef();
       this.state = {
         plotOpen : false,  //plot stuff is just turned off at the button with a !
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
     console.log('samdataform did update')
     if(prevState.plotOpen && !prevState.plotOpen2){ //trying to get window to open first - might be able to keep it from reloading
       this.setState({plotOpen2:true})
     };
     if(!prevState.plotOpen && prevState.plotOpen2){
       this.setState({plotOpen2:false})
     };
     //this was not setting in time for the plot
     if (prevState.containerwidth != this.plotcontain.current.offsetWidth ||
         prevState.containerheight != this.plotcontain.current.offsetHeight ){
             this.setState({containerwidth:this.plotcontain.current.offsetWidth,
             containerheight:this.plotcontain.current.offsetHeight});
     };
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
        <div>
          <MapBox
            onMapChange={this.props.onMapChange}
            setToolInfo={this.props.setToolInfo}
            handlePopulationChange={this.props.handlePopulationChange}
            setClick={this.props.setClick}
            setWaiting={this.props.setWaiting}
            data={this.props.samcity}
            //data={this.props.samprops.zoom <10 ? this.state.jsonsam : this.props.samcity}
            geojsonsam={this.state.geojsonsam}
            mapprops={this.props.mapprops}
            samprops={this.props.samprops}
            />
          </div>
          <div>
      {!this.state.plotOpen && (
      <div style={plotButtonStyle}>
              <button onClick={() => this.setState({ plotOpen: true, plotHeight: '75%', plotWidth: '75%' })}>
                Show Plots
              </button>
      </div>)}
      {this.state.plotOpen && (
        <div style={plotButtonStyle}>
                <button onClick={() => this.setState({ plotOpen: false, plotHeight: '4%', plotWidth: '8%' })}>
                  Hide Plots
                </button>
        </div>
      )}
      <div style={plotStyle} ref={this.plotcontain}>
      {this.state.plotOpen && (
          <div id="plotcontainer">
          <D3Scatter
              setToolInfo={this.props.setToolInfo}
              handlePopulationChange={this.props.handlePopulationChange}
              setClick={this.props.setClick}
              setWaiting={this.props.setWaiting}
              data={this.props.samcity}
              plotFactorColors={this.props.samprops.plotFactorColors}
              containerwidth={1200}
              containerheight={600}
          /></div>
        )}
        </div>
        </div>
    </div>
  )
};
};

//can't seem to create this variable list dynamically
export default graphql(samQuery,
  {
    options: props => ({
      variables: {
        member: props.samprops.member,
        race: props.samprops.race,
        age: props.samprops.age,
        educational_attainment: props.samprops.educational_attainment,
        employment: props.samprops.employment,
        stresslevelincome: props.samprops.stresslevelincome,
        dist: props.samprops.dist,
        limit:  props.samprops.limit,
        bottom_range: props.samprops.bottom_range,
        top_range: props.samprops.top_range,
        one_of: props.samprops.one_of,
        coords: [props.samprops.longitude,props.samprops.latitude] || [-95.35,29.75]
      }
    }),
    props: ({ data }) => ({ ...data })
  })(SamDataForm)

//export default graphql(sam20kQuery, queryOptsWrap())(SamDataForm);
