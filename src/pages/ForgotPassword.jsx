import React from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { Form, useForm } from '../hooks/useForm';
import * as common from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/actions/currentUser';
import { useHistory } from 'react-router-dom';
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
};

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector(
    (state) => state.currentUser.forgotPasswordMessage
  );
  const error = useSelector((state) => state.currentUser.forgotPasswordError);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const user = useSelector((state) => state.currentUser.info);
  const validate = (fieldValues) => {
    let temp = {};

    const { email } = fieldValues;

    if (email !== undefined) {
      if (email.trim().length === 0) temp.email = 'Email is required!';
      else if (!/\S+@\S+\.\S+/.test(email.trim()))
        temp.email = 'Email is not valid!';
    } else {
      errors.email && (temp.email = errors.email);
    }

    setErrors({ ...temp });

    return Object.keys(temp).length === 0;
  };
  const { values, setValues, errors, setErrors, handleChange } = useForm(
    initValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      dispatch(forgotPassword(values.email, history));
    }
  };

  if (isLoading) return <Loader />;

  // if (message !== '' && !user)
  //   return (
  //     <Typography variant='h4'>
  //       Email has been sent. Please check your email to reset the password.
  //     </Typography>
  //   );

  return (
    <Paper className={classes.paper}>
      <Form title='Enter your email'>
        <common.Input
          label='Email'
          fullWidth
          name='email'
          value={values.email}
          onChange={handleChange}
          errors={errors}
          autoFocus
        />
      </Form>
      <span style={{ color: 'red', fontWeight: '500', fontSize: '12px' }}>
        {error}
      </span>
      <span style={{ color: 'green', fontWeight: '500', fontSize: '12px' }}>
        {message}
      </span>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <common.Button
          text='Reset password'
          size='small'
          type='submit'
          color='secondary'
          disabled={message !== ''}
          onClick={handleSubmit}
        />
      </div>
    </Paper>
  );
};

export default ForgotPassword;
