import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import dashboardStyles from '../DashboardSyles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core';
import ListItems from './list-item';

/**
 * @author
 * @function Sidebar
 **/
//
export default function Sidebar({ onClose, open }) {
  const classes = dashboardStyles();
  const theme = useTheme();
  //
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <ListItems />
    </Drawer>
  );
}
