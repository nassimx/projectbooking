const { check, validationResult } = require('express-validator');

exports.registerRules = () => [
  check('firstname', 'this filed is required').notEmpty(),
  check('lastname', 'this filed is required').notEmpty(),
  check('email', 'this filed shouls be a valid email address').isEmail(),
  check('password', 'this filed is required').isLength({ min: 8 }),
  check('adresse', 'this filed is required').notEmpty(),
];
exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ message: errors.array() });
};
