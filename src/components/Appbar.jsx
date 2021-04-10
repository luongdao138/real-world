import {
  AppBar,
  makeStyles,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../redux/actions/currentUser';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '120px',
  },
  list: {
    flexDirection: 'row',
    display: 'flex',
    [theme.breakpoints.down('xs')]: { display: 'none' },
  },
  icon: {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.common.white,
    },
    minWidth: '30px',
  },
  text: { color: '#fff' },
  grow: {
    flexGrow: 1,
  },
  menu: {
    color: '#fff',
    [theme.breakpoints.up('sm')]: { display: 'none' },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: { display: 'none' },
  },
}));

const Appbar = ({ user, token }) => {
  const classes = useStyles();
  const home = useSelector((state) => state.home);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <div>
            <img className={classes.img} src={logo} alt='' />
          </div>
          <div className={classes.grow}></div>
          <IconButton
            className={classes.menu}
            onClick={() => {
              setOpen((open) => !open);
            }}
          >
            <MenuIcon fontSize='large' />
          </IconButton>
          {user ? (
            <List className={classes.list}>
              <ListItem component={Link} to='/'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Home</ListItemText>
              </ListItem>
              <ListItem component={Link} to='/post/new'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>New post</ListItemText>
              </ListItem>
              <ListItem component={Link} to='/user/setting'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Setting</ListItemText>
              </ListItem>
              <ListItem
                component='a'
                href='/user/logout'
                onClick={handleLogout}
              >
                <ListItemIcon classes={{ root: classes.icon }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Logout</ListItemText>
              </ListItem>
            </List>
          ) : (
            <List className={classes.list}>
              <ListItem component={Link} to='/'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Home</ListItemText>
              </ListItem>
              <ListItem component={Link} to='/user/login'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Login</ListItemText>
              </ListItem>
              <ListItem component={Link} to='/user/signup'>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}>Signup</ListItemText>
              </ListItem>
            </List>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        className={classes.drawer}
        onBackdropClick={() => setOpen(false)}
      >
        {user ? (
          <List style={{ padding: '16px 50px 16px 16px' }}>
            <ListItem component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Home</ListItemText>
            </ListItem>
            <ListItem component={Link} to='/post/new'>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>New post</ListItemText>
            </ListItem>
            <ListItem component={Link} to='/user/setting'>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Setting</ListItemText>
            </ListItem>
            <ListItem component='a' href='/user/logout' onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Logout</ListItemText>
            </ListItem>
          </List>
        ) : (
          <List style={{ padding: '16px 50px 16px 16px' }}>
            <ListItem component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Home</ListItemText>
            </ListItem>
            <ListItem component={Link} to='/user/login'>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Login</ListItemText>
            </ListItem>
            <ListItem component={Link} to='/user/signup'>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText style={{ color: '#333' }}>Signup</ListItemText>
            </ListItem>
          </List>
        )}
      </Drawer>
    </>
  );
};

export default Appbar;
