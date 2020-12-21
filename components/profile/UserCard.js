import React from "react";
import { View, Text, StyleSheet } from "react-native";

import moment from "moment";

const UserCard = ({ username, dateJoined }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.dateJoined}>
        Joined: {dateJoined ? moment(dateJoined.toDate()).fromNow() : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    padding: 15,
    backgroundColor: "#634C87",
    elevation: 5,
    borderRadius: 20,
  },
  username: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginRight: 5,
  },
  dateJoined: {
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "white",
  },
});

export default UserCard;
