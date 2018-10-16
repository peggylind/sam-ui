import React from "react";

class Points extends React.Component {
	render() {
		var circles = this.props.data.map((d, i) => {
			//console.log('in Points: '+JSON.stringify(d)+'also i: '+i)
			//could I save i as the count for the total?
			//could I tack on stuff for tooltip?
			return (
				<circle
					key={i}
					cx={d.x}
					cy={d.y}
					r={d.r}
					fill={d.fill}
					stroke={d.stroke} >
				</circle>
			)
		});
		return (
			<g className="Points">
				{circles}
			</g>
		);
	}
}

export default Points;
