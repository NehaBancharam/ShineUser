import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ErrorMessage;
