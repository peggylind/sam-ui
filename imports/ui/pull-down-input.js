import React, {Component} from 'react';
//pull in other choices of things to show in other component
//this should only be per category, although chloropleths and scatterplots should both work
export default class PullDown extends Component {
  constructor(props) {
    super(props);
    this.onCatChange = this.onCatChange.bind(this);
    this.onChangetoShow = this.onChangetoShow.bind(this);
    this.state = {
      //categIndex : this.props.samprops.categIndex,
      samprops : this.props.samprops
    }
  };
  onCatChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.onCatChange(event);
  }
  onChangetoShow(e) {
     var showObj = {catName:this.props.samprops.toShow[this.state.samprops.categIndex].category,factorName:e.target.value.split('_')[0],factorColor:e.target.value.split('_')[1]};
     this.props.onChangetoShow(showObj);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.samprops != prevProps.samprops){
      this.setState({samprops: this.props.samprops});
    };
  };

  render() {
//could make the factorNames changeable, too - have to think about built in ranges?
//if type = range, then show it on side-pane as a range??
    return (
      <div>
      <div style={{fontSize:"2em"}}>
      <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"40%"}}
          defaultValue={this.state.samprops.toShow[this.state.samprops.categIndex].category}>

          {this.state.samprops.toShow.map((cat,k) => <option
            key={cat+k} value={this.state.samprops.toShow[k].category}>
            {this.state.samprops.toShow[k].category}
            </option>)
          }
      </select>
      </div>
<div style={{fontSize:"1.2em", overflow:"scroll"}}>
{this.state.samprops.toShow[this.state.samprops.categIndex].factors.map((factor,ind) => <div key={ind}
    style={{backgroundColor: this.state.samprops.allcolors[factor.factorColor].HEX,
      borderColor: this.state.samprops.allcolors[factor.factorColor].HEX,
      borderWidth: "3px", borderStyle:"dashed", height:"2em"}}>
    {factor.factorName}

    <select onChange={this.onChangetoShow} style={{
      backgroundColor:"#f8f8ff",marginLeft:"40%"}}
        defaultValue={factor.factorName+'_'+factor.factorColor}>
    {this.state.samprops.allcolors.map((color,i) => <option
      key={i+'_'+color.name} value={factor.factorName+'_'+i}>
        {color.name}
    </option>)}
    </select>
    </div>)}
</div>

  </div>
    )
  }
}
