import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // these need to match the fields in backend exactly
            colour: "none", // b&w/grey/colour
            use: "none", // aesthetics, vis etc.
            legend: "none", // legend yes or no
            maptype: "none", // categorical or cont.
            number: "none", // how many colour values
            difficulty: "none" // annotation difficulty
        };
        this.updateFilters = this.updateFilters.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateUse = this.updateCategory.bind(this);
    }

    updateFilters () {
        this.props.callback(this.state);
    }

    updateType (event) {
        this.setState({colour: event.target.value}, this.updateFilters);
    }

    updateCategory (event) {
        this.setState({maptype: event.target.value}, this.updateFilters);
    }

    updateUse (event) {
        this.setState({use: event.target.value}, this.updateFilters);
    }

    render () {
        return (
            <div id="filters-container">
                <Select
                    value={this.state.colour}
                    label="Colour type..."
                    onChange={this.updateType}
                    >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"black and white"}>Black and white</MenuItem>
                    <MenuItem value={"grey"}>Greyscale</MenuItem>
                    <MenuItem value={"colour"}>Colour</MenuItem>
                </Select>

                <Select
                    value={this.state.maptype}
                    label="Colour category..."
                    onChange={this.updateCategory}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"continuous"}>Continuous</MenuItem>
                    <MenuItem value={"categorical"}>Categorical</MenuItem>
                    <MenuItem value={"both"}>Both</MenuItem>
                </Select>

                <Select
                    value={this.state.use}
                    label="Colour Use..."
                    onChange={this.updateCategory}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"aesthetics"}>Aesthetics</MenuItem>
                    <MenuItem value={"colour mapping"}>Colour Mapping</MenuItem>
                    <MenuItem value={"depth perception"}>Depth Perception</MenuItem>
                </Select>
            </div>
        );
    }
}

export default Filters;
