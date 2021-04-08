import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native"; //StatusBar 는 어플 상단의 상태창이다.

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Getting the fucking wather</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30,
  },
});
