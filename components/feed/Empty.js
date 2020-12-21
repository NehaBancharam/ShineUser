import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";

const emptyPhoto = require("../../assets/empty.png");

const Empty = ({ label, onRefresh, loading }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          colors={["#634C87"]}
          progressBackgroundColor="white"
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
    >
      <Image
        source={emptyPhoto}
        resizeMode="contain"
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.label}>{label}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginVertical: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#634C87",
  },
});

export default Empty;
