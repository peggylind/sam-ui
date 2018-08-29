import React, {Component} from 'react';
//pull in other choices of things to show in other component
//this should only be per category, although chloropleths and scatterplots should both work
export default class PullDown extends Component {
  constructor(props) {
    super(props);
    console.log('pulldown'+JSON.stringify(this.props))
    this.onCatChange = this.onCatChange.bind(this);
    this.onChangetoShow = this.onChangetoShow.bind(this);
    this.state = {
      categIndex : 0
    }
  };
  onCatChange(event) { //if you take value of index, it does the map function differently - very odd
    this.props.samprops.toShow.forEach(function(row,r){
      if(row.category == event.target.value){
        console.log(r) //will need to implement fully - setState on categIndex for display, and maybe send some sort of thing to onChangetoShow???
      }
    })
  }
  onChangetoShow(e) {
    var showObj = {catName:this.props.samprops.toShow[this.state.categIndex].category,factorName:e.target.value.split('_')[0],factorColor:e.target.value.split('_')[1]};
     this.props.onChangetoShow(showObj);
  };


  render() {
//could make the factorNames changeable, too - have to think about built in ranges?
//if type = range, then show it on side-pane as a range??
    return (
      <div>
      <div style={{fontSize:"2em"}}>
      <select onChange={this.onCatChange} style={{backgroundColor:"white",marginLeft:"40%"}}
          defaultValue={this.props.samprops.toShow[this.state.categIndex].category}>

          {this.props.samprops.toShow.map((cat,k) => <option
            key={cat+k} value={this.props.samprops.toShow[k].category}>
            {this.props.samprops.toShow[k].category}
            </option>)
          }
      </select>
      </div>
<div style={{fontSize:"1.2em", overflow:"scroll"}}>
{this.props.samprops.toShow[this.state.categIndex].factors.map((factor,ind) => <div key={ind}
    style={{backgroundColor: this.props.samprops.allcolors[factor.factorColor].HEX,
      borderColor: this.props.samprops.allcolors[factor.factorColor].HEX,
      borderWidth: "3px", borderStyle:"dashed", height:"2em"}}>
    {factor.factorName}

    <select onChange={this.onChangetoShow} style={{
      backgroundColor:"#f8f8ff",marginLeft:"40%"}}
        defaultValue={factor.factorName+'_'+factor.factorColor}>

    {this.props.samprops.allcolors.map((color,i) => <option
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
