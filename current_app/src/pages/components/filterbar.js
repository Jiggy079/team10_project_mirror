import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={years}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Filter the Years" placeholder="choose years" />
      )}
    />
  );


}

export default CheckboxesTags;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const years = [
  { title: '1990' },
  { title: '1991'},
  { title: '1992' },
  { title: '1993'},
  { title: '1994'},
  { title: '1995'},
  { title: '1996'},
  { title: '1997' },
  { title: '1998'},
  { title: '1999' },
  {title: '2000'},
  {title: '2001'},
  { title: '2002'},
  { title: '2003'},
  {title: '2004'},
  { title: '2005'},
  { title: '2006'},
  { title: '2007'},
  { title: '2008' },
  {title: '2009'},
  { title: '2010'},
  { title: '2011' },
  { title: '2012'},
  { title: '2013'},
  { title: '2014' },
  { title: '2016'},
  { title: '2017'},
  { title: '2018'},
  { title: '2019'},
  { title: '2020'},
];