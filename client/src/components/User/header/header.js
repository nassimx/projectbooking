import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import dashboardStyles from '../DashboardSyles';
import PropTypes from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = ({ SidebarIsOpened, onClick }) => {
  const classes = dashboardStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
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
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: SidebarIsOpened,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: SidebarIsOpened,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Dashboard
        </Typography>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography>
            <Button className={classes.Buttonhome}>Home</Button>
          </Typography>
        </Link>
        <Link to="/dashboard/account" style={{ textDecoration: 'none' }}>
          <Button>
            <Avatar> {user.firstname[0]}</Avatar>
            <Typography variant="h6" className={classes.Buttonhome}>
              {user.firstname}
            </Typography>
          </Button>
        </Link>
        <Typography
          variant="h6"
          onClick={logout}
          className={classes.Buttonlogout}
        >
          <Button className={classes.Buttonlogout} variant="outlined">
            <ExitToAppIcon />
            logout
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  SidebarIsOpened: PropTypes.bool,
};
