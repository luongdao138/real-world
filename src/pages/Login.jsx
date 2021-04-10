import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useForm, Form } from '../hooks/useForm';
import * as common from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/currentUser';
import { Redirect, Link } from 'react-router-dom';
import Loader from '../components/Loader';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '24px',
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: { width: '50%', margin: '48px auto' },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

const initValues = {
  email: '',
  password: '',
};

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.currentUser.errorMessage);
  const user = useSelector((state) => state.currentUser.info);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);

  const validate = (fieldValues) => {
    let temp = {};
    const { email, password } = fieldValues;

    if (email !== undefined) {
      if (email.trim().length === 0) temp.email = 'Email is required!';
      else if (!/\S+@\S+\.\S+/.test(email.trim()))
        temp.email = 'Email is not valid!';
    } else {
      errors.email && (temp.email = errors.email);
    }

    if (password !== undefined) {
      if (password.trim() === '') temp.password = 'Password is required!';
      else if (password.trim().length < 6)
        temp.password = 'Password must be at least 6 characters';
      else if (password.trim().length > 50)
        temp.password = 'Password must not be more than 50 characters';
    } else {
      errors.password && (temp.password = errors.password);
    }

    setErrors({ ...temp });
    return Object.keys(temp).length === 0;
  };

  const { values, handleChange, setErrors, errors } = useForm(
    initValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      dispatch(login(values));
    }
  };

  if (isLoading) return <Loader />;

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Paper className={classes.paper}>
      <Form title='Login Form'>
        <common.Input
          fullWidth
          autoFocus
          errors={errors}
          label='Email'
          name='email'
          onChange={handleChange}
          value={values.email}
        />
        <common.Input
          errors={errors}
          fullWidth
          name='password'
          label='Password'
          type='password'
          onChange={handleChange}
          value={values.password}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/user/forgotPassword' className={classes.link}>
            Forgot password
          </Link>
          <common.Button
            text='Login'
            size='large'
            type='submit'
            onClick={handleSubmit}
          />
        </div>
        <span style={{ color: 'red', fontWeight: '500', fontSize: '12px' }}>
          {errorMessage}
        </span>
      </Form>
    </Paper>
  );
};

export default Login;
