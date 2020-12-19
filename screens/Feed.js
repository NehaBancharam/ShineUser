import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Avatar, FAB } from "react-native-paper";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import firebase from "../config/Firebase";
import { useEffect } from "react";

const { width, height } = Dimensions.get("screen");
const logo = require("../assets/logo/logo.png");

export default Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPostsHandler = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get()
      .then((doc) => {
        setLoading(false);
        setPosts(doc.data());
        console.log(doc.data());
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const subscriber = getPostsHandler();
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
      {/* header style */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Feed </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            margin: 15,
            elevation: 3,
            backgroundColor: "white",
            padding: 15,
          }}
        >
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
                Username
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>TimeStamp</Text>
            </View>
          </View>

          <View
            style={{
              width: width - 60,
            }}
          >
            <Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              vehicula, nisl quis aliquam iaculis, leo odio rutrum lacus, et
              pharetra elit ipsum id est. Mauris aliquam lectus ac tortor
              auctor, vitae semper massa posuere. Morbi accumsan egestas
              facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nulla sit amet erat rutrum, lacinia erat at, interdum
              ligula. Praesent eu arcu efficitur, sagittis orci a, consectetur
              nunc. Aenean aliquam justo ac congue feugiat. Duis at nisl eros.
              Sed tempus maximus velit, sed placerat enim facilisis eu. Nunc non
              faucibus tortor, ut porta odio. Aliquam viverra ut quam vitae
              rhoncus. Duis sagittis eu dolor sit amet vehicula. Aenean interdum
              eros nec leo placerat, eget suscipit mi porttitor. Fusce nec quam
              vel velit lobortis ornare vel at purus. Donec ac condimentum arcu,
              in consectetur nunc. Maecenas luctus elit eu nisl lacinia, in
              posuere purus mollis.
            </Text>
          </View>
        </View>
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Post")}
      />
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
