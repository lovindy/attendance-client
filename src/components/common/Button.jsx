import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({
  onClick,
  children,
  variant = 'contained',
  ...props
}) => {
  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
