import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: 1990,
    label: '1990',
  },
  {
    value: 20,
    label: '2000',
  },
  {
    value: 37,
    label: '2010',
  },
  {
    value: 100,
    label: '2020',
  },
];

export default function VerticalSlider() {
  return (
    <Stack sx={{ width : 300 }} spacing={1} direction="row">
      <Slider
        getAriaLabel={() => 'Temperature'}
        getAriaValueText={valuetext}
        defaultValue={[1990, 2020]}
        valueLabelDisplay="auto"
        marks={marks}
        colour = "light blue"
      />
    </Stack>
  );
}