import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const photo = require("../assets/no-internet.png");

const NoInternet = (props) => {
  return (
    <View style={styles.container}>
      <Image source={photo} resizeMode="contain" style={{ width: "100%" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default NoInternet;
