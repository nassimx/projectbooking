import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const user1 = {
  avatar:
    'https://material-kit-react.devias.io/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
};

const AccountProfile = (props) => {
  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={user1.avatar}
            style={{
              height: 150,
              width: 150,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${user.firstname} ${user.lastname}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user1.city} ${user1.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`joined ${moment(user.createdAt).fromNow()}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
        {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" /> */}
      </CardActions>
    </Card>
  );
};
export default AccountProfile;
