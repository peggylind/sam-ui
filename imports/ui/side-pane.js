import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Slide from './slider-input';
import PullDown from './pull-down-input';
//might just do my own pane...

export default class SidePane extends Component {
    constructor(props) {
        super(props);
        console.log('SlidingPane'+JSON.stringify(this.props))
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        };

    };

    componentDidMount() {
      Modal.setAppElement(this.el);
    };

//index for toShow category could be here - and then it could do a number of types.
    render() {
      const paneButtonStyle = {
        position: 'relative',
        zIndex: '1',
        width: '100%'
      };
        return (

          <div style={paneButtonStyle} ref={ref => this.el = ref}>
                <div style={{ marginLeft: '92%', position:'absolute' }}>
                    <button onClick={() => this.setState({ isPaneOpen: !this.state.isPaneOpen })}>
                      Right Pane
                    </button>
                </div>
              <div style={{ marginLeft: '2%', position:'absolute' }}>
                  <button onClick={ () => this.setState({ isPaneOpenLeft: !this.state.isPaneOpenLeft }) }>
                      Left Pane
                  </button>
              </div>

          <SlidingPane
              className='some-custom-class'
              overlayClassName='some-custom-overlay-class'
              isOpen={ this.state.isPaneOpen }
              title='Optional pane title.  I can be React component too.'
              subtitle='Optional subtitle.'
              width='50%'
              onRequestClose={ () => {
                  // triggered on "<" on left top click or on outside click
                  this.setState({ isPaneOpen: false });
              } }>
              <div>Show selector/graphs on this side?</div>

          </SlidingPane>
          <SlidingPane
              isOpen={ this.state.isPaneOpenLeft }
              title='Controls'
              subtitle='Think through how much info here'
              from='left'
              width='50%'
              onRequestClose={ () => {
                this.setState({ isPaneOpenLeft: false });
              } }>
              <Slide
                onChange={this.props.onPopChange}
                min={100}
                max={100000}
                step={1000}
              ></Slide>
              <PullDown
                onChangetoShow={this.props.onChangetoShow}
                allcolors={this.props.samprops.allcolors}
                toShow={this.props.samprops.toShow[0]}
              ></PullDown>

              <h1>put GeoJSON selector here</h1>
          </SlidingPane>
          </div>
)}};
