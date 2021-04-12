import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { loadUserInfo } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  makeStyles,
  Card,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import userLogo from '../user.png';
import Loader from '../components/Loader';
import DraftsIcon from '@material-ui/icons/Drafts';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Post from '../components/Post';
import * as actions from '../redux/actions/user';

const useStyles = makeStyles((theme) => ({
  btn_wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '12px',
    [theme.breakpoints.down('xs')]: { justifyContent: 'center' },
  },

  header: {
    padding: '24px',
    '& .info': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    '& img': {
      width: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    '& .username': {
      marginTop: '8px',
      letterSpacing: '4px',
      fontWeight: 500,
      color: '#617d98',
    },
  },
  card: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    '& .icon': {
      marginRight: '16px',
    },
    '& .label': {
      fontWeight: 500,
      letterSpacing: '1px',
      color: '#617d98',
    },
  },
  user_wrapper: {
    '& .item': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      '& img': {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginRight: '12px',
      },
      '& .username': {
        color: '#102a42',
        fontWeight: 600,
        letterSpacing: '2px',
      },
      '& .email': {
        color: '#0e7c86',
        letterSpacing: '2px',
      },
    },
  },
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

const User = () => {
  const { id } = useRouteMatch().params;
  const classes = useStyles();
  const dispatch = useDispatch();
  // const tab =
  const {
    info,
    followers,
    following,
    posts,
    favoritePosts,
    isOwn,
    isFollowed,
  } = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const [tab, setTab] = useState('personal');
  const token = useSelector((state) => state.currentUser.token);

  useEffect(() => {
    dispatch(loadUserInfo(id));
  }, [id]);

  const handleChangeTab = (value) => {
    if (value !== tab) {
      if (value === 'personal') {
        dispatch(actions.loadPersonalPosts(info._id));
        setTab('personal');
      } else {
        dispatch(actions.loadFavoritePosts(info._id));
        setTab('favorite');
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <section className={classes.header}>
        <div className='info'>
          {info.image ? (
            <img src={info.image} alt='' />
          ) : (
            <img src={userLogo} alt='' />
          )}
          <Typography variant='h4' className='username'>
            {' '}
            {info.username}{' '}
          </Typography>
        </div>
        <div className={classes.btn_wrapper}>
          {isOwn ? (
            <Button
              variant='outlined'
              color='secondary'
              style={{ textTransform: 'none' }}
            >
              Edit Profile Settings
            </Button>
          ) : isFollowed ? (
            <Button
              variant='outlined'
              color='secondary'
              style={{ textTransform: 'none' }}
              onClick={() => dispatch(actions.unfollow(id, token))}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => dispatch(actions.follow(id, token))}
              style={{ textTransform: 'none' }}
            >
              Follow
            </Button>
          )}
        </div>
      </section>
      <section>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <DraftsIcon className='icon' />
              <Typography variant='subtitle1' className='label'>
                {posts && posts.length} posts
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <FavoriteIcon className='icon' />
              <Typography variant='subtitle1' className='label'>
                {favoritePosts && favoritePosts.length} Favorite Posts
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <PersonIcon className='icon' />
              <Typography variant='subtitle1' className='label'>
                {followers && followers.length} Followers
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <PersonAddIcon className='icon' />
              <Typography variant='subtitle1' className='label'>
                {following && following.length} Following
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </section>
      <section>
        <Grid container spacing={2} style={{ margin: '32px 0' }}>
          <Grid item xs={12} sm={6} className={classes.user_wrapper}>
            <Card
              style={{ maxHeight: '300px', overflow: 'auto', padding: '12px' }}
            >
              <Typography variant='h5' gutterBottom>
                Following
              </Typography>
              {following &&
                following.map((user) => {
                  return (
                    <article key={user._id} className='item'>
                      <div>
                        {user.image ? (
                          <img src={user.image} alt='' />
                        ) : (
                          <img src={userLogo} alt='' />
                        )}
                      </div>
                      <div>
                        <Typography variant='body1' className='username'>
                          {user.username}
                        </Typography>
                        <Typography className='email' variant='body1'>
                          {user.email}
                        </Typography>
                      </div>
                    </article>
                  );
                })}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.user_wrapper}>
            <Card
              style={{ maxHeight: '300px', overflow: 'auto', padding: '12px' }}
            >
              <Typography variant='h5' gutterBottom>
                Followers
              </Typography>
              {followers &&
                followers.map((user) => {
                  return (
                    <article key={user._id} key={user._id} className='item'>
                      <div>
                        {user.image ? (
                          <img src={user.image} alt='' />
                        ) : (
                          <img src={userLogo} alt='' />
                        )}
                      </div>
                      <div>
                        <Typography variant='body1' className='username'>
                          {user.username}
                        </Typography>
                        <Typography variant='body1' className='email'>
                          {user.email}
                        </Typography>
                      </div>
                    </article>
                  );
                })}
            </Card>
          </Grid>
        </Grid>
      </section>
      <section>
        <ul className={classes.ul}>
          <li
            className={tab === 'personal' ? classes.active : undefined}
            onClick={() => handleChangeTab('personal')}
          >
            Personal posts
          </li>
          <li
            className={tab === 'favorite' ? classes.active : undefined}
            onClick={() => handleChangeTab('favorite')}
          >
            Favorite posts
          </li>
        </ul>

        {tab === 'personal' ? (
          <Paper>
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Paper>
        ) : (
          <Paper>
            {favoritePosts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Paper>
        )}
      </section>
    </>
  );
};

export default User;
