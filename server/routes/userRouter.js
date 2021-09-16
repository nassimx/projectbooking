const express = require('express');
const {
  register,
  login,
  getallUsers,
  getuserbyId,
  deleteUser,
  editUser,
} = require('../controllers/auth');

const { registerRules, validator } = require('../middlewares/validator');

const router = express.Router();
// create New User
router.post('/register', registerRules(), validator, register);
// Login User
router.post('/login', login);
// get all users
router.get('/users', getallUsers);
// get user by _id
router.get('/users/:id', getuserbyId);
// delete user by _id
router.delete('/users/delete/:id', deleteUser);
// update user by _id
router.put('/users/update/:id', editUser);

module.exports = router;
