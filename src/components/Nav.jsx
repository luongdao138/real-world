import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { loadGlobalPost, loadPersonalPost } from '../redux/actions/postList';

const useStyles = makeStyles((theme) => ({
  ul: {
    display: 'flex',
    listStyle: 'none',
    padding: '0',
    '& li': {
      padding: theme.spacing(2),
      cursor: 'pointer',
      fontWeight: '600',
    },
  },
  active: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
}));

const Nav = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.currentUser.token);
  const limit = useSelector((state) => state.postList.itemsPerPage);
  const tab = useSelector((state) => state.home.currentTab);
  const dispatch = useDispatch();

  const handleChangeTab = (value) => {
    if (value !== tab) {
      if (value === 'global') {
        dispatch(loadGlobalPost(1, limit));
      } else {
        dispatch(loadPersonalPost(1, limit, token));
      }
    }
  };

  return (
    <ul className={classes.ul}>
      {token && (
        <li
          className={tab === 'personal' ? classes.active : undefined}
          onClick={() => handleChangeTab('personal')}
        >
          Your Feed
        </li>
      )}
      <li
        className={tab === 'global' ? classes.active : undefined}
        onClick={() => handleChangeTab('global')}
      >
        Global Feed
      </li>
    </ul>
  );
};

export default Nav;
