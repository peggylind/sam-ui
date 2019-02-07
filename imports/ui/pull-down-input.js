import React, {Component} from 'react';
import {model_explanations} from "./model_explanations";
import Slide from './slider-input';
//if aggregation pipeline lets you get $sum on same output, then put here???

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
    this.onScaleChange = this.onScaleChange.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.onGridSizeChange = this.onGridSizeChange.bind(this);
    this.onChangetoShow = this.onChangetoShow.bind(this);

    this.state = {
      gridmode: this.props.mapprops.mode,
      //samprops : this.props.samprops,
      changeColors : this.props.samprops.changeColors
    }
  };
  static getDerivedStateFromProps(props, state) {
    if(props.samprops != state.samprops){  //this is just for initial load to find something; it updates
      // console.log(props.samprops.toShow)
      var samprops = {...props.samprops}
      if(!samprops.datacount[samprops.toShow[samprops.categIndex].category]){
      //if (props.waiting){
        samprops.datacount[samprops.toShow[samprops.categIndex].category] = {}
      }
      return {samprops:samprops}
    }
  }
  setExplanation(e){
    this.props.setExplanation(e) //not sure this does anything!!!! bind seems to work by itself, but haven't fully tested
  }
  onFactortoShow(e){
    this.props.onFactortoShow(e)
  }
  onScaleChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onScaleChange(event);
  }
  onCatChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onCatChange(event);
  }
  onGridSizeChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onGridSizeChange(event);
  }
  onChangetoShow(e) {
     var showObj = {catName:this.props.samprops.toShow[this.state.samprops.categIndex].category,factorName:e.target.id,factorColor:e.target.value};
     this.props.onChangetoShow(showObj);
  };
  componentDidUpdate(prevProps, prevState) {
    var samprops = {...this.state.samprops}
    if (this.props.samprops.categIndex != prevProps.samprops.categIndex){
      samprops.categIndex = this.props.samprops.categIndex;
      this.setState({samprops});
    };
  };
  //also in App.js
  numberWithCommas = function(x) {
    if(x!=undefined){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
      return null
    }
  }
  onChangeHeight = function(event){
    //this won't require a reload, but may be hard to interpret
    console.log(event)
  }
  onUpper = function(event){
    //should be able to avoid reload with apollo at least some of the time!!!
    console.log(event)
  }
  onLower = function(event){
    console.log(event)
  }

  render() {
    //this.model_explanations = model_explanations
    return (
      <div style={{backgroundColor:"#7f7f7f33"}}>
      <div title="Health Models and Interventions" style={{fontSize:"1.5em"}}>Models</div>
      <div style={{fontSize:"1.5em"}}>
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

      <div title="Select Boundaries to Show" style={{fontSize:"1.5em"}} onClick={(e) => this.onScaleChange(0)}>Geography</div>
      <div style={{fontSize:"1.5em"}}>
        <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
            defaultValue={"Background Map"}>
            <option>
              Background Map
              </option>
        </select>
        <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>

      <div title="Categories for display with colors" style={{fontSize:"1.5em"}}>Categories</div>
      {this.state.samprops.toShowScale.map((category,ind) =>
        category.fnd &&
          <div style={{fontSize:"0.9em", backgroundColor:"#7f7f7f33",paddingLeft:"1em",textIndent:"-1em"}} key={ind}>
            {category.pretty_name.substring(0,20)} : {category.bottom_range} - {category.top_range}
            <br></br>
            {this.state.samprops.datacount[category.category] &&
              this.numberWithCommas(this.state.samprops.datacount[category.category][category.fnd])}
          </div>
      )}
      <div style={{fontSize:"1.5em"}}>
        <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
            defaultValue={this.state.samprops.toShow[this.state.samprops.categIndex].category}>
            {this.state.samprops.toShow.map((cat,k) => <option
              key={cat+k} value={this.state.samprops.toShow[k].category}>
              {this.state.samprops.toShow[k].pretty_name}
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
                      position:'relative',width:'100%',cursor:'pointer',
                      borderWidth: "3px", borderStyle:"dashed"}}>

                    <span>
                     {factor.factorName.substring(0,24)}
                    </span>
                    <br></br>
                    <span>
                      {this.numberWithCommas(this.state.samprops.datacount[this.state.samprops.toShow[this.state.samprops.categIndex].category][factor.factorName])}
                    </span>

                    {this.state.changeColors &&
                      <div>

                    <SelectText allcolors={this.state.samprops.allcolors} onChange={this.onChangetoShow} factor={factor}/>

                      </div>
                    }
                  </button>)}

                  <button key="100"
                    onClick={(e) => this.onFactortoShow('')}
                    style={{backgroundColor:'#ffffff',cursor:'pointer',
                      borderColor:'#ffffff',position:'relative',width:'100%',
                      borderWidth: "3px", borderStyle:"solid"}}>
                      <span>
                      total {this.state.samprops.toShow[this.state.samprops.categIndex].pretty_name}
                      </span>
                      <br></br>
                      <span>
                        {this.numberWithCommas(this.state.samprops.datacount[this.state.samprops.toShow[this.state.samprops.categIndex].category]['all'])}
                      </span>
                  </button>


                  <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
              </div>

      <div title="Categories for display with scale" onClick={(e) => this.onScaleChange(2)}
          style={{fontSize:"1.5em"}}>Scales</div>

      <div style={{fontSize:"1.5em"}}>
        <select onChange={this.onScaleChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".5em",width:"90%"}}
            defaultValue={this.state.samprops.toShowScale[this.state.samprops.scaleIndex].category}>
            {this.state.samprops.toShowScale.map((cat,k) => <option
              key={cat+k+'scale'} value={this.state.samprops.toShowScale[k].category}>
              {this.state.samprops.toShowScale[k].pretty_name.substring(0,15)}
              </option>)
            }
        </select>
        {(this.state.samprops.scaleIndex>0) &&
        <div style={{fontSize:".8em"}}>
          <br/>
          <Slide
            onChange={this.onChangeHeight}
            min={100}
            max={100000}
            step={100}
            eval_description={' contrast'}
          />

          <br/>
          <Slide
            onChange={this.onUpper}
            min={100}
            max={100000}
            step={100}
            eval_description={' upper'}
          />

          <br/>
          <Slide
            onChange={this.onLower}
            min={100}
            max={100000}
            step={100}
            eval_description={' lower'}
          />
          <br/>
        </div>}
        <hr onClick={ () => this.setState({ changeColors: !this.state.changeColors }) }/>
      </div>
      <div title="Showing count in area" onClick={(e) => this.onScaleChange(4)}
          style={{fontSize:"1.5em"}}>Counts</div>
      <button key="102"
        onClick={(e) => this.onScaleChange('4')}
        style={{backgroundColor:'#ffffff',cursor:'pointer',
          borderColor:'#ffffff',position:'relative',width:'100%',
          borderWidth: "3px", borderStyle:"solid", height:"2em"}}>
          grid population
      </button>
      {(this.props.mapprops.mode==4 || this.props.mapprops.mode==2) &&
      <div>
      <Slide
        onChange={this.onGridSizeChange}
        min={100}
        max={100000}
        step={100}
        eval_description={' km/side'}
      /></div>}
  </div>
    )
  }
}
