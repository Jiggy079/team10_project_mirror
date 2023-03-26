import React from "react";
import MenuBar from "./components/menubar";
import ImageExplorer from "./components/imageExplorer";
import NumberChooser from "./components/numberchooser";
import YearSlider from "./components/yearslider";
import Filters from "./components/filters.js";
import "./exploration.css";

class Exploration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minYear: null,
			maxYear: null,
			filters: null
		}
		this.yearFilterCallback = this.yearFilterCallback.bind(this);
		this.filtersCallback = this.filtersCallback.bind(this);
	}

	// this function is passed to YearSlider and should be called in its onChange function with the min and max year as parameters
	yearFilterCallback(value1, value2) {
		this.setState({minYear: value1, maxYear: value2});
	}

	filtersCallback(filters) {
		this.setState({filters: filters});
	}

	render () {
		document.title = "Exploration Tool";
		return (
			<div>
				<MenuBar />

				{/*<CheckboxesTags/>*/}
				{/* The callback function can be called with the syntax props.callback(params) */}
				<YearSlider callback={this.yearFilterCallback}/>
				<NumberChooser />
				<Filters callback={this.filtersCallback} />
				{/* Render ImageExplorer component with the min and max year of images it should display respectively */}
				{/* These values can be accessed within ImageExplorer via its props object, e.g. props.minYear */}
				<ImageExplorer minYear={this.state.minYear} maxYear={this.state.maxYear} filters={this.state.filters}/>
			</div>
		);
	}
}

export default Exploration;
