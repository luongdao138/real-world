import { Typography } from '@material-ui/core';
import React from 'react';
import Post from '../components/Post';

const PostList = ({ postList }) => {
  if (postList.length === 0) {
    return <Typography variant='subtitle1'>No posts here</Typography>;
  }
  return (
    <>
      {postList.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </>
  );
};

export default PostList;
