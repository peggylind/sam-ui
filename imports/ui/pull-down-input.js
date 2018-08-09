import React, {Component} from 'react';
//pull in other choices of things to show in other component
//this should only be per category
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
//join colors dynamically???
//change order of factors, not colors??
    return (
      <div>
      {this.props.toShow.category}
<div>
{this.props.toShow.factors.map((factor,ind) => <div key={ind}
    style={{backgroundColor: this.props.allcolors[factor.factorColor].HEX}}>
    {factor.factorName}
    <select onChange={this.onChangetoShow} defaultValue={factor.factorName+'_'+factor.factorColor}>

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
