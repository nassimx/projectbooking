const express = require('express');

const router = express.Router();

// middleware
const { requireSignin } = require('../middlewares');
// controllers
const {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  stripeSessionId,
  stripeSuccess,
} = require('../controllers/stripe');

router.post('/create-connect-account', requireSignin, createConnectAccount);
router.post('/get-account-status', requireSignin, getAccountStatus);
router.post('/get-account-balance', requireSignin, getAccountBalance);
router.post('/stripe-session-id', requireSignin, stripeSessionId);
//order
router.post('/stripe-success', requireSignin, stripeSuccess);

module.exports = router;
