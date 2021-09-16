import React from 'react';
import { Container, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import AlgoliaPlaces from 'algolia-places-react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

//
//
const config = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  language: 'en',
  countries: ['tn'],
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// @ts-ignore ///
export default function HotelCreateForm(props) {
  const { handleChange, handleImageChange, setLocation, setValues, values } =
    props;
  const { title, content, price, bed, from, to } = values;
  return (
    <div>
      <div>
        <br />
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} lg={4}>
              <TextField
                label="Title"
                name="title"
                onChange={handleChange}
                inputProps={{ maxLength: 45 }}
                required
                value={title}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12} lg={4}>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Grid>
            <Grid item md={6} xs={12} lg={4}>
              <TextField
                label="Content"
                name="content"
                value={content}
                onChange={handleChange}
                multiline
                rows={5}
                variant="outlined"
                required
              />
            </Grid>
            <AlgoliaPlaces
              placeholder={Location}
              defaultValue={Location}
              options={config}
              onChange={({ suggestion }) => setLocation(suggestion.value)}
              style={{ height: '50px' }}
            />
            <Grid item md={6} xs={12} lg={4}>
              <TextField
                label="Price"
                value={price}
                onChange={handleChange}
                name="price"
                id="formatted-numberformat-input"
                variant="outlined"
                required
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12} lg={4}>
              <TextField
                label="Bed"
                name="bed"
                type="number"
                onChange={handleChange}
                required
                value={bed}
                InputProps={{ inputProps: { min: 0, max: 4 } }}
                variant="outlined"
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  helperText="From date"
                  minDate={new Date()}
                  value={from}
                  onChange={(date) => setValues({ ...values, from: date })}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                helperText="To date"
                minDate={new Date()}
                value={to}
                onChange={(date) => setValues({ ...values, to: date })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Container>
      </div>
    </div>
  );
}
