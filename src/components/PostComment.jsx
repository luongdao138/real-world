import { makeStyles, Typography, IconButton } from '@material-ui/core';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common';
import userLogo from '../user.png';
import * as actions from '../redux/actions/post';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // padding: '12px',
    width: '60%',
    margin: '40px auto',
    [theme.breakpoints.down('xs')]: { width: '100%' },
    '& img': {
      width: '40px',
      height: '40px',
      objectFit: 'cover',
      borderRadius: '50%',
    },
  },
  textarea: {
    outline: 'none',
    border: '1px solid rgba(0,0,0, 0.1)',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    fontFamily: 'Roboto',
    height: '80px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    padding: '8px',
  },
  comments: {
    '& .wrapper': {
      // width: '100%',
      border: '1px solid rgba(0, 0 ,0 , 0.1)',
      margin: '20px auto',
      // padding: '16px',
      '& .content': {
        borderBottom: '1px solid rgba(0, 0 ,0 , 0.1)',
        padding: '12px',
      },
      '& .author': {
        padding: '12px',
        position: 'relative',
        '& .info': {
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
        },
        '& .username': {
          letterSpacing: '3px',
          fontWeight: 600,
          marginLeft: '4px',
          color: '#617d98',
        },
        '& .date': {
          letterSpacing: '2px',
          fontSize: '10px',
          marginTop: '4px',
          fontWeight: 600,
          color: '#2caeba',
        },
      },
    },
  },
}));

const PostComment = ({ total, current, comments }) => {
  const classes = useStyles();
  const container = useRef();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.item);
  const user = useSelector((state) => state.currentUser.info);
  const token = useSelector((state) => state.currentUser.token);

  const handlePostComment = () => {
    const content = container.current.value;
    if (content) {
      dispatch(actions.postComment({ content }, post._id, token));
    }
  };

  const handleLoadComment = () => {
    dispatch(actions.loadMoreComment(post._id, current + 10));
  };

  const handleDeleteComment = (id) => {
    dispatch(actions.deleteComment(id, token));
  };

  return (
    <div style={{ padding: '12px' }}>
      <div className={classes.wrapper}>
        <textarea
          className={classes.textarea}
          style={{ resize: 'none' }}
          placeholder='Write your comment...'
          ref={container}
        ></textarea>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '10px',
          }}
        >
          <Button
            color='secondary'
            text='Post comment'
            style={{ textTransform: 'none' }}
            onClick={handlePostComment}
          />
        </div>

        <div className={classes.comments}>
          {comments.map((comment) => {
            return (
              <article key={comment._id} className='wrapper'>
                <div className='content'>
                  <Typography>{comment.content}</Typography>
                </div>
                <div className='author'>
                  <div className='info'>
                    {comment.creator.image ? (
                      <img src={comment.creator.image} alt='' />
                    ) : (
                      <img src={userLogo} alt='' />
                    )}
                    <span className='username'>{comment.creator.username}</span>
                  </div>
                  <span className='date'>{comment.createdAt}</span>
                  {comment.creator._id === user._id && (
                    <IconButton
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                      }}
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '10px',
          }}
        >
          {current < total && (
            <Button
              color='secondary'
              text='Read more'
              variant='text'
              style={{ textTransform: 'none' }}
              onClick={handleLoadComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
