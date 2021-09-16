import React from 'react';
import Layout from './layout/Layout';
import ConnectNav from './Stripe/connectNav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Account from './account/account';
import Bookinglist from '../bookinglist/bookinglist';
import Hotels from '../hotels/HotelsList';
// import Home from '../booking/Home';
import { menuItems } from './sidebar/list-item';
//

const Dashboard = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/dashboard">
            <ConnectNav />
          </Route>
          <Route exact path="/dashboard/account">
            <Account />
          </Route>
          <Route exact path="/dashboard/bookinglist">
            <Bookinglist />
          </Route>
          <Route exact path="/dashboard/hotels">
            <Hotels params={undefined} />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default Dashboard;
