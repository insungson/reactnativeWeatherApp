import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEYS = "e7a512fb58db465cb72dfd7bc60c406d";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(null);
  const [condition, setCondition] = useState(null);

  const getWeather = useCallback(
    async (latitude, longitude, API_KEYS) => {
      const {
        data: {
          main: { temp },
          weather,
        },
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEYS}&units=metric`
      );
      console.log("weather: ", weather);
      // console.log(data);
      setIsLoading(false);
      setTemp(temp);
      setCondition(weather[0].main);
    },
    [API_KEYS]
  );

  const geoLocation = useCallback(async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude, API_KEYS);
      // console.log("location: ", location);
    } catch (error) {
      console.log("error: ", error);
      Alert.alert("Can't find you", "So sad");
    }
  }, []);

  useEffect(() => {
    geoLocation();
  }, []);

  return isLoading ? (
    <Loading />
  ) : condition !== null ? (
    <Weather temp={Math.round(temp)} condition={condition} />
  ) : (
    <Loading />
  );
  // <View style={styles.container}>
  //   <View style={styles.yellowView}></View>
  //   <View style={styles.blueView}></View>
  // </View>
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // flexDirection: "row", //이건 보통 디폴트로 들어간 값이다.
//     // alignItems: "center",
//     // justifyContent: "center",
//   },
//   yellowView: {
//     flex: 1, //flex 로 화면의 크기비율을 맞춘다
//     backgroundColor: "yellow",
//   },
//   blueView: {
//     flex: 4,
//     backgroundColor: "blue",
//   },
// });
