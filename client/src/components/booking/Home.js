import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { allHotels } from '../../redux/actions/hotel';
import Hotelhomecard from './HotelHomeCard';

export default function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };
  return (
    <>
      <div className="home">
        <div className="search">
          <div className="backdrop tunisia">
            <p className="text tunisia">TUNISIA</p>
          </div>
        </div>
      </div>

      <Grid item justifyContent="center">
        <Typography variant="h3" noWrap>
          Hotels
        </Typography>
      </Grid>

      <div>
        <Grid container justifyContent="center">
          {hotels.map((h) => (
            <Hotelhomecard h={h} key={h._id} />
          ))}
        </Grid>
      </div>
    </>
  );
}
