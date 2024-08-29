import React from 'react';
import { Box, TextField } from '@mui/material';

const FilterComponent = ({ filters, onFilterChange, fields }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          variant="outlined"
          value={filters[field.name] || ''}
          onChange={(e) => onFilterChange(field.name, e.target.value)}
        />
      ))}
    </Box>
  );
};

export default FilterComponent;
