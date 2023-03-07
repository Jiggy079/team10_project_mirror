import React from "react";
import MenuBar from "./components/menubar";
import ImageExplorer from "./components/imageExplorer";
import CheckboxesTags from "./components/Yearsfilterbar";
import "./exploration.css";

class Exploration extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		document.title = "Exploration Tool";
		return (
			<div>
				<MenuBar />
				<CheckboxesTags/>
				<ImageExplorer />

			</div>
		);
	}
}

export default Exploration;