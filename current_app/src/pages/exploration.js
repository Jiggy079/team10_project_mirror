import React from "react";
import MenuBar from "./components/menubar";
import ImageExplorer from "./components/imageExplorer";
import NumberChooser from "./components/numberchooser";
import YearSlider from "./components/yearslider";
import Filters from "./components/filters.js";
import "./exploration.css";
import {Card} from "@mui/material";

class Exploration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: null,
			user: "",
		}
		this.filtersCallback = this.filtersCallback.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("user");
        if (username === "undefined" || username === null) {
            this.setState({ user: "Guest" });
        } else {
            this.setState({ user: username });
        }
    }

	filtersCallback(filters) {
		this.setState({filters: filters});
	}

	handleLogin(username) {
        this.setState({user: username});
    }

	render () {
		document.title = "Exploration Tool";
		return (
			<div>
				<MenuBar user={this.state.user}/>

				{/*<CheckboxesTags/>*/}
				<Card>
					<div className={"filter"}>
						<div className={"slider"}>
							<YearSlider callback={this.yearFilterCallback}/>
							<div className={"number_chooser"}>
								<NumberChooser />
							</div>
						</div>
						<div id="titlebar-container">
							<h3>Filters</h3>
						</div>
						<div className={"annotation"}>
							<Filters callback={this.filtersCallback} />
						</div>
					</div>
				</Card>
				<ImageExplorer filters={this.state.filters}/>
			</div>
		);
	}
}

export default Exploration;
