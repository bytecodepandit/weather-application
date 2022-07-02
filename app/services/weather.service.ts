import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (location: any) => {
  try {
    const data: any = await axios.post(WEATHER_BASE_URL, null, {
      params: {q: location, appid: 'e093bb50444b6c4ff75f93574261ae76'},
    });
    return data;
  } catch (error) {
    return error;
  }
};
