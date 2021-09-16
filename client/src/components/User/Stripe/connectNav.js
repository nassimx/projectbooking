import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { currencyFormatter, getAccountBalance } from '../../actions/stripe';
//
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    maxWidth: 450,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const ConnectNav = () => {
  const classes = useStyles();

  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Welecom back</h1>
      <br />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>{user.firstname[0]}</Avatar>
              }
              //   action={
              //     <IconButton aria-label="settings">
              //       <MoreVertIcon />
              //     </IconButton>
              //   }
              title={user.firstname}
              subheader={`joined ${moment(user.createdAt).fromNow()}`}
            />
            {/* <CardContent>
              <Typography variant="h5" component="p">
                This impressive
              </Typography>
            </CardContent> */}
            <CardActions disableSpacing>{/* hhhh */}</CardActions>
          </Card>
        </Grid>

        {auth &&
          auth.user &&
          auth.user.stripe_seller &&
          auth.user.stripe_seller.charges_enabled &&
          auth.user.stripe_seller.login_links && (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      Pending balace
                    </Typography>
                    <br />
                    <Typography variant="h4">
                      {balance &&
                        balance.pending &&
                        balance.pending.map((pb, i) => (
                          <span>{currencyFormatter(pb)}</span>
                        ))}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>{/* hhhh */}</CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      Payout settings
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>{/* hhhh */}</CardActions>
                </Card>
              </Grid>
            </>
          )}
      </Grid>
    </div>
  );
};

export default ConnectNav;
