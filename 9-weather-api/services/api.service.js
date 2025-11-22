import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  switch(icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '⛅';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️'
    case '11':
      return '⛈️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
}

const getWeatherForCity = async (city, token) => {
  const params = {
    q: city,
    lang: await getKeyValue(TOKEN_DICTIONARY.lang),
    appid: token,
    units: 'metrics'
  }

  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.search = new URLSearchParams(params).toString();

  try {
    
    const res = await fetch(url.href);

    const data = await res.json();
    if (data.cod && data.cod === 401) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const getWeather = async (city) => {
  const token = '61ba2c1491faa96d069b16dbaab13792';

  if (!token) {
    throw new Error("Не задан ключ API, задайте его через команду -t [API_KEY]");
  }

  if (Array.isArray(city)) {
    return await Promise.all(city.map((el => getWeatherForCity(el, token))));
  } else {
    return getWeatherForCity(city, token)
  }



};


export { getIcon, getWeather };

