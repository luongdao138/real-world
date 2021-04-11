import React from 'react';
import { Pagination as MuiPagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pag: {
    margin: `${theme.spacing(3)}px 0`,
  },
  wrapper: { display: 'flex', justifyContent: 'flex-end' },
}));

const Pagination = ({ count, color, onChange, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <MuiPagination
        className={classes.pag}
        count={count}
        color={color}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default Pagination;
