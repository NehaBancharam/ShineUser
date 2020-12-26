import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const splashScreen = require("../assets/splash-screen.png");
const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 15 }}>
        <Image
          source={splashScreen}
          resizeMode="center"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#300016",
  },
});

export default SplashScreen;
