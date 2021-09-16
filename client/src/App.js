import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
// top navigtion bar
import Navbar from './components/Navbar/Navbar';
// components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/booking/Home';
import Dashboard from './components/User/Dashboard';
import Scroll from '../src/components/Scrolltotop';
import StripeCallback from './components/User/Stripe/StripeCallback';
import Edithotel from './components/hotels/edithotel';
import ViewHotel from './components/booking/ViewHotel';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';
//
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Scroll showBelow />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/hotel/:hotelId" component={ViewHotel} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/stripe/callback"
            component={StripeCallback}
          />
          <PrivateRoute
            exact
            path="/hotel/edit/:hotelId"
            component={Edithotel}
          />
          <PrivateRoute
            exact
            path="/stripe/success/:hotelId"
            component={StripeSuccess}
          />
          <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
