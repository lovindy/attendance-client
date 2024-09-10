import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
