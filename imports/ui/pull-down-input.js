import React, {Component} from 'react';
//pull in other choices of things to show in other component

export default class PullDown extends Component {
  constructor(props) {
    super(props);
    console.log('pulldown'+JSON.stringify(this.props))
    this.onChangetoShow = this.onChangetoShow.bind(this);
  };
  onChangetoShow(e) {
    this.props.onChangetoShow(e.target.value);
  };


  render() {
//join colors dynamically???
//change order of factors, not colors??
    return (
      <div>
<div>
{this.props.toShow.factors.map((factor,ind) => <div key={ind}
    style={{backgroundColor: this.props.allcolors[ind].HEX}}>
    {factor}
    <select onChange={this.onChangetoShow} defaultValue={this.props.allcolors[ind].name}>

    {this.props.allcolors.map((color,i) => <option
      key={factor+color.HEX}>
    {color.name}
    </option>)}
    </select>
    </div>)}
</div>

<div>
<div style={{backgroundColor: this.props.allcolors[4].HEX}}>{this.props.toShow.category}
<select onChange={this.onChangetoShow}
>{this.props.toShow.factors.map((x,y) => <option key={y}
    style={{backgroundColor: '#ff3300'}}>
    {y}{this.props.allcolors[y].HEX}
    </option>)}</select>
</div>

<div style={{backgroundColor: this.props.allcolors[2].HEX}}>{this.props.toShow.category}
<select onChange={this.onChangetoShow}
>{this.props.allcolors.map((x,y) => <option key={y}
    style={{color: x.HEX}}>
    {x.HEX}
    </option>)}</select>
</div>
</div>
</div>
    )
  }
}
