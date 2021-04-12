import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import Loader from '../components/Loader';
import PostBody from '../components/PostBody';
import PostComment from '../components/PostComment';
import PostHeader from '../components/PostHeader';
import { loadPost } from '../redux/actions/post';

const PostDetail = () => {
  const { id } = useRouteMatch().params;
  const dispatch = useDispatch();
  const { item, isOwn, comments } = useSelector((state) => state.post);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const user = useSelector((state) => state.currentUser.info);

  useEffect(() => {
    dispatch(loadPost(id));
  }, [id]);

  if (!user) return <Redirect to='/' />;

  if (isLoading) return <Loader />;
  return (
    <Paper>
      <PostHeader post={item} isOwn={isOwn} />
      <PostBody post={item} />
      <PostComment
        comments={comments.items}
        current={comments.current}
        total={comments.total}
      />
    </Paper>
  );
};

export default PostDetail;
