import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import PostAddIcon from '@material-ui/icons/PostAdd';

import { NavLink, useLocation } from 'react-router-dom';

import React from 'react';
import dashboardStyles from '../DashboardSyles';
import Dashboard from '../Dashboard';
import Account from '../account/account';
import Bookinglist from '../../bookinglist/bookinglist';
import HotelsList from '../../hotels/HotelsList';

export const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    component: Dashboard,
    to: '/dashboard',
    exact: true,
  },
  {
    text: 'Account',
    icon: <AccountCircleIcon />,
    to: '/dashboard/account',
    component: Account,
    exact: true,
  },
  {
    text: 'My Booking List',
    icon: <ViewListIcon />,
    to: '/dashboard/bookinglist',
    component: Bookinglist,
    exact: true,
  },
  {
    text: 'All Hotels',
    icon: <PostAddIcon />,
    to: '/dashboard/hotels',
    component: HotelsList,
    exact: true,
  },
];
const ListItems = () => {
  const classes = dashboardStyles();

  const location = useLocation();

  return (
    <div>
      <List>
        {menuItems.map((menuItem) => (
          <ListItem
            component={NavLink}
            to={menuItem.to}
            exact={menuItem.exact}
            button
            key={menuItem.text}
            className={
              location.pathname === menuItem.to ? classes.active : null
            }
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListItems;
