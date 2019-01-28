
import {model_explanations} from "./model_explanations";
import React, {Component} from "react";


export default class ModelDivs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      samprops : this.props.samprops,
      explainIndex: this.props.samprops.explainIndex,
      steps: model_explanations(this.props.samprops.explainIndex).steps,
      step_index : 0,
      animate: 'six',
      modeltext : '',
      toolTipInfo : this.props.toolTipInfo,
      isModelOpen: false
    }
  };
  static getDerivedStateFromProps(props, state) {
    //console.log('hovercoords: '+state.textdata[0].coords + ' : '+ props.samprops.textposition)
    //if(state){
      if(state.step_index != props.samprops.step_index){
        let step_index = props.samprops.step_index
        let modeltext = state.modeltext
        if(props.samprops.step_index>state.steps.length-1){
          step_index = 0
        }
        return {step_index:step_index}
      }
    //}
    if(props.modeltext=='end'){
      return {modeltext:''}
    }
    if (state.explainIndex != props.samprops.explainIndex){
      //have to load in and do a push??
      //console.log('prevState.textdata[0].text: '+state.textdata[0].text + ' : '+ props.samprops.textname)
      return {
        explainIndex:props.samprops.explainIndex,
        step_index:0
        }
    }else{
      if(props.toolTipInfo.info != state.toolTipInfo.info){
        console.log('toolTipInfo '+state.toolTipInfo.info)
        return {toolTipInfo:props.toolTipInfo}
      }else{
      return null
    }}
  }
  componentDidUpdate(newProps, prevState) {
    var toolTipInfo = {...this.state.toolTipInfo}

    if (prevState.toolTipInfo != newProps.toolTipInfo){
      if(newProps.toolTipInfo.info){
        toolTipInfo.info = newProps.toolTipInfo.info;
        toolTipInfo.text = newProps.toolTipInfo.text;
      //toolTipInfo.info = this.props.samprops.categIndex;
        this.setState({toolTipInfo:newProps.toolTipInfo});}
    };
  };
  formatDollars = function(number){
    if (number!=undefined){
        var numstring = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return '$'+numstring+'/year'
    }else{
      return null
    }
  };

  render() {
    return (
      <div>
      <div style={{position:"absolute",zIndex:"5",
                  textAlign:"center",width:"100%",top:"15%"}}>

      {this.state.modeltext ?
        <div style={{position:"absolute",backgroundColor:"#7f7f7f66",left:"30%",width:"40%",borderRadius:"12px",fontWeight:"bold"}}>
        <div>{this.state.modeltext}</div>
        {this.state.steps[this.state.step_index].condition ?
          <span>Demo conditional show within/can't do function calls because they are run when initiating</span>
        :
        null
        }
        <button key="step_button"
          onClick={(e) => this.props.changeSamProps({step_index:this.state.step_index+1,categIndex:this.state.samprops.categIndex,
                  categories:this.state.steps[this.state.step_index].category})}
          style={{backgroundColor:'#08ff40',borderRadius:'25px',
            borderColor:'#08ff40',position:'relative',width:'100%',
            borderWidth: "3px", borderStyle:"solid"}}>{this.state.steps[this.state.step_index].button_text}
        </button>
        </div>
        :
        null}

      </div>

<div style={{position:"absolute",width:model_explanations(this.state.explainIndex).div_width,
              left:model_explanations(this.state.explainIndex).div_left,
              backgroundColor:"#f8f8ff",zIndex:"3"}}>
<div><br/><hr/></div>
  <span style={{position:"absolute",zIndex:"3",textAlign:"center",width:"100%",top:"0%"}}>

    <button title="Toggle Model Explanations"
          style={{position:"absolute",cursor:"pointer",zIndex:"2",left:"90%",top:"4%",fontSize:".8em"}}
          onClick={ () => this.setState({ isModelOpen: !this.state.isModelOpen }) }>
      {this.state.isModelOpen ? '^' : 'v'}
    </button>

    <div style={{position:"absolute",top:"0px",textAlign:"center",width:"100%",zIndex:"4"}}>
      {this.state.toolTipInfo.text}
    </div>
    {this.state.toolTipInfo.info ?
      <div style={{position:"relative",backgroundColor:"#f8f8ff",width:"90%",left:"5%",borderRadius:"15px",borderStyle:"solid",borderWidth:".2em"}}>
        {this.state.toolTipInfo.info.age != "NA" & this.state.toolTipInfo.info.age != ""   &&
          <div> Age -  {this.state.toolTipInfo.info.age} </div>}
        {this.state.toolTipInfo.info.household_id != "NA" & this.state.toolTipInfo.info.household_id != ""   &&
          <div> household_id -  {this.state.toolTipInfo.info.household_id} </div>}
        {this.state.toolTipInfo.info.citizenship != "NA" & this.state.toolTipInfo.info.citizenship != "" &&
          <div> Citizen -  {this.state.toolTipInfo.info.citizenship} </div>}
        {this.state.toolTipInfo.info.educational_attainment != "NA" & this.state.toolTipInfo.info.educational_attainment != "" &&
          <div> Education -  {this.state.toolTipInfo.info.educational_attainment} </div>}
        {this.state.toolTipInfo.info.employment != "NA" & this.state.toolTipInfo.info.employment != "" &&
          <div> Employment -  {this.state.toolTipInfo.info.employment} </div>}
        {this.state.toolTipInfo.info.sex != "NA" & this.state.toolTipInfo.info.sex != "" &&
          <div> Sex -  {this.state.toolTipInfo.info.sex} </div>}
        {this.state.toolTipInfo.info.race != "NA" & this.state.toolTipInfo.info.race != "" &&
          <div> Race -  {this.state.toolTipInfo.info.race} </div>}
        {this.state.toolTipInfo.info.household_income != "NA" & this.state.toolTipInfo.info.household_income != "" &&
          <div> Household Income -  {this.formatDollars(this.state.toolTipInfo.info.household_income)} </div>}
        {this.state.toolTipInfo.info.household_type != "NA" & this.state.toolTipInfo.info.household_type != "" &&
          <div> Household Type -  {this.state.toolTipInfo.info.household_type} </div>}
        {this.state.toolTipInfo.info.quality_description != "NA" & this.state.toolTipInfo.info.quality_description != "" &&
          <div> HCAD Quality Rating -  {this.state.toolTipInfo.info.quality_description} </div>}
        </div>
        : null
      }
  </span>

{(this.state.isModelOpen &&
  <span style={{position:"relative",backgroundColor:"#f8f8ff",zIndex:"3",borderRadius:"25px"}}>
  <div><br/><hr/></div>
    <h2 style={{textAlign:"center"}}>{model_explanations(this.state.explainIndex).h2_title}</h2>

    <div style={{textAlign:"center",fontWeight: "bold"}}>{model_explanations(this.state.explainIndex).author}</div>
<hr/>
    {this.state.modeltext ?
      <button key="end_tour_button"
        onClick={(e) => {this.setState({modeltext:''});this.props.changeSamProps({step_index:0,categIndex:0})}}
        style={{backgroundColor:'#08ff40',borderRadius:'25px',cursor:"pointer",
          borderColor:'#ff3300',position:'relative',width:'100%',
          borderWidth: "3px", borderStyle:"solid"}}>end tour
      </button>
    :
      <button key="tour_button"
        onClick={(e) => this.setState({modeltext:this.state.steps[this.state.step_index].steptext})}
        style={{backgroundColor:'#08ff40',borderRadius:'25px',cursor:"pointer",
          borderColor:'#08ff40',position:'relative',width:'100%',
          borderWidth: "3px", borderStyle:"solid"}}>{this.state.steps[this.state.step_index].side_button_text}
      </button>}
<br/>

    <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).text}</div>
<hr/><br/>
    <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.explainIndex).img} />
    <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.explainIndex).img1} />
    <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.explainIndex).img2} />
    <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.explainIndex).img3} />
    <img style={{width:"70%",marginLeft:"15%"}} src={model_explanations(this.state.explainIndex).img4} />
    <p style={{textAlign:"center",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).img_title}</p>
    <h3>{model_explanations(this.state.explainIndex).div2}</h3>
    <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).text2}</div>
    <h3>{model_explanations(this.state.explainIndex).div3}</h3>
    <div style={{textAlign:"center",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).text3}</div>
<hr/>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations}</div>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations1}</div>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations2}</div>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations3}</div>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations4}</div>
    <div style={{textAlign:"left",position:"relative",left:'5%',width:'90%'}}>{model_explanations(this.state.explainIndex).citations5}</div>
<hr/>
  </span>
 )}
</div>
</div>

)
}}
