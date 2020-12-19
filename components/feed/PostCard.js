import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import moment from "moment";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import firebase from "../../config/Firebase";

const { width, height } = Dimensions.get("screen");

const PostCard = ({ post }) => {
  const { id, text, timestamp, uid, username } = post;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 15,
        }}
      >
        <FontAwesome name="user-circle-o" size={30} color="gray" />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: "gray", fontSize: 17, fontWeight: "bold" }}>
            {username}
          </Text>
          <Text style={{ color: "gray", fontSize: 14 }}>
            {moment(timestamp.toDate()).fromNow()}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: width - 60,
        }}
      >
        <Text style={{ textAlign: "justify", color: "black" }}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 3,
    backgroundColor: "white",
    padding: 15,
  },
});

export default PostCard;
