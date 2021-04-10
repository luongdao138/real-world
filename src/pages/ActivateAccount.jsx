import React from 'react';
import * as common from '../common';
import { useRouteMatch } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { activate } from '../redux/actions/currentUser';
import { useDispatch } from 'react-redux';

const ActiveAccount = () => {
  const { token } = useRouteMatch().params;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(activate(token));
  };
  return (
    <>
      <Typography variant='h4'>
        Please click the button below to activate your account!
      </Typography>
      <common.Button
        text='Activate'
        variant='outlined'
        color='secondary'
        onClick={handleClick}
      />
    </>
  );
};

export default ActiveAccount;
