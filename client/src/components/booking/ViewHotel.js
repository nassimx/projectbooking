import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { read } from '../../redux/actions/hotel';
import { getSessionId } from '../actions/stripe';
import { loadStripe } from '@stripe/stripe-js';
//
const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadSellerHotel();
  }, []);
  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    // console.log(res);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!auth) history.push('/login');
    // console.log(auth.token, match.params.hotelId);
    let res = await getSessionId(auth.token, match.params.hotelId);
    // console.log('get sessionid resposne', res.data.sessionId);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_key);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };
  return (
    <div>
      <h1>{hotel.title}</h1>
      <h3>{hotel.content}</h3>
      <img src={image} alt="" />
      <h5>{hotel.price}</h5>
      <i>Posted by {hotel.postedBy && hotel.postedBy.firstname} </i>
      <br />
      <Button onClick={handleClick} disabled={loading}>
        {loading
          ? 'Loading ...'
          : auth && auth.token
          ? 'Book Now'
          : 'Login to Book'}
      </Button>
    </div>
  );
};

export default ViewHotel;
