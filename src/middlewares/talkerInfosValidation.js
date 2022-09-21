const talkerUtils = require('../utils/talkerDB');

const talkerNameValidation = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const talkerAgeValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkerTalkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
};

const talkerWatchedAtValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!('watchedAt' in talk)) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!/^(\d{2})\/(\d{2})\/(\d{4})$/.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const talkerRateValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!('rate' in talk)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (talk.rate > 5 || talk.rate < 1 || talk.rate % 1 !== 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const talkerIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const allTalkers = await talkerUtils.getAllTalkers();
  const hasTalkerId = allTalkers.some((talker) => talker.id === Number(id));

  if (!hasTalkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = {
  talkerNameValidation,
  talkerAgeValidation,
  talkerTalkValidation,
  talkerWatchedAtValidation,
  talkerRateValidation,
  talkerIdValidation,
};