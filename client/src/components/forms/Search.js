import React, { useState } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useHistory } from 'react-router-dom';

//
const config = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  language: 'en',
  countries: ['tn'],
};
const Search = () => {
  // state
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [bed, setBed] = useState('');
  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };
  return (
    <div>
      <AlgoliaPlaces
        placeholder="Location"
        defaultValue={location}
        options={config}
        onChange={({ suggestion }) => setLocation(suggestion.value)}
        style={{ height: '50px' }}
      />
      <div></div>
    </div>
  );
};

export default Search;
