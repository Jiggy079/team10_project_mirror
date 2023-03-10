import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 1990,
    label: '1990',
  },
  {
    value: 2000,
    label: '2000',
  },
  {
    value: 2010,
    label: '2010',
  },
  {
    value: 2020,
    label: '2020',
  },
];

export default function YearSlider() {
  return (
    <Stack sx={{ width: 300 }} spacing={1} direction="row">
      <Slider
        orientation = "horizontal"
        getAriaLabel={() => 'Filter the years'}
        getAriaValueText={valuetext}
        defaultValue={[1990, 2020]}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Stack>
  );
}