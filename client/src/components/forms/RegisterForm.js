import React from 'react';
import {
  Grid,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Button,
} from '@material-ui/core';
//

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
//
const RegiserForm = ({
  firstname,
  handleChangefn,
  lastname,
  handleChangeln,
  email,
  handleChangee,
  password,
  handleChangep,
  adresse,
  handleChangea,
  phone,
  handleChangeph,
  handleSubmit,
}) => {
  //
  const classes = useStyles();
  return (
    <div>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              value={firstname}
              onChange={handleChangefn}
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              // inputRef={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastname}
              onChange={handleChangeln}
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleChangee}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handleChangep}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="adresse"
              label="Address"
              name="adresse"
              value={adresse}
              onChange={handleChangea}
              autoComplete="adresse"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={phone}
              onChange={handleChangeph}
              autoComplete="phone"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={
            !email || !password || !adresse || !phone || !firstname || !lastname
          }
        >
          Register
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Log In
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegiserForm;
