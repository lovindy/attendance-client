// src/components/common/SearchFilter.js
import React from 'react';
import { TextField, Grid } from '@mui/material';

const SearchFilter = ({ filters, onFilterChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Filter by ID"
          name="user_id"
          value={filters.user_id || ''}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Filter by Name"
          name="name"
          value={filters.name || ''}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SearchFilter;
