import { makeStyles, Typography, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userLogo from '../user.png';
import { Button } from '../common';

const useStyles = makeStyles((theme) => ({
  section: {
    background: '#212121',
    color: 'white',
    padding: '20px',
    '& .btn': {
      textTransform: 'none',
      marginRight: '8px',
    },
    '& img': {
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginRight: theme.spacing(2),
    },
    // '& .info': {
    //   display: 'flex',
    //   alignItems: 'center',
    // },
    '& .username': {
      letterSpacing: '3px',
    },
    '& .date': {
      letterSpacing: '2px',
      fontSize: '10px',
      marginTop: '4px',
    },
    '& .title': {
      fontSize: '35px',
      fontWeight: 500,
      letterSpacing: '2px',
      marginBottom: '12px',
    },
  },
}));

const PostHeader = ({ post, isOwn }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Typography variant='h4' className='title'>
        {post.title}
      </Typography>
      <Grid className='info' container spacing={2} alignItems='center'>
        <Grid container item xs={12} sm={6} alignItems='center'>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {post.creator && post.creator.image ? (
                <img src={post.creator.image} />
              ) : (
                <img src={userLogo} alt='' />
              )}
              <div>
                <Typography variant='subtitle1' className='username'>
                  {post.creator && post.creator.username}
                </Typography>
                <Typography variant='subtitle2' className='date'>
                  {post && post.createdAt}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {isOwn && (
            <>
              <Button
                className='btn'
                variant='outlined'
                color='primary'
                text='Edit post'
              />
              <Button
                className='btn'
                variant='outlined'
                color='secondary'
                text='Delete post'
              />
            </>
          )}
        </Grid>
      </Grid>
    </section>
  );
};

export default PostHeader;
