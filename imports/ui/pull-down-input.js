import React, {Component} from 'react';


const SelectText = ({allcolors, onChange, factor}) => {
  return (
  <select onChange={onChange} id={factor.factorName}
      style={{backgroundColor:"#f8f8ff",marginLeft:"10%"}}
      defaultValue={factor.factorColor}>
      {allcolors.map((color,i) => <option
        key={i+'_'+color.name} value={i}>
       {color.name}
       </option>)}
    </select>
  )
}
const Input = props => <input
   type="radio"
   name="showOnly"
   value="xl"
   checked="false"
   onChange={this.onChangetoShow}
/>
//the input button would show only that factor - turning it to the subset, with && as search, etc. 
//pull in other choices of things to show in other component
//this should only be per category, although chloropleths and scatterplots should both work
export default class PullDown extends Component {
  constructor(props) {
    super(props);
    this.onCatChange = this.onCatChange.bind(this);
    this.onChangetoShow = this.onChangetoShow.bind(this);
    this.state = {
      samprops : this.props.samprops
    }
  };
  onCatChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onCatChange(event);
  }
  onChangetoShow(e) {
     var showObj = {catName:this.props.samprops.toShow[this.state.samprops.categIndex].category,factorName:e.target.id,factorColor:e.target.value};
     this.props.onChangetoShow(showObj);
  };
  componentDidUpdate(prevProps, prevState) {
    var samprops = {...this.state.samprops}
    if (this.props.samprops != prevProps.samprops){
      samprops.categIndex = this.props.samprops.categIndex;
      this.setState({samprops});
    };
  };

  render() {
    return (
      <div>
      <div style={{fontSize:"2em"}}>
      Showing:
        <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"4%",fontSize:".7em",width:"90%"}}
            defaultValue={this.state.samprops.toShow[this.state.samprops.categIndex].category}>
            {this.state.samprops.toShow.map((cat,k) => <option
              key={cat+k} value={this.state.samprops.toShow[k].category}>
              {this.state.samprops.toShow[k].category}
              </option>)
            }
        </select>
        <hr/>
      </div>
      <div style={{fontSize:"1em", overflow:"scroll"}}>
        {this.state.samprops.toShow[this.state.samprops.categIndex].factors.map((factor,ind) => <div key={ind}
            style={{backgroundColor: this.state.samprops.allcolors[factor.factorColor].HEX,
              borderColor: this.state.samprops.allcolors[factor.factorColor].HEX,
              borderWidth: "3px", borderStyle:"dashed", height:"2em"}}>
            {factor.factorName}
            {this.props.samprops.changeColors &&
              <div>

            <SelectText allcolors={this.state.samprops.allcolors} onChange={this.onChangetoShow} factor={factor}/>
            <Input/>
              </div>
            }
          </div>)}
      </div>
  </div>
    )
  }
}
