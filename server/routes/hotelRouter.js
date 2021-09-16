const router = require('express').Router();
const formidable = require('express-formidable');
const { requireSignin, hotelOwner } = require('../middlewares');
const {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
} = require('../controllers/hotel');
router.get('/hotels', hotels);

router.post('/hotels', requireSignin, formidable(), create);

router.get('/hotel/image/:hotelId', image);

router.get('/seller-hotels', requireSignin, sellerHotels);

router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove);

router.get('/hotel/:hotelId', read);

module.exports = router;
