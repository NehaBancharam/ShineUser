import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default Home = () => {
  return (
    <View style={styles.container}>
      {/* header style */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Home</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
});
