import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountStatus } from '../../actions/stripe';
import { updateUserInLocalStorage } from '../../actions/auth';
import Box from '@material-ui/core/Box';

//

const StripeCallback = ({ history }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth && auth.token) accountStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      // console.log('USER ACCOUNT STATUS ON STRIPE CALLBACK', res);
      //update User In Local Storage
      updateUserInLocalStorage(res.data, () => {
        // update user in redux
        dispatch({ type: 'LOGGED_IN_USER', payload: res.data });
      });
      // redirect user to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default StripeCallback;
