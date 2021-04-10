import React from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const convert = (e, name) => {
  return {
    target: {
      name,
      value: e.target.checked,
    },
  };
};

const Checkbox = ({
  label,
  value,
  name,
  color = 'primary',
  onChange,
  errors,
  ...rest
}) => {
  return (
    <FormControl error={errors && errors[name] ? true : false}>
      <FormControlLabel
        control={<MuiCheckbox />}
        label={label}
        name={name}
        color={color}
        checked={value}
        onChange={(e) => onChange(convert(e, name))}
        {...rest}
      />
      <FormHelperText>{errors && errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default Checkbox;
