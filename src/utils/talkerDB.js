const fs = require('fs/promises');

const pathFile = 'src/talker.json';

const insertOnFile = (newData) => {
  fs.writeFile(pathFile, JSON.stringify(newData));
};

const getAllTalkers = async () => {
  const allTalkers = await fs.readFile(pathFile, 'utf-8');
  return JSON.parse(allTalkers);
};

const getTalkerById = async (id) => {
  const allTalkers = await getAllTalkers();
  const talker = allTalkers.find((talkerFind) => talkerFind.id === id);
  return talker;
};

const createTalker = async (newTalker) => {
  const allTalkers = await getAllTalkers();
  const talkerWithId = { id: allTalkers.length + 1, ...newTalker };
  allTalkers.push(talkerWithId);
  insertOnFile(allTalkers);
  return talkerWithId;
};

const editTalker = async (newInfosTalker, id) => {
  const allTalkers = await getAllTalkers();
  const talkerIndex = allTalkers.findIndex((talker) => talker.id === Number(id));
  allTalkers[talkerIndex] = { id, ...newInfosTalker };
  insertOnFile(allTalkers);
  return allTalkers[talkerIndex];
};

const deleteTalker = async (id) => {
  let allTalkers = await getAllTalkers();
  allTalkers = allTalkers.filter((talker) => talker.id !== id);
  return insertOnFile(allTalkers);
};

const searchTalker = async (term) => {
  const allTalkers = await getAllTalkers();
  const talkers = allTalkers.filter((talker) => talker.name.includes(term));
  return talkers;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};