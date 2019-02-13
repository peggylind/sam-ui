import React, { Component } from 'react';
import Slide from './slider-input';
import PullDown from './pull-down-input';
//might just do my own pane...

export default class LegendBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isBoxOpen: true,
        };
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
    };
    handleClick() {
      this.setState(state => ({
        isBoxOpen: !state.isBoxOpen
      }));
    }

//index for toShow category could be here - and then it could do a number of types.
//slider works reasonably well, but need to debug
// <Slide
//   onChange={this.props.onPopChange}
//   min={100}
//   max={100000}
//   step={1000}
// ></Slide>

    render() {
      const boxStyle = {
        top: '2%',
        textAlign: 'center',
        position: 'absolute',
        zindex: '3',
        width: '25%',
        height: '92%',
        borderRadius:'25px',
        backgroundColor: '#F6BE00',
        overflow: 'scroll'
      }
      const boxButtonStyle = {
        position: 'absolute',
        cursor: 'pointer',
        left: '2%',
        top: '1%',
        zIndex: '4',
        width: '10%'
      };
        return (

          <div style={boxStyle}>

          {this.state.isBoxOpen &&
            <div style={{position:'absolute',marginLeft:'5%',zIndex:'3',width:'50%'}}>

              <PullDown
                onChangetoShow={this.props.onChangetoShow}
                onCatChange={this.props.onCatChange}
                onGridSizeChange={this.props.onGridSizeChange}
                onScaleChange={this.props.onScaleChange}
                onFactortoShow={this.props.onFactortoShow}
                setUpdate={this.props.setUpdate}
                setExplanation={this.props.setExplanation}
                samprops={this.props.samprops}
                mapprops={this.props.mapprops}
              ></PullDown>

            </div>
          }
          <span style={boxButtonStyle}>
                  <button title="Toggle Selectors" onClick={this.handleClick}>
                    {this.state.isBoxOpen ? '<' : '>'}
                  </button>
          </span>

          </div>
)}};
