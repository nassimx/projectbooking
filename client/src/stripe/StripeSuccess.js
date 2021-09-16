import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stripeSuccessRequest } from '../components/actions/stripe';

const StripeSuccess = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  // const { token } = auth;

  useEffect(() => {
    // console.log(
    //   'send this hotelid to backend to crate order',
    //   match.params.hotelId
    // );
    stripeSuccessRequest(token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        console.log('stripe success response', res.data);
        history.push('/dashboard');
      } else {
        history.push('/stripe/cancel');
      }
    });
  }, [match.params.hotelId]);
  return (
    <div>
      <h1>Payment success. {match.params.hotelId}</h1>
    </div>
  );
};

export default StripeSuccess;
