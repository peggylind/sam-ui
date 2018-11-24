
import {model_explanations} from "./model_explanations";
import React, {Component} from "react";


export default class ModelDivs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      samprops : this.props.samprops,
      explainIndex: this.props.samprops.explainIndex,
      toolTipInfo : this.props.toolTipInfo,
      isModelOpen: true
    }
  };
  static getDerivedStateFromProps(props, state) {
    //console.log('hovercoords: '+state.textdata[0].coords + ' : '+ props.samprops.textposition)
    if (state.explainIndex != props.samprops.explainIndex){
      //have to load in and do a push??
      //console.log('prevState.textdata[0].text: '+state.textdata[0].text + ' : '+ props.samprops.textname)
      return {
        explainIndex:props.samprops.explainIndex
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
//should calculate div-left on fly!
<div style={{position:"absolute",width:model_explanations(this.state.explainIndex).div_width,
              left:model_explanations(this.state.explainIndex).div_left,
              overflow: "scroll",backgroundColor:"#f8f8ff",zIndex:"3"}}>
<div><br/><hr/></div>
  <span style={{position:"absolute",zIndex:"3",textAlign:"center",width:"100%",top:"0%"}}>

    <button title="Toggle Model Explanations"
          style={{position:"absolute",cursor:"pointer",zIndex:"2",left:"90%",top:"4%",fontSize:".8em",transform:"rotate(90deg)"}}
          onClick={ () => this.setState({ isModelOpen: !this.state.isModelOpen }) }>
      {this.state.isModelOpen ? '<' : '>'}
    </button>

    <div style={{position:"absolute",top:"0px",textAlign:"center",width:"100%"}}> {this.state.toolTipInfo.text} </div>
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
  <span style={{position:"relative",backgroundColor:"#f8f8ff",zIndex:"4",borderRadius:"25px"}}>
  <div><br/><hr/></div>
    <h2 style={{textAlign:"center"}}>{model_explanations(this.state.explainIndex).h2_title}</h2>
    {model_explanations(this.state.explainIndex).button}

    <div style={{textAlign:"center",fontWeight: "bold"}}>{model_explanations(this.state.explainIndex).author}</div>
<hr/><br/>
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

)
}}
