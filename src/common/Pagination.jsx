import React from 'react';
import { Pagination as MuiPagination, PaginationItem } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pag: {
    margin: `${theme.spacing(3)}px 0`,
  },
  wrapper: { display: 'flex', justifyContent: 'flex-end' },
}));

const Pagination = ({ count, color, currentPage, onChange, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <MuiPagination
        page={currentPage}
        className={classes.pag}
        count={count}
        color={color}
        onChange={onChange}
        {...rest}
      />
      {/* <MuiPagination
        page={2}
        count={10}
        renderItem={(item) => {
          return <PaginationItem {...item} />;
        }}
      /> */}
    </div>
  );
};

export default Pagination;
