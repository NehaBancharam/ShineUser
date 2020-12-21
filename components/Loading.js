import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const Loading = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ActivityIndicator size="large" color="#634C87" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 25,
    fontFamily: "ibarra-italic-bold",
    marginVertical: 10,
  },
});

export default Loading;
