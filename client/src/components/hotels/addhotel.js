import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './style.css';
import { createHotel } from '../../redux/actions/hotel';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import HotelCreateForm from '../forms/CreateHotelForm';
//
//

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

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
export default function AddHotel({ openadd, handleCloseBtnAdd }) {
  const classes = useStyles();
  // @ts-ignore
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  //states
  const [values, setValues] = React.useState({
    title: '',
    content: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });
  const [location, setLocation] = useState('');
  //disrtructuring
  const { title, content, image, price, from, to, bed } = values;
  //img preview
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/350x250.png?text=PREVIEW'
  );
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  // get value by name
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append('title', title);
    hotelData.append('content', content);
    hotelData.append('location', location);
    hotelData.append('price', price);
    image && hotelData.append('image', image);
    hotelData.append('from', from);
    hotelData.append('to', to);
    hotelData.append('bed', bed);

    console.log([...hotelData]);
    try {
      let res = await createHotel(token, hotelData);
      console.log('Hotel create res', res);
      toast.success('new hotel is posted');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={openadd}
        onClose={handleCloseBtnAdd}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseBtnAdd}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add New Hotel
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <img
          src={preview}
          alt="preview_image"
          style={{ height: '250px', width: '350px' }}
        />
        {/* <pre>{JSON.stringify(values, null, 4)}</pre>
        {JSON.stringify(location)} */}
        <HotelCreateForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          location={location}
          setLocation={setLocation}
        />
      </Dialog>
    </div>
  );
}
