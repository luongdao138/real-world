import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

export const useForm = (initValues, validateOnchange = false, validate) => {
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnchange) console.log(validate({ [name]: value }));
  };

  const resetForm = () => {
    setValues(initValues);
    setErrors({});
  };

  return { values, errors, handleChange, setValues, resetForm, setErrors };
};

const useStyles = makeStyles((theme) => ({
  form: {
    // width: '60%',
    // margin: 'auto',
    // [theme.breakpoints.down('sm')]: {
    //   width: '90%',
    // },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export const Form = ({ title, children, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h4' className={classes.title}>
        {title}
      </Typography>
      <form className={classes.form} {...rest}>
        {children}
      </form>
    </>
  );
};
