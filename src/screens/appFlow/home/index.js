import React, {useState, useCallback, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Spacer,
  StatusBars,
  Wrapper,
  Text,
  Icons,
  TextInputs,
  ScrollViews,
  Loaders,
  Toasts,
} from '../../../components';
import {
  appIcons,
  appImages,
  appStyles,
  colors,
  fetchLocations,
  fetchWeatherForecast,
  getData,
  sizes,
  storeData,
  theme,
  weatherImages,
} from '../../../services';
import {totalSize, width, height} from 'react-native-dimension';
import {Icon} from '@rneui/base';
import {Divider} from '@rneui/themed';
import {debounce} from 'lodash';

function Home() {
  const [show, toggleShow] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const handleLocation = loc => {
    // console.log('location', loc);
    setLocation([]);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
      // console.log('Got location', data);
    });
  };
  const handleSearch = val => {
    ///fetch locations
    if (val.length > 2) {
      fetchLocations({cityName: val}).then(data => {
        setLocation(data);
        //console.log('got Locations', data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Lahore';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      Toasts.Success('Welcome');
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
  const {location, current} = weather;

  return (
    <>
      <Wrapper flex={1}>
        <Spacer isStatusBarHeigt />
        <StatusBars.Light />
        <Image
          blurRadius={70}
          style={{height: '100%', width: '100%', position: 'absolute'}}
          source={appImages.bg}
        />
        {loading ? (
          <Loaders.Tertiary />
        ) : (
          <ScrollViews.KeyboardAvoiding>
            {/* SEarch Section */}
            <Wrapper
              animation={'bounceInDown'}
              duration={3500}
              style={{position: 'relative', zIndex: 50, height: '10%'}}>
              <TextInputs.Colored
                inputStyle={colors.snow}
                onChangeText={handleTextDebounce}
                placeholder={'Search City'}
                placeholderTextColor={colors.snow}
                inputContainerStyle={{
                  backgroundColor: theme.bgWhite(0.2),
                  marginVertical: height(1),
                }}
                iconNameRight={'search'}
                iconTypeRight={'feather'}
                onPressIconRight={() => toggleShow(!show)}
                iconColorRight={colors.snow}
                iconRightContainer={styles.iconContainerRight}
              />

              {locations.length > 0 ? (
                <Wrapper style={styles.SearchedItemsContainer}>
                  {locations.map((loc, index) => {
                    //removing last border in search term
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder ? (
                      <Divider
                        // key={index}
                        color="grey"
                        width={1}
                        orientation="horizontal"
                      />
                    ) : (
                      ''
                    );

                    return (
                      <Wrapper key={index}>
                        <TouchableOpacity
                          onPress={() => handleLocation(loc)}
                          style={styles.SearchedItems}>
                          <Icon
                            name={'map-pin'}
                            type={'feather'}
                            size={sizes.icons.medium}
                          />

                          <Text
                            style={{marginLeft: width(2)}}
                            isSmallTitle
                            isMediumFont>
                            {loc?.name}, {loc?.country}
                          </Text>
                        </TouchableOpacity>
                        {borderClass}
                      </Wrapper>
                    );
                  })}
                </Wrapper>
              ) : null}
            </Wrapper>
            <Spacer isBasic />
            {/* Forcast Section */}
            <Text isWhite alignTextCenter isSmallTitle>
              {/* City & Country Name */}
              {location?.name},
              <Text isRegularFont style={{color: colors.appBgColor3}}>
                {' ' + location?.country}
              </Text>
            </Text>
            <Spacer isBasic />
            {/* Weather image */}
            <Wrapper  duration={4000} animation={'fadeInDown'} alignItemsCenter>
              <Image
                resizeMode="contain"
                style={{width: width(52), height: height(23)}}
                source={weatherImages[current?.condition?.text]}
              />
            </Wrapper>
            {/* Degree Celcius */}
            <Spacer isBasic />
            <Wrapper>
              <Text alignTextCenter isWhite isSmallTitle>
                {current?.temp_c}&#176;
              </Text>
              <Text alignTextCenter isWhite isTinyTitle>
                {current?.condition?.text}
              </Text>
            </Wrapper>
            <Spacer isBasic />
            {/* Other stats */}
            <Wrapper flexDirectionRow justifyContentSpaceEvenly>
              <Wrapper alignItemsCenter flexDirectionRow>
                <Image
                  resizeMode="contain"
                  style={{width: width(6), height: height(6)}}
                  source={appIcons.wind}
                />
                <Text style={{marginLeft: width(2)}} isWhite isTinyTitle>
                  {current?.wind_kph} KM
                </Text>
              </Wrapper>
              <Wrapper alignItemsCenter flexDirectionRow>
                <Image
                  resizeMode="contain"
                  style={{width: width(6), height: height(6)}}
                  source={appIcons.drop}
                />
                <Text
                  style={{marginLeft: width(2)}}
                  alignTextCenter
                  isWhite
                  isTinyTitle>
                  {current?.humidity}%
                </Text>
              </Wrapper>
              <Wrapper alignItemsCenter flexDirectionRow>
                <Image
                  resizeMode="contain"
                  style={{width: width(6), height: height(6)}}
                  source={appIcons.sun}
                />
                <Text
                  style={{marginLeft: width(2)}}
                  alignTextCenter
                  isWhite
                  isTinyTitle>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </Wrapper>
            </Wrapper>
            <Spacer isBasic />
            {/* Forcast for days */}
            <Wrapper marginHorizontalSmall marginVerticalTiny>
              <Icons.WithText
                tintColor={colors.snow}
                iconName={'calendar-month'}
                text={'Daily Forcast'}
                textStyle={styles.dailyForcastText}
                iconSize={22}
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginVertical: height(1)}}>
                {/* Card 1 */}
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = {weekday: 'long'};
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];
                  return (
                    <Wrapper
                      key={index}
                      animation={'bounceInDown'}
                      duration={2500}
                      style={{
                        marginRight: width(2),
                        backgroundColor: theme.bgWhite(0.2),
                        borderRadius: sizes.cardRadius,
                      }}
                      paddingHorizontalBase
                      paddingVerticalTiny
                      justifyContentCenter
                      alignItemsCenter>
                      <Wrapper  duration={4000} animation={'fadeInDown'}>
                        <Image
                          source={weatherImages[item?.day?.condition?.text]}
                          resizeMode="contain"
                          style={{height: height(15), width: width(20)}}
                        />
                      </Wrapper>
                      <Text isMedium isWhite>
                        {dayName}
                      </Text>
                      <Text isWhite isSmallTitle>
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </Wrapper>
                  );
                })}
              </ScrollView>
            </Wrapper>
          </ScrollViews.KeyboardAvoiding>
        )}
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  SearchedItemsContainer: {
    zIndex: 1,
    position: 'absolute',
    top: '100%', // Adjust the value as needed
    left: 0,
    right: 0,
    ...appStyles.cardView,
    backgroundColor: colors.appBgColor3,
  },
  SearchedItems: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: totalSize(0.7),
  },
  iconContainerRight: {
    backgroundColor: theme.bgWhite(0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: width(10),
    height: height(5),
    borderRadius: totalSize(5 / 2),
    // marginRight: width(1),
  },
  dailyForcastText: {
    ...appStyles.textMedium,
    color: colors.snow,
  },
});

export default Home;

{
  /* <Wrapper style={{height: '7%'}}>
            <Wrapper
              style={styles.searchContainer}
              justifyContentSpaceBetween={}
              flexDirectionRow>
              {showSearch ? (
                <TextInput
                  placeholderTextColor={colors.snow}
                  placeholder="Search City"
                />
              ) : null}

              <TouchableOpacity onPress={()=> toggleSearch(!showSearch)} style={styles.iconContainerRight}>
                <Icon
                  name={'search'}
                  type={'feather'}
                  size={sizes.icons.medium}
                  color={colors.snow}
                />
              </TouchableOpacity>
            </Wrapper>
          </Wrapper> */
}
