import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { diffDays } from '../../redux/actions/hotel';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
//
const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 250,
    width: 350,
  },
  pos: {
    marginBottom: 12,
  },
});
//
const Hotelhomecard = ({ h }) => {
  const classes = useStyles();
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));
  const handleClick = (e) => {
    e.preventDefault();
    if (!auth) history.push('/login');
    console.log(
      'get session id from stripe to shwo a button > checkout with stripe'
    );
  };
  return (
    <div style={{ padding: 15 }}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => history.push(`/hotel/${h._id}`)}>
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
            title="card_image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ wordWrap: 'break-word' }}
            >
              {h.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              {`${h.price} $`}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {h.location}
            </Typography>

            <Typography
              variant="body2"
              component="p"
              style={{ wordWrap: 'break-word' }}
            >
              {`${h.content.substring(1, 100)}...`}
            </Typography>
            <Typography gutterBottom variant="h6">
              for{diffDays(h.from)}
            </Typography>
            <Typography gutterBottom component="p">
              {h.bed} bed
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Available from {new Date(h.from).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            color="primary"
            onClick={() => history.push(`/hotel/${h._id}`)}
          >
            See More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Hotelhomecard;
