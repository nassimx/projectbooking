import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';

const Account = () => (
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={5} xs={12} sm={6} md={4}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12} sm={6}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
