import React, {Component} from 'react';
import debounce from 'lodash.debounce';
//import InputSlider from 'react-input-slider';

export default class Slide extends Component {
  constructor(props) {
    super(props);
    //console.log('slider'+JSON.stringify(this.props))
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
    this.evalue = 1000;
  };
  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  };
  handleChange(e) {
    this.evalue = e.target.value;
    this.emitChangeDebounced(e.target.value);
  };
  //register value on parent's function
  emitChange(value) {
    this.props.onChange(value);
  };


  render() {
    const containerStyle = {
      position: 'relative',
      zIndex: '1',
      backgroundColor: 'white',
      height: '20px',
      border: '3px solid green'
    }
    const rangeStyle = {
      position: 'absolute',
      zIndex: '2',
      width: '80%',
      height: '100%',
      display: 'inlineBlock',
      cursor: 'pointer'
    }
    const readOut = {
      position: 'absolute',
      width:'14%',
      marginLeft: '85%',
      height: '97%'
    }

    return (

<div style={containerStyle}>
  <input
    type="range"
    min={this.props.min}
    max={this.props.max}
    step={this.props.step}
    onChange={this.handleChange}
    style={rangeStyle}/>
  <div style={readOut}>
    {this.evalue}
  </div>
</div>

    )
  }
}
