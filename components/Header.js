import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Header = ({ title, left, right, style }) => {
  return (
    <View style={{ ...styles.header, ...style }}>
      <View style={{ flex: 1 }}>{left}</View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>{title}</Text>
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
    paddingBottom: 15,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "white",
  },
});

export default Header;
