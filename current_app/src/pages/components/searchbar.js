import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

function BasicMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	return (
	  <div>
		<Button
		  id="basic-button"
		  aria-controls={open ? 'basic-menu' : undefined}
		  aria-haspopup="true"
		  aria-expanded={open ? 'true' : undefined}
		  onClick={handleClick}
		>
		  Filter
		</Button>
		<Menu
		  id="basic-menu"
		  anchorEl={anchorEl}
		  open={open}
		  onClose={handleClose}
		  MenuListProps={{
			'aria-labelledby': 'basic-button',
		  }}
		>
		  <MenuItem onClick={handleClose}>Colour</MenuItem>
		  <MenuItem onClick={handleClose}>Black and White</MenuItem>
		  <MenuItem onClick={handleClose}>Greyscale</MenuItem>
		</Menu>
	  </div>
	);
  }

export default BasicMenu;