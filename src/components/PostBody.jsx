import { makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  section: {
    padding: '20px',
    border: '1px solid rgba(0, 0 ,0 , 0.1)',
    '& .content': {
      letterSpacing: '1px',
      fontWeight: '400',
    },
    '& .tagsWrapper': {
      marginTop: theme.spacing(2),
    },
  },
}));
const PostBody = ({ post }) => {
  const classes = useStyles();
  return (
    <div style={{ padding: '12px' }}>
      <section className={classes.section}>
        <Typography className='content'>{post.content}</Typography>
        <div className='tagsWrapper'>
          {post &&
            post.tags &&
            post.tags.map((tag, index) => {
              return (
                <Button
                  variant='outlined'
                  color='secondary'
                  key={index}
                  size='small'
                  style={{ textTransform: 'none', marginRight: '8px' }}
                >
                  {tag}
                </Button>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default PostBody;
