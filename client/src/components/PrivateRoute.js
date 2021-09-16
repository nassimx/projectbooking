import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...rest }) => {
  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  // console.log(rest);
  return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
};
export default PrivateRoute;
