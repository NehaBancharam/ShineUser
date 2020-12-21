import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ title, left, right }) => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>{left}</View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>{title}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row-reverse" }}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "white",
  },
});

export default Header;
