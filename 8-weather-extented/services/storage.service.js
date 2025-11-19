import { readFile, stat, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
  lang: 'lang'
}

const isExists = async (path) => {
  try {
    await stat(path);
    return true
  } catch (e) {
    return false;
  }
}

const getKeyValue = async (key) => {
  
  if (await isExists(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file);

    return data[key];
  }

  return undefined;

};

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExists(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file);
  }

  if (value.includes(',')) {
    data[key] = value.split(',')
  } else {
    data[key] = value;
  }

  await writeFile(filePath, JSON.stringify(data), 'utf-8');
}



export { getKeyValue, saveKeyValue, TOKEN_DICTIONARY };

