import React, { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  Link,
  Box,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//
import { loginUser } from '../../redux/actions/userAction';
import LoginForm from '../forms/LoginForm';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://Travely.com/">
        Travely
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('SEND LOGIN DATA', { email, password });
    try {
      let res = await loginUser({ email, password });

      if (res.data) {
        // console.log('SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ');
        // console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem('auth', JSON.stringify(res.data));

        //save user and token to redux
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: res.data,
        });
        history.push('/dashboard');
      }
    } catch (err) {
      // console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
      history.push('/register');
    }
  };
  const handleChangeemail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangepass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <LoginForm
          handleSubmit={handleSubmit}
          handleChangeemail={handleChangeemail}
          handleChangepass={handleChangepass}
          email={email}
          password={password}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
