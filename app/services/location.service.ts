import axios from 'axios';

export const getCountries = async () => {
  try {
    const result: any = await axios.get(
      'https://api.first.org/data/v1/countries',
    );
    const countryList = result.data.data;
    const countries = [];
    for (let key in countryList) {
      if (countryList[key]) {
        countries.push({id: key, name: countryList[key].country});
      }
    }
    return countries;
  } catch (error) {
    return error;
  }
};

export const getStates = async (countryIATACode: string) => {
  try {
    const result: any = await axios.post(
      `https://geodata.solutions/api/api.php`,
      null,
      {
        params: {
          type: 'getStates',
          countryId: countryIATACode,
        },
      },
    );
    const states = [];
    const stateList = result.data.result;
    for (let key in stateList) {
      if (stateList[key]) {
        states.push({id: JSON.parse(key), name: stateList[key]});
      }
    }
    return states;
  } catch (error) {
    return error;
  }
};

export const getCities = async (stateCode: string, countryIATACode: string) => {
  try {
    const result: any = await axios.post(
      `https://geodata.solutions/api/api.php`,
      null,
      {
        params: {
          type: 'getCities',
          countryId: countryIATACode,
          stateId: stateCode,
        },
      },
    );
    const cities = [];
    const cityList = result.data.result;
    for (let key in cityList) {
      if (cityList[key]) {
        cities.push({id: JSON.parse(key), name: cityList[key]});
      }
    }
    return cities;
  } catch (error) {
    return error;
  }
};
