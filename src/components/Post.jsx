import { makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import userLogo from '../user.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLike } from '../redux/actions/postList';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1.5),
    '& img': {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '50%',
      marginRight: theme.spacing(2),
    },
    '& .username': {
      fontSize: '16px',
    },
    '& .username': {
      fontSize: '18px',
      fontWeight: 600,
      letterSpacing: '2px',
    },
    '& .date': {
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '1px',
      opacity: 0.7,
      marginBottom: '4px',
    },
  },
  body: {
    '& .title': {
      color: '#617d98',
      letterSpacing: '1px',
      marginBottom: '4px',
    },
    '& .subject': { fontSize: '14px', letterSpacing: '1px', color: '#324d67' },
  },
  grow: { flexGrow: 1 },
  tags: {
    marginBottom: '12px',
    '& span': {
      border: `1px solid ${theme.palette.secondary.main}`,
      padding: '2px 4px',
      fontSize: '12px',
      borderRadius: '4px',
      marginRight: '6px',
      color: theme.palette.secondary.main,
    },
  },
  action: { display: 'flex', justifyContent: 'flex-end' },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.currentUser.token);
  const {
    _id,
    title,
    subject,
    likeCount,
    createdAt,
    tags,
    creator: { username, image },
  } = post;
  return (
    <article
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '16px 12px',
      }}
    >
      <div className={classes.header}>
        <img src={image ? image : userLogo} alt='' />
        <div className='info'>
          <Link to='/'>
            <Typography
              variant='subtitle1'
              color='primary'
              className='username'
            >
              {username}
            </Typography>
          </Link>
          <Typography className='date' variant='subtitle1'>
            {createdAt}
          </Typography>
        </div>
        <div className={classes.grow}></div>
        <Button
          size='small'
          color='primary'
          className='like'
          variant='outlined'
          disabled={token ? false : true}
          onClick={() => dispatch(updateLike(_id, token))}
        >
          <FavoriteIcon fontSize='small' />
          {likeCount}
        </Button>
      </div>
      <div className={classes.body} style={{ marginBottom: '12px' }}>
        <Link to='/'>
          <Typography variant='h5' className='title'>
            {title}
          </Typography>
        </Link>
        <Typography variant='body1' className='subject'>
          {subject}
        </Typography>
      </div>
      <div className={classes.tags}>
        {tags.map((tag, index) => {
          return (
            <Link to='/' key={index}>
              <span>{tag}</span>
            </Link>
          );
        })}
      </div>
      <div className={classes.action}>
        <Button
          style={{ textTransform: 'none' }}
          variant='outlined'
          color='secondary'
          size='small'
        >
          Read more
        </Button>
      </div>
    </article>
  );
};

export default Post;
