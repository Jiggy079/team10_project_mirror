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
        this.updateUse = this.updateUse.bind(this);
        this.updateLegend = this.updateLegend.bind(this);
        this.updateDifficulty = this.updateDifficulty.bind(this);
        this.updateNumber = this.updateNumber.bind(this);
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

    updateLegend (event) {
        this.setState({legend: event.target.value}, this.updateFilters);
    }

    updateDifficulty (event) {
        this.setState({difficulty: event.target.value}, this.updateFilters);
    }

    updateNumber (event) {
        this.setState({number: event.target.value}, this.updateFilters);
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
                    onChange={this.updateUse}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"aesthetics"}>Aesthetics</MenuItem>
                    <MenuItem value={"colour-mapping"}>Colour Mapping</MenuItem>
                    <MenuItem value={"depth perception"}>Depth Perception</MenuItem>
                </Select>

                <Select
                    value={this.state.legend}
                    label="Legend..."
                    onChange={this.updateLegend}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"n-"}>No</MenuItem>
                    <MenuItem value={"legend"}>Legend</MenuItem>
                </Select>

                <Select
                    value={this.state.difficulty}
                    label="Difficulty Level..."
                    onChange={this.updateDifficulty}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                </Select>

                <Select
                    value={this.state.number}
                    label="No. of colours..."
                    onChange={this.updateNumber}
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"NA"}>NA</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                    <MenuItem value={"6"}>6</MenuItem>
                    <MenuItem value={"7"}>7</MenuItem>
                    <MenuItem value={"8"}>8</MenuItem>
                    <MenuItem value={"9"}>9</MenuItem>
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"11"}>11</MenuItem>
                    <MenuItem value={"12"}>12</MenuItem>
                </Select>
            </div>
        );
    }
}

export default Filters;
