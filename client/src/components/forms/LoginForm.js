import React from 'react';
import {
  Grid,
  Button,
  Link,
  TextField,
  Checkbox,
  makeStyles,
  FormControlLabel,
} from '@material-ui/core';
//

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//
const LoginForm = ({
  email,
  handleChangeemail,
  password,
  handleChangepass,
  handleSubmit,
}) => {
  //
  const classes = useStyles();

  return (
    <div>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={handleChangeemail}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          value={password}
          onChange={handleChangepass}
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!email || !password}
        >
          Log In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/#forget" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
