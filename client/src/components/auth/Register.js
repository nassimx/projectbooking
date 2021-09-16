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
import { toast } from 'react-toastify';
import RegiserForm from '../../components/forms/RegisterForm';

//
import { registerUser } from '../../redux/actions/userAction';

// import axios from 'axios';
// import { useDispatch } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ history }) => {
  //styles
  const classes = useStyles();
  //states
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adresse, setAdresse] = useState('');
  const [phone, setPhone] = useState('');
  // functions
  const handleChangefn = (e) => {
    setFirstname(e.target.value);
  };
  const handleChangeln = (e) => {
    setLastname(e.target.value);
  };
  const handleChangee = (e) => {
    setEmail(e.target.value);
  };
  const handleChangep = (e) => {
    setPassword(e.target.value);
  };
  const handleChangea = (e) => {
    setAdresse(e.target.value);
  };
  const handleChangeph = (e) => {
    setPhone(e.target.value);
  };
  // const dispatch = useDispatch();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(
  //       registerUser({ firstname, lastname, email, password, adresse, phone })
  //     );
  //   } catch (error) {
  //     if (error.response.status === 400) toast.error(error.response.data);
  //     if (error.response.status === 200) toast.error(error.response.data);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        firstname,
        lastname,
        email,
        password,
        adresse,
        phone,
      });
      // console.log('REGISTER USER ===> ', res);
      toast.success('Register success. Please login.');
      history.push('/login');
    } catch (err) {
      // console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
      history.push('/register');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <RegiserForm
          firstname={firstname}
          handleChangefn={handleChangefn}
          lastname={lastname}
          handleChangeln={handleChangeln}
          email={email}
          handleChangee={handleChangee}
          password={password}
          handleChangep={handleChangep}
          adresse={adresse}
          handleChangea={handleChangea}
          phone={phone}
          handleChangeph={handleChangeph}
          handleSubmit={handleSubmit}
        />
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
