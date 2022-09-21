const router = require('express').Router();
const talkerUtils = require('../utils/talkerDB');
const tokenValidation = require('../middlewares/tokenValidation');
const {
  talkerNameValidation,
  talkerAgeValidation,
  talkerTalkValidation,
  talkerWatchedAtValidation,
  talkerRateValidation,
  talkerIdValidation,
} = require('../middlewares/talkerInfosValidation');

router.get('/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const talkers = await talkerUtils.searchTalker(q);
  return res.status(200).json(talkers);
});

router.get('/', async (_req, res) => {
  const allTalkers = await talkerUtils.getAllTalkers();
  res.status(200).json(allTalkers);
});

router.post('/',
  tokenValidation,
  talkerNameValidation,
  talkerAgeValidation,
  talkerTalkValidation,
  talkerWatchedAtValidation,
  talkerRateValidation,
  async (req, res) => {
  const newTalker = await talkerUtils.createTalker(req.body);
  return res.status(201).json(newTalker);
});

router.get('/:id', talkerIdValidation, async (req, res) => {
  const { id } = req.params;
  const talker = await talkerUtils.getTalkerById(Number(id));

  return res.status(200).json(talker);
});

router.put('/:id',
  tokenValidation,
  talkerIdValidation,
  talkerNameValidation,
  talkerAgeValidation,
  talkerTalkValidation,
  talkerWatchedAtValidation,
  talkerRateValidation,
  async (req, res) => {
  const { params, body } = req;
  const talkerEdited = await talkerUtils.editTalker(body, Number(params.id));
  return res.status(200).json(talkerEdited);
});

router.delete('/:id', tokenValidation, talkerIdValidation, (req, res) => {
  const { id } = req.params;
  talkerUtils.deleteTalker(Number(id));
  return res.status(204).end();
});

module.exports = router;