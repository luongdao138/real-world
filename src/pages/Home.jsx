import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions/postList';
import PostList from '../components/PostList';
import { Grid, Paper } from '@material-ui/core';
import Loader from '../components/Loader';
import * as common from '../common';

const Home = () => {
  const token = useSelector((state) => state.currentUser.token);
  const tab = useSelector((state) => state.home.tab);
  const { items, itemsPerPage, currentPage, postCount } = useSelector(
    (state) => state.postList
  );
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const count = Math.ceil(postCount / itemsPerPage);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handlePageChange = (e, page) => {
    if (page !== currentPage) {
      if (tab === 'personal')
        dispatch(actions.loadPersonalPost(page, itemsPerPage, token));
      else dispatch(actions.loadGlobalPost(page, itemsPerPage));
    }
    setPage(page);
  };

  useEffect(() => {
    if (token) {
      dispatch(actions.loadPersonalPost(1, itemsPerPage, token));
    } else {
      dispatch(actions.loadGlobalPost(1, itemsPerPage));
    }
  }, [token]);

  return (
    <div>
      <Nav setPage={setPage} />
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Paper
            style={{ display: isLoading ? 'none' : 'block', padding: '20px' }}
          >
            <PostList postList={items} />
            {items.length > 0 && (
              <common.Pagination
                count={count}
                color='primary'
                currentPage={page}
                onChange={handlePageChange}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    </div>
  );
};

export default Home;
