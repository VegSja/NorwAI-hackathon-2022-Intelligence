import React, { useState} from 'react';
import { MenuItem, TextField, Button, FormControl, InputLabel, Select } from '@mui/material';

import "../App.css";

const RouteWidget = (props) => {

  return (
    <div className={"widgetContainer"}>
      What do you want to see?
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selected}
          label="Age"
          onChange={(e) => props.handleChange(e)}
        >
          <MenuItem value={"rrl"}>Rain</MenuItem>
          <MenuItem value={"qsw"}>Snowmelt</MenuItem>
          <MenuItem value={"qtt"}>Snowmelt and rain</MenuItem>
          <MenuItem value={"tm"}>Temperature</MenuItem>
          <MenuItem value={"rr"}>Percepitation</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default RouteWidget;
