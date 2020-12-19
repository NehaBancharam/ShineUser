import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/splashScreen.png")}></Image>
      </View>
    );
  }
}

//format
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#300016",
  },
});
