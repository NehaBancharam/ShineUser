import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../components/Header";

import { MaterialIcons } from "@expo/vector-icons";

export default Feedback = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        title="Feedback"
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
