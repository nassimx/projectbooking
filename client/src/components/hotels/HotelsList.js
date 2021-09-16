import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddHotel from './addhotel';
import HotelCard from './HotelCard';
import './style.css';
import { deleteHotel, sellerHotels } from '../../redux/actions/hotel';
import { useSelector } from 'react-redux';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { createConnectAccount } from '../actions/stripe';
import { toast } from 'react-toastify';

const HotelsList = ({ params }) => {
  //

  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  //all Hotels
  const [hotels, setHotels] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error('Stripe connect failed, Try again');
      setLoading(false);
    }
  };

  //
  useEffect(() => {
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm('Are you sure?')) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success('Hotel Deleted');
      loadSellersHotels();
    });
  };
  const [openadd, setOpenadd] = React.useState(false);

  const handleBtnAddHotel = () => {
    setOpenadd(true);
  };

  const handleCloseBtnAdd = () => {
    setOpenadd(false);
  };

  const [openedit, setOpenedit] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenedit(true);
  };

  const handleCloseEdit = () => {
    setOpenedit(false);
  };

  const connected = () => (
    <div>
      <Grid container justifyContent="center">
        <Button variant="contained" onClick={handleBtnAddHotel}>
          Add New Hotel
        </Button>
        <AddHotel openadd={openadd} handleCloseBtnAdd={handleCloseBtnAdd} />
      </Grid>
      {/* {JSON.stringify(hotels)} */}
    </div>
  );

  // @ts-ignore
  const notconnected = () => (
    <Grid container justifyContent="center">
      {/* <Button variant="contained" disabled>
        Disabled
      </Button> */}
      {/* <br /> */}
      <Card>
        <CardContent>
          <HomeOutlinedIcon color="primary" style={{ fontSize: 50 }} />
          <Typography variant="h6" component="h2">
            Setup payouts to post hotels rooms
          </Typography>
          <Typography variant="h5">
            Connect with stripe to transfer earnings to your bank account
          </Typography>

          <CardActions>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              size="medium"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Setup Payouts'}
            </Button>
          </CardActions>
          <Typography variant="body2" component="p">
            You'll be redirected to Stripe to complete the onboarding process.
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <>
      {/* <pre>{JSON.stringify(auth,null ,4)}</pre> */}
      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled &&
      auth.user.stripe_seller.login_links
        ? connected()
        : notconnected()}
      <br />
      <Grid container justifyContent="center">
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          // @ts-ignore
          <HotelCard
            h={h}
            key={h._id}
            handleHotelDelete={handleHotelDelete}
            handleClickOpenEdit={handleClickOpenEdit}
            handleCloseEdit={handleCloseEdit}
            openedit={openedit}
          />
        ))}
      </Grid>
    </>
  );
};

export default HotelsList;
