const fs = require('fs/promises');

const pathFile = 'src/userToken.json';

const getToken = async () => {
  let token = await fs.readFile(pathFile, 'utf-8');
  
  if (token) {
    token = JSON.parse(token);
  } else if (!token) {
    token = { token: '' };
  }

  return token;
};

const createToken = (token) => {
  const newToken = { token };
  console.log(JSON.stringify(newToken));
  fs.writeFile(pathFile, JSON.stringify(newToken));
};

module.exports = {
  createToken,
  getToken,
};