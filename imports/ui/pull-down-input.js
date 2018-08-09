import React, {Component} from 'react';
//pull in other choices of things to show in other component
//this should only be per category, although chloropleths and scatterplots should both work
export default class PullDown extends Component {
  constructor(props) {
    super(props);
    console.log('pulldown'+JSON.stringify(this.props))
    this.onChangetoShow = this.onChangetoShow.bind(this);
  };
  onChangetoShow(e) {
    var showObj = {catName:this.props.toShow.category,factorName:e.target.value.split('_')[0],factorColor:e.target.value.split('_')[1]};
     this.props.onChangetoShow(showObj);
  };


  render() {
//could make the factorNames changeable, too - have to think about built in ranges?
//if type = range, then show it on side-pane as a range??
    return (
      <div>
      <h1>
      {this.props.toShow.category}
      </h1>
<div>
{this.props.toShow.factors.map((factor,ind) => <div key={ind}
    style={{backgroundColor: this.props.allcolors[factor.factorColor].HEX}}>
    <h5 style={{marginLeft:"4%"}}>
    {factor.factorName}
    </h5>
    <select onChange={this.onChangetoShow} style={{backgroundColor:"white",marginLeft:"40%"}}
        defaultValue={factor.factorName+'_'+factor.factorColor}>

    {this.props.allcolors.map((color,i) => <option
      key={factor+color.HEX} value={factor.factorName+'_'+i}>
        {color.name}
    </option>)}
    </select>
    </div>)}
</div>

  </div>
    )
  }
}
