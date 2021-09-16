/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Edithotel from './edithotel';
import { Link } from 'react-router-dom';
import { diffDays } from '../../redux/actions/hotel';
import { CardActionArea } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    // minHeight:655,
  },
  media: {
    height: 250,
    width: 350,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function HotelCard({
  h,
  handleHotelDelete,
  openedit,
  handleClickOpenEdit,
  handleCloseEdit,
}) {
  const classes = useStyles();
  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  // @ts-ignore
  const { user } = auth;
  // console.log(diffDays(h.to));

  return (
    <div style={{ padding: 15 }}>
      <Card className={classes.root}>
        <CardActionArea>
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

        {/* check to change here */}
        {auth &&
          auth.user &&
          auth.user.stripe_seller &&
          auth.user.stripe_seller.charges_enabled &&
          auth.user.stripe_seller.login_links && (
            <>
              <CardActions>
                {/* <Link to={`/hotel/edit/${h._id}`}> */}
                <Button
                  size="small"
                  color="primary"
                  onClick={handleClickOpenEdit}
                >
                  <EditIcon fontSize="medium" />
                  Edit
                </Button>

                <Edithotel
                  openedit={openedit}
                  // @ts-ignore
                  handleClickOpenEdit={handleClickOpenEdit}
                  handleCloseEdit={handleCloseEdit}
                  h={h}
                />
                {/* </Link> */}
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleHotelDelete(h._id)}
                >
                  <DeleteIcon fontSize="medium" color="secondary" />
                  Delete
                </Button>
              </CardActions>
            </>
          )}
      </Card>
    </div>
  );
}
