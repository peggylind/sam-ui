//cf: https://bl.ocks.org/armollica/97b90b0aa19234b52117ee96dfa38d61
import React, {Component} from 'react';
import * as d3 from "d3";
import Scatterplot from "./Scatterplot";

export default class D3Scatter extends React.PureComponent {
  constructor(props) {
      super(props);
      this.handlePopulationChange = this.props.handlePopulationChange;
      this.state = {
        waiting: 1,
        scatterdata: this.props.data || []
      };
    };
  componentDidMount(){
    // console.log('mounted'+this.state.scatterplot)
    // console.log('so b4 setState')
  //  this.setState({scatterdata: this.props.data, waiting: 0});
  }
  componentDidUpdate(props, prevState) {
    // console.log('didUpdate'+prevState.waiting)
   if (props.data != prevState.data){
      this.setState({scatterdata: props.data}); //, waiting: 0});
   };
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //  if (nextProps.data && prevState.waiting == 1){
  //    console.log('getDerivedStateFromProps')
  //     //let scatterdata: nextProps.data, waiting: 0});
  //  };
  // };
  render() {
		var width = this.props.containerwidth,
				height = this.props.containerheight/3;
//    console.log('width'+this.props.containerwidth)
    var plotClasses = this.props.plotFactorColors; //perhaps have a column on the toShow
//should make it follow same logic as map-box for showing stuff??
//maybe always do it with same three like Marina?? have to decide how to show???
		var plots = plotClasses.map((plotClass, i) => {
        console.log("plotClass: "+JSON.stringify(plotClass))
			var annotations = getAnnotations(plotClass);

			return (
				<div key={i} className="plot" style={{position: "relative"}}>

					<Scatterplot
						width={width}
						height={height}
						marginTop={40}
						x={d => parseInt(d['age'])}//isNaN(parseInt(d['age'])) ? 0 : parseInt(d['age']) }
						y={d => parseInt(d['household_income'])} //isNaN(parseInt(d['household_income'])) ? 0 : parseInt(d['household_income']) }
						r={d => 3}
						fill={d => plotClass.factorcolors[d[plotClass.category]]}
            stroke={d=>"none"}
						xDomain={[1, 100]}
						yDomain={[10, 450000]}
						xTickArguments={[5]}
						yTickArguments={[50000]}
						data={this.state.scatterdata}
            />

					<div style={{position: "absolute", left: 0, top: 0}}>
						{annotations}
					</div>

				</div>
			);
		});

		return (
			<div className="plots">
				<div
					className="plot plot-title"
					style={{width: (width - 50), height: height, marginRight: 50}}>
					<h3>Plots of the selected groups by other variables</h3>
					<p>
						Should have this like the explanation text
					</p>
				</div>

				{plots}
			</div>
		);
	};
};
function getAnnotations(plotClass) {
	return [
		(
			<span
				key="0"
				className="chart-title"
				style={{position: "absolute", left: 5, top: 10, width: 200}}>
				"{plotClass.category}"
			</span>
		),
		(
			<span
				key="1"
				className="axis-label"
				style={{position: "absolute", left: 149, top: 182}}>
				"{plotClass.category}"
			</span>
		),
		(
			<span
				key="2"
				className="axis-label"
				style={{position: "absolute", left: 100, top: 134, width: 200,
								MsTransform: "rotate(90deg)",
								WebkitTransform: "rotate(90deg)",
								transform: "rotate(90deg)"}}>
				"{plotClass.category}"
			</span>
		)
	];
}
