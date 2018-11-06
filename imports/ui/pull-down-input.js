import React, {Component} from 'react';
import {model_explanations} from "./model_explanations";

const SelectText = ({allcolors, onChange, factor}) => {
  return (
  <select onChange={onChange} id={factor.factorName}
      style={{backgroundColor:"#f8f8ff",marginLeft:"10%",width:"40%"}}
      defaultValue={factor.factorColor}>
      {allcolors.map((color,i) =>
        <option key={i+'_'+color.name} value={i}>
       {color.name.substring(0,12)}
       </option>)}
    </select>
  )
}
// const Input = props => <input
//    type="radio"
//    value="xl"
//    onChange={this.onFactortoShow}
// />
// (show):<Input name={factor.factorName+'_show'}/>
//the input button would show only that factor - turning it to the subset, with && as search, etc.
//pull in other choices of things to show in other component
//this should only be per category, although chloropleths and scatterplots should both work
export default class PullDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setExplanation = this.props.setExplanation.bind(this);
    this.onFactortoShow = this.onFactortoShow.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.onChangetoShow = this.onChangetoShow.bind(this);
    this.state = {
      samprops : this.props.samprops,
      changeColors : this.props.samprops.changeColors
    }
  };
  setExplanation(e){
    //console.log(i)
    console.log('wtf'+e.target.value)
    console.log('wtfreaa')
    this.props.setExplanation(e) //not sure this does anything!!!! bind seems to work by itself, but haven't fully tested
  }
  onFactortoShow(e){
    this.props.onFactortoShow(e)
  }
  onCatChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onCatChange(event);
  }
  onChangetoShow(e) {
     var showObj = {catName:this.props.samprops.toShow[this.state.samprops.categIndex].category,factorName:e.target.id,factorColor:e.target.value};
     this.props.onChangetoShow(showObj);
  };
  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate in pull-down - set waiting here, and have it change interaction with everything')
    var samprops = {...this.state.samprops}
    if (this.props.samprops != prevProps.samprops){
      samprops.categIndex = this.props.samprops.categIndex;
      this.setState({samprops});
    };
  };

  render() {
    //this.model_explanations = model_explanations
    return (
      <div style={{backgroundColor:"#7f7f7f33"}}>
      <div title="Health Models and Interventions" style={{fontSize:"2em"}}>Models</div>
      <div style={{fontSize:"2em"}}>
      <select onChange={this.setExplanation} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
          defaultValue={this.props.samprops.explainIndex}>
          {model_explanations('names').map((cat,k) => <option
            key={cat+k} value={k}>
            {model_explanations('names')[k].model_name.substring(0,25)}
            </option>)
          }
      </select>
        <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>
      <div title="Select Boundaries to Show" style={{fontSize:"2em"}}>Geography</div>
      <div style={{fontSize:"2em"}}>
        <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
            defaultValue={"Background Map"}>
            <option>
              Background Map
              </option>
        </select>
        <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>
      <div title="Categories for display with colors" style={{fontSize:"2em"}}>Categories</div>
      {this.state.samprops.toShow.map((category,ind) =>
        category.fnd &&
          <div style={{fontSize:"1.1em", backgroundColor:"white"}} key={ind}>{category.pretty_name.substring(0,20)} : {category.fnd.substring(0,20)}</div>
      )}
      <div style={{fontSize:"2em"}}>
        <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
            defaultValue={this.state.samprops.toShow[this.state.samprops.categIndex].category}>
            {this.state.samprops.toShow.map((cat,k) => <option
              key={cat+k} value={this.state.samprops.toShow[k].category}>
              {this.state.samprops.toShow[k].pretty_name.substring(0,15)}
              </option>)
            }
        </select>
        <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>

      <div style={{fontSize:"1em", overflow:"auto"}}>

        {this.state.samprops.toShow[this.state.samprops.categIndex].factors.map((factor,ind) =>
          this.state.samprops.toShow[this.state.samprops.categIndex].fnd != factor.factorName &&
          <button key={ind}
            onClick={(e) => this.onFactortoShow(factor)}
            style={{backgroundColor: this.state.samprops.allcolors[factor.factorColor].HEX,
              borderColor: this.state.samprops.allcolors[factor.factorColor].HEX,
              position:'relative',width:'100%',
              borderWidth: "3px", borderStyle:"dashed", height:"2em"}}>
            {factor.factorName.substring(0,24)}
            {this.state.changeColors &&
              <div>

            <SelectText allcolors={this.state.samprops.allcolors} onChange={this.onChangetoShow} factor={factor}/>

              </div>
            }
          </button>)}

          <button key="100"
            onClick={(e) => this.onFactortoShow('')}
            style={{backgroundColor:'#ffffff',
              borderColor:'#ffffff',position:'relative',width:'100%',
              borderWidth: "3px", borderStyle:"solid", height:"2em"}}>
              show all {this.state.samprops.toShow[this.state.samprops.categIndex].pretty_name} factors
          </button>

          <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>
  </div>
    )
  }
}
