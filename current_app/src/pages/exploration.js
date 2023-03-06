import React from "react";
import MenuBar from "./components/menubar";
import BasicMenu from "./components/searchbar";
import ImageExplorer from "./components/imageExplorer";

class Exploration extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<MenuBar />
				<BasicMenu />
				<ImageExplorer />
			</div>
		);
	}
}

export default Exploration;