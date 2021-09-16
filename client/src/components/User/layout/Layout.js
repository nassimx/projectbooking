import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import dashboardStyles from '../DashboardSyles';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
//

function Sidedrawer(props) {
  const classes = dashboardStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const { auth } = useSelector((state) => ({ ...state }));

  // nav bar start
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header onClick={handleDrawerOpen} SidebarIsOpened={open} />
      <Sidebar open={open} onClose={handleDrawerClose} />
      {/* nav bar end */}
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
const Layout = (props) => {
  return <Sidedrawer>{props.children} </Sidedrawer>;
};

export default Layout;
