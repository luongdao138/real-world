import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

const Button = ({
  variant = 'contained',
  color = 'primary',
  text,
  onClick,
  ...rest
}) => {
  return (
    <MuiButton variant={variant} color={color} onClick={onClick} {...rest}>
      {text}
    </MuiButton>
  );
};

export default Button;
