const router = require('express').Router();
const aleatoryToken = require('crypto');
const emailValidation = require('../middlewares/emailValidation');
const passwordValidation = require('../middlewares/passwordValidation');
const tokenUtils = require('../utils/userTokenDB');

router.post('/', emailValidation, passwordValidation, (_req, res) => {
  const token = aleatoryToken.randomBytes(8).toString('hex');
  tokenUtils.createToken(token);
  res.status(200).json({ token });
});

module.exports = router;