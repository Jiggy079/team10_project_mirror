import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import bus from  '../../utils/bus';
import { lightBlue } from '@mui/material/colors';

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: 1990,
    label: '1990',
    colour:  lightBlue,
  },
  {
    value: 2000,
    label: '2000',
    colour:  lightBlue,
  },
  {
    value: 2010,
    label: '2010',
    colour:  lightBlue,
  },
  {
    value: 2020,
    label: '2020',
    colour:  lightBlue,
  },
];

// export default function VerticalSlider() {
//   return (
//     <Stack sx={{ width : 300 }} spacing={1} direction="row">
//       <Slider
//         getAriaLabel={() => 'Temperature'}
//         getAriaValueText={valuetext}
//         defaultValue={[1990, 2020]}
//         min={1990}
//         max={2020}
//         valueLabelDisplay="auto"
//         step={1}
//         marks={marks}
//         colour = "primary"
//       />
//     </Stack>
//   );
// }

class yearslider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      range:[]
    };
  }

  render() {
    return (
      <div>
        <Stack sx={{ width : 300 }} spacing={1} direction="row">
          <Slider
              getAriaLabel={() => 'Temperature'}
              getAriaValueText={valuetext}
              defaultValue={[1990, 2020]}
              min={1990}
              max={2020}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              onChange = {this.onChangeHandler}
              colour = "primary"
          />
        </Stack>
      </div>
    );
  }

  onChangeHandler = (event, value) => {
    this.setState({range: value})
    bus.emit('yearRange',this.state.range)
  }

}

export default yearslider