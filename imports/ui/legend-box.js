import React, { Component } from 'react';
import Slide from './slider-input';
import PullDown from './pull-down-input';
//might just do my own pane...

export default class LegendBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBoxOpen: true,
        };

    };

    componentDidMount() {
    };

//index for toShow category could be here - and then it could do a number of types.
    render() {
      const boxStyle = {
        marginTop: '10%',
        position: 'absolute',
        zindex: '3',
        width: '25%',
        height: '80%',
        backgroundColor: 'white',
        overflow: 'scroll'
      }
      const boxButtonStyle = {
        position: 'relative',
        zIndex: '1',
        width: '100%'
      };
        return (

          <div style={boxStyle}>
          {!this.state.isBoxOpen &&
          <div style={boxButtonStyle}>
                  <button onClick={() => this.setState({ isBoxOpen: true })}>
                    Show Legend
                  </button>
          </div>
          }
          {this.state.isBoxOpen &&
            <div>
            <div style={boxButtonStyle}>
                    <button onClick={() => this.setState({ isBoxOpen: false })}>
                      Hide Legend
                    </button>
            </div>

            <div style={{position:'absolute',marginLeft:'15%',zIndex:'3',width:'50%'}}>

              <PullDown
                onChangetoShow={this.props.onChangetoShow}
                onCatChange={this.props.onCatChange}
                samprops={this.props.samprops}
              ></PullDown>
              <hr/>
              <Slide
                onChange={this.props.onPopChange}
                min={100}
                max={100000}
                step={1000}
              ></Slide>
              <h1>put GeoJSON selector here</h1>
            </div>
            </div>
          }

          </div>
)}};
