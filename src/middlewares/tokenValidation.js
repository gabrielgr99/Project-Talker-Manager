const tokenUtils = require('../utils/userTokenDB');

const tokenValidation = async (req, res, next) => {
  const { token } = await tokenUtils.getToken();
  if (!token || !req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token !== req.headers.authorization) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = tokenValidation;