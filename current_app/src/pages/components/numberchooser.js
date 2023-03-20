import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import bus from  '../../utils/bus';



const numberofpics = [
    { label: '1', no: 1 },
    { label: '2', no: 2 },
    { label: '3', no: 3 },
    { label: '4', no: 4 },
    { label: '5', no: 5 },
    { label: '6', no: 6 },
];

class NumberChooser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            number:0
        };
    }

    render() {
        return (
            <div>
                <Autocomplete
                    disablePortal
                    onChange={(event, value) => {
                        // console.log(value['no'])
                        bus.emit('picPerline',value['no'])
                        // this.setState({number: value['no']})
                        // console.log(this.state.number)
                    }}
                    id="combo-box-demo"
                    options={numberofpics}
                    defaultValue={{ label: '4', no: 4 }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Number of Images" />}
                />
            </div>
        );
    }

    onChangeHandler = (event, value) => {
        this.setState({number: value})
        console.log(this.state.number)
        bus.emit('picPerline',this.state.number)
    }

}

export default NumberChooser