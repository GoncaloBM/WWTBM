/* App.js */
import React, { Component } from "./node_modules/react";
import CanvasJSReact from './Graph/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
const {CanvasJSChart} = CanvasJSReact;

// I believe this is not used anymore. Once this is versioned, you can safely delete it. If you need it, just time travel back!
export class PublicGraph extends Component {
	render() {
        let props = this.props

		const options = {
            theme: "dark2",
			title: {
				text: "Public Help"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
                    { label: 'A',  y: props.state.publicHelpActivated === true ? props.state.publicHelpState.percentageAnswer[0] : 0 },
					{ label: 'B', y: props.state.publicHelpActivated === true ? props.state.publicHelpState.percentageAnswer[1] : 0 },
					{ label: 'C', y: props.state.publicHelpActivated === true ? props.state.publicHelpState.percentageAnswer[2] : 0 },
                    { label: 'D',  y: props.state.publicHelpActivated === true ? props.state.publicHelpState.percentageAnswer[3] : 0  }
				]
			}
			]
		}
		return (
		<div className= {props.state.publicHelpActivated === true ? 'graph-showing graph' : 'graph-hidden graph'}>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        );
}
}
