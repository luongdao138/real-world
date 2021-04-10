import React from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { Form, useForm } from '../hooks/useForm';
import * as common from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/currentUser';
import { useRouteMatch } from 'react-router-dom';
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
  password: '',
  cf_password: '',
};

const ResetPasssord = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  const message = useSelector(
    (state) => state.currentUser.resetPasswordMessage
  );
  const error = useSelector((state) => state.currentUser.resetPasswordError);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const validate = (fieldValues) => {
    let temp = {};

    const { password, cf_password } = fieldValues;

    if (password !== undefined) {
      if (password.trim().length === 0) temp.password = 'password is required!';
      else if (password.trim().length < 6)
        temp.password = 'password must not be less than 6 characters!';
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

    setErrors({ ...temp });

    return Object.keys(temp).length === 0;
  };
  const { values, errors, setErrors, handleChange } = useForm(
    initValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      dispatch(
        resetPassword({
          token: routeMatch.params.token,
          newPassword: values.password,
        })
      );
    }
  };

  if (isLoading) return <Loader />;

  if (message !== '')
    return (
      <Typography variant='h4'>
        Change password successfully. You can close this tab and login with your
        new password!
      </Typography>
    );

  return (
    <Paper className={classes.paper}>
      <Form title='Reset password'>
        <common.Input
          label='Password'
          fullWidth
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          errors={errors}
          autoFocus
        />
        <common.Input
          label='Confirm password'
          fullWidth
          type='password'
          name='cf_password'
          value={values.cf_password}
          onChange={handleChange}
          errors={errors}
          autoFocus
        />
      </Form>
      <span style={{ color: 'red', fontWeight: '500', fontSize: '12px' }}>
        {error}
      </span>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <common.Button
          text='Reset password'
          size='small'
          type='submit'
          color='secondary'
          onClick={handleSubmit}
        />
      </div>
    </Paper>
  );
};

export default ResetPasssord;
