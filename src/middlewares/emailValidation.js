const emailValidation = (req, res, next) => {
  const hasEmail = 'email' in req.body;

  if (!hasEmail) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (hasEmail) {
    const emailOK = /[a-z0-9]@[a-z]+\.com/i.test(req.body.email);
    if (!emailOK) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  }
  next();
};

module.exports = emailValidation;