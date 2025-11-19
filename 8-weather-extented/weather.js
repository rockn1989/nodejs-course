#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return;
  }

  try {
    await  saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен')
  } catch (error) {
    printError(error.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город')
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранен')
  } catch (error) {
    printError(error.message)
  }
}


const saveLanguage = async (lang) => {

  try {
    await  saveKeyValue(TOKEN_DICTIONARY.lang, lang);
    printSuccess('Выбранный язык сохранен')
  } catch (error) {
    printError(error.message)
  }
}


const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

    const weather = await getWeather(city);
    if (Array.isArray(weather)) {
      weather.forEach((data) => {
        printWeather(data, getIcon(data.weather[0].icon))
      })
    } else {
      printWeather(weather, getIcon(weather.weather[0].icon))
    }
    
  } catch (error) {
    if (error.cod === '404') {
     printError('Неверно указан город') 
    } else if (error.cod === '401') {
      printError('Неверно указан токен') 
    } else {
      printError(error.message)
    }
  }
}

const initCLI = () => {
 const args = getArgs(process.argv);

 if (args.h) {
  return printHelp();
 }

 if (args.s) {
  return saveCity(args.s);
 }

 if (args.t) {
  return saveToken(args.t);
 }

 if (args.l) {
  return saveLanguage(args.l);
 }

  getForecast()

};


initCLI()
