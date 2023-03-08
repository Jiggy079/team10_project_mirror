import React from "react";
import MenuBar from "./components/menubar";
import BasicMenu from "./components/searchbar";
import ImageExplorer from "./components/imageExplorer";
import CheckboxesTags from "./components/filterbar";
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