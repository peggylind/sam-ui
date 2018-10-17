import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Points from "./Points";
import Axis from "./Axis";


export default class Scatterplot extends Component {
  constructor(props) {
      super(props);
      this.state = {
        width:this.props.width,
        height:this.props.height,
        marginTop:this.props.marginTop,
        marginTopFix:parseInt(20),
        marginLeftFix:parseInt(20),
        marginRightFix:parseInt(-20),
        marginBottomFix:parseInt(-20),
        x:this.props.x,
        y:this.props.y,
        r:this.props.r,
        fill:this.props.fill,
        stroke:this.props.stroke,
        xDomain:this.props.xDomain,
        yDomain:this.props.yDomain,
        xTickArguments:this.props.xTickArguments,
        yTickArguments:this.props.yTickArguments,
        data:this.props.data || []
      }
  }
  render() {
		var innerWidth = this.state.width - this.state.marginLeftFix - this.state.marginRightFix;
		var innerHeight = this.state.height - this.state.marginTopFix - this.state.marginBottomFix;
    console.log('innerHeight'+innerHeight)
    console.log(innerWidth)
		var innerTransform = `translate(${this.state.marginLeftFix},${this.state.marginTopFix})`;
    console.log(innerTransform)
		var xDomain = this.state.xDomain || d3.extent(this.state.data, this.state.x);
		var yDomain = this.state.yDomain || d3.extent(this.state.data, this.state.y);

		var xScale = d3.scaleLinear()
			.domain(xDomain)
			.range([0, innerWidth]);

		var yScale = d3.scaleLinear()
			.domain(yDomain)
			.range([innerHeight, 0]);
		var xValue = d => xScale(this.state.x(d));
		var yValue = d => yScale(this.state.y(d));
		var rValue = d => this.state.r(d);
		var fillValue = d => this.state.fill(d);
		var strokeValue = d => this.state.stroke(d);

		var pointsData = this.state.data.map(d => {
      //console.log(xValue(d)) //isNaN(parseInt(d['age'])) ? 0 : parseInt(d['age']) }
			return {
				x: xValue(d), //isNaN(xValue(d)) ? 0 : xValue(d),
				y: yValue(d), //isNaN(yValue(d)) ? 0 : yValue(d),
				r: rValue(d), //isNaN(rValue(d)) ? 0 : rValue(d),
				fill: fillValue(d),
				stroke: strokeValue(d)
			};
		});

		var bottomAxisTransform = `translate(0,${innerHeight})`;

		return (
			<svg
				className="Scatterplot"
				width={this.state.width}
				height={this.state.height}>

				<g transform={innerTransform}>

					<Points	data={pointsData} />

					<g transform={bottomAxisTransform}>
						<Axis
							orientation="bottom"
							scale={xScale}
							tickArguments={this.state.xTickArguments}/>
					</g>

					<Axis
						orientation="left"
						scale={yScale}
						tickArguments={this.state.yTickArguments} />
				</g>

			</svg>
		);
	}
}

//this doesn't seem to be doing it's job!!
Scatterplot.propType = {
	marginTop: PropTypes.number,
	marginLeft: PropTypes.number,
	marginBottom: PropTypes.number,
	marginRight: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	x: PropTypes.func,
	y: PropTypes.func,
	r: PropTypes.func,
	fill: PropTypes.func,
	stroke: PropTypes.func,
	xDomain: PropTypes.number,
	yDomain: PropTypes.number,
	xTickArguments: PropTypes.array,
	yTickArguments: PropTypes.array,
	data: PropTypes.array.isRequired
};

Scatterplot.defaultProps = {
	marginTop: 10,
	marginLeft: 30,
	marginBottom: 30,
	marginRight: 30,
	width: 960,
	height: 500,
	x: d => d.x,
	y: d => d.y,
	r: d => 3,
	fill: d => "#000",
	stroke: d => "none",
	xTickArguments: [],
	yTickArguments: []
};
