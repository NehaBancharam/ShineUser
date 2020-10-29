import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default About = () => {
  return (
    <View style={styles.container}>
      <Text>About screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
