import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = "e8f5a0c5982442f95c99d0988c20590f";
  const city = "Bangalore";
  const state = "KA";
  const countryCode = 3166 - 1;

  const getLocation = async () => {
    setRefreshing(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("permission denied");
    }
    const { coords } = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    const uri = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
    try {
      const response = await axios.get(uri);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    if (!response.ok) {
      Alert.alert("something went wrong");
    } else {
      setWeatherData(data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Hello....</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
