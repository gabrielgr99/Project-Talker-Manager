const passwordValidation = (req, res, next) => {
  const hasPassword = 'password' in req.body;

  if (!hasPassword) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (hasPassword) {
    const passwordOK = req.body.password.length >= 6;
    if (!passwordOK) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  }
  next();
};

module.exports = passwordValidation;