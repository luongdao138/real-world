import { TextField } from '@material-ui/core';
import React from 'react';

const Input = ({
  value,
  label,
  placeholder,
  onChange,
  name,
  errors,
  variant = 'standard',
  color = 'primary',
  ...rest
}) => {
  return (
    <TextField
      error={errors && errors[name] ? true : false}
      style={{ marginBottom: '24px' }}
      variant={variant}
      name={name}
      placeholder={placeholder}
      label={label}
      value={value}
      onChange={onChange}
      color={color}
      helperText={errors && errors[name]}
      {...rest}
    />
  );
};

export default Input;
