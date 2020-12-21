import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import moment from "moment";

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";


const { width } = Dimensions.get("screen");

const PostCard = ({ post, deletable, onDelete }) => {
  const { id, text, timestamp, username } = post;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 15,
        }}
      >
        <FontAwesome name="user-circle-o" size={30} color="#634C87" />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: "#634C87", fontSize: 17, fontWeight: "bold" }}>
            {username}
          </Text>
          <Text style={{ color: "gray", fontSize: 14 }}>
            {moment(timestamp.toDate()).fromNow()}
          </Text>
        </View>
        {deletable ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              height: "100%",
            }}
          >
            <TouchableOpacity onPress={() => onDelete(id)}>
              <MaterialIcons name="delete" size={20} color="#634C87" />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
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
