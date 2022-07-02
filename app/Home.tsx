import { ScrollView, View, Text, Dimensions, StyleSheet, SafeAreaView, Pressable, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import WeatherImage from './components/WeatherImage';
import WeatherInfoCard from './components/WeatherInfoCard';
import { getWeather } from './services/weather.service';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { getCities, getCountries, getStates } from './services/location.service';
const { height, width } = Dimensions.get('window');
const Home = () => {
  const [weatherType, setWeatherType] = React.useState(null);
  const [temperature, setTemperature] = React.useState(0);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [city, setCity] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [selectionData, setSelectionData] = React.useState({ country: null, state: null, city: null })

  React.useEffect(() => {
    getAllCountries();
  }, [])

  const getWeatherForLocation = (location: any) => {
    getWeather(location).then(res => {
      const { data: { weather, name, sys, main } } = res;
      setCity(selectionData?.city?.name);
      setState(selectionData?.state?.name);
      setCountry(selectionData?.country?.name);
      setWeatherType(weather[0].main);
      setTemperature(main.temp - 273.15);
    }).catch(error => {
      console.log('error', error)
    })
  }


  const getAllCountries = () => {
    getCountries().then(res => {
      setCountries(res)
    }).catch(error => {
      console.log('error', error);
    })
  }

  const getAllStates = (countryIATACode: string) => {
    getStates(countryIATACode).then(res => {
      setStates(res)
    }).catch(error => {
      console.log('error', error);
    })
  }

  const getAllCities = (stateCode: string, countryIATACode: string) => {
    getCities(stateCode, countryIATACode).then(res => {
      setCities(res)
    }).catch(error => {
      console.log('error', error);
    })
  }



  const onCountrySelection = (country) => {
    setSelectionData({ ...selectionData, country });
    getAllStates(country.id);
  }

  const onStateSelection = (state) => {
    setSelectionData({ ...selectionData, state });
    getAllCities(state.id, selectionData.country.id);
  }

  return (
    <View>
      <KeyboardAvoidingView behavior='height'>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={{
            position: 'relative',
            width: width
          }}>
            {weatherType && <WeatherImage weatherType={weatherType} />}
          </View>
          <View>
            {weatherType && <WeatherInfoCard
              temp={Math.round(temperature)}
              city={city}
              country={country}
              weatherType={weatherType} state={state} />
            }
          </View>
        </ScrollView>
        <SafeAreaView style={{ paddingTop: 30, flexGrow: 1 }}>
          <SearchableDropdown
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              backgroundColor: '#FAF7F6',
            }}
            itemTextStyle={{ color: '#fff' }}
            itemsContainerStyle={{ maxHeight: '50%' }}
            containerStyle={{ paddingHorizontal: 10 }}
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item) => onCountrySelection(item)}
            placeholder={selectionData.country?.name || 'Select Country'}
            filter={() => { }}
            items={countries} />
          <SearchableDropdown
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              backgroundColor: '#FAF7F6',
            }}
            itemTextStyle={{ color: '#fff' }}
            itemsContainerStyle={{ maxHeight: '50%' }}
            onItemSelect={(item) => onStateSelection(item)}
            containerStyle={{ paddingHorizontal: 10, marginTop: 15 }}
            onTextChange={(text) => console.log(text)}
            filter={() => { }}
            placeholder={selectionData.state?.name || 'Select State'}
            items={states}
          />
          <SearchableDropdown
            textInputStyle={{
              //inserted text style
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 6,
              backgroundColor: '#FAF7F6',
            }}
            onItemSelect={(item) => setSelectionData({ ...selectionData, city: item })}
            itemTextStyle={{ color: '#fff' }}
            itemsContainerStyle={{ maxHeight: '50%' }}
            containerStyle={{ paddingHorizontal: 10, marginTop: 15 }}
            onTextChange={(text) => console.log(text)}
            filter={() => { }}
            placeholder={selectionData.city?.name || 'Select City'}
            items={cities} />

          <View style={{ paddingHorizontal: 12 }}>
            <Pressable onPress={() => getWeatherForLocation(selectionData.city.name)} style={{ marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderWidth: 2, borderColor: '#fff' }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '100',
                  fontSize: 20,
                }}>Get Weather Report</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  scrollViewContainer: {
    height: height / 2,
    backgroundColor: '#191a1e',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  weatherCardContainer: {
    width: width,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
})
