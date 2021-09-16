import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import ScrollNav from '../ScrollNav';
///
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'black',
  },
  title: {
    flex: 1,
    textDecoration: 'none',
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: 'black',
    },
  },
  name: {
    fontStyle: 'bold',
    fontSize: 30,
  },
  NavBar: {
    zIndex: 1,
    marginBottom: 0,
    backgroundColor: '#8AABBA',
  },
  Button: {
    textDecoration: 'none',
    margin: '0 6px 0',
    display: 'inline-block',
  },
  Logout: {
    color: 'red',
  },
}));

const Navbar = () => {
  //

  const classes = useStyles();
  const dispatch = useDispatch();
  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  // remove auth from local_storage
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.removeItem('auth');
    history.push('/login');
  };

  return (
    <AppBar className={classes.NavBar} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={classes.title}>
          <Typography variant="h6" noWrap>
            <span className={classes.name}>Travely</span>
          </Typography>
        </Link>

        {auth !== null && (
          <>
            <Link to="/dashboard" className={classes.Button}>
              <Button className={classes.Button}>dashboard</Button>
            </Link>
          </>
        )}
        {/* login logout */}
        {auth !== null && (
          <a href=" " onClick={logout} className={classes.Button}>
            <Button variant="outlined" className={classes.Logout}>
              logout
            </Button>
          </a>
        )}

        {auth === null && (
          <>
            <Link to="/login" className={classes.Button}>
              <Button className={classes.Button}>Login</Button>
            </Link>
            <Link to="/register" className={classes.Button}>
              <Button variant="outlined" className={classes.Button}>
                Register
              </Button>
            </Link>{' '}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
