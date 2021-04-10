import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { useForm, Form } from '../hooks/useForm';
import * as common from '../common';
import { signup } from '../redux/actions/currentUser';
import { useDispatch, useSelector } from 'react-redux';
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
  username: '',
  email: '',
  password: '',
  cf_password: '',
  image: '',
  short_bio: '',
  agree: false,
};

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.currentUser.signupMessage);
  const error = useSelector((state) => state.currentUser.signupError);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const user = useSelector((state) => state.currentUser.info);

  const validate = (fieldValues) => {
    let temp = {};
    const { email, password, cf_password, username, agree } = fieldValues;

    if (username !== undefined) {
      if (username.trim() === '') temp.username = 'Username is required!';
      else if (username.trim().length < 3)
        temp.username = 'Username must be at least 6 characters';
      else if (username.trim().length > 50)
        temp.username = 'Username must not be more than 50 characters';
    } else {
      errors.username && (temp.username = errors.username);
    }
    if (cf_password !== undefined) {
      if (cf_password.trim().length === 0)
        temp.cf_password = 'Confirm password is required!';
      else if (cf_password !== values.password)
        temp.cf_password = 'confirm password does not match!';
    } else {
      errors.cf_password && (temp.cf_password = errors.cf_password);
    }

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
    if (cf_password !== undefined) {
      if (cf_password.trim().length === 0)
        temp.cf_password = 'Confirm password is required!';
      else if (cf_password !== values.password)
        temp.cf_password = 'confirm password does not match!';
    } else {
      errors.cf_password && (temp.cf_password = errors.cf_password);
    }

    if (agree !== undefined) {
      if (!agree) temp.agree = 'You have not agreed with our terms!';
    } else {
      errors.agree && (temp.agree = errors.agree);
    }

    setErrors({ ...temp });
    return Object.keys(temp).length === 0;
  };

  const { values, handleChange, errors, setErrors } = useForm(
    initValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      const user = {
        username: values.username,
        password: values.password,
        email: values.email,
        short_bio: values.short_bio,
        image: values.image,
      };
      dispatch(signup(user));
    }
  };
  if (isLoading) return <Loader />;

  if (user) {
    return <Redirect to='/' />;
  }
  return (
    <Paper className={classes.paper}>
      <Form title='Signup Form'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <common.Input
              fullWidth
              required
              autoFocus
              errors={errors}
              label='Username'
              name='username'
              onChange={handleChange}
              value={values.username}
            />
            <common.Input
              fullWidth
              required
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
              required
              name='password'
              label='Password'
              type='password'
              onChange={handleChange}
              value={values.password}
            />
            <common.Input
              errors={errors}
              fullWidth
              required
              name='cf_password'
              label='Confirm password'
              type='password'
              onChange={handleChange}
              value={values.cf_password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <common.Input
              fullWidth
              autoFocus
              errors={errors}
              label='Image'
              name='image'
              onChange={handleChange}
              value={values.image}
            />
            <common.Input
              errors={errors}
              fullWidth
              name='short_bio'
              label='Short bio'
              onChange={handleChange}
              value={values.short_bio}
            />
            <common.Checkbox
              label='Agree with our terms?'
              name='agree'
              value={values.agree}
              errors={errors}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/user/login' className={classes.link}>
            Already have account
          </Link>
          <common.Button
            text='Signup'
            size='large'
            type='submit'
            errors={errors}
            onClick={handleSubmit}
          />
        </div>
        <span style={{ color: 'red', fontWeight: '500', fontSize: '12px' }}>
          {error}
        </span>
        <span style={{ color: 'green', fontWeight: '500', fontSize: '12px' }}>
          {message}
        </span>
      </Form>
    </Paper>
  );
};

export default Signup;
