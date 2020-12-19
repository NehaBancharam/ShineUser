import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import firebase from "../config/Firebase";

import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const { height } = Dimensions.get("screen");

export default Post = ({ navigation }) => {
  const [text, setText] = useState("");
  const userID = firebase.auth().currentUser.uid;

  const [loading, setLoading] = useState(false);

  const postSubmitHandler = () => {
    setLoading(true);
    let postRef = firebase.firestore().collection("posts").doc();

    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .get()
      .then((doc) => {
        let post = {
          uid: userID,
          username: doc.data().username,
          text,
          timestamp: firebase.firestore.Timestamp.now(),
        };

        postRef.set(post).then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(userID)
            .update({
              posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
            })
            .then(() => {
              setLoading(false);
              navigation.goBack();
            });
        });
      });
  };

  return (
    <ScrollView scrollEnabled>
      <View style={styles.container}>
        {/* header style */}
        <View style={styles.header}>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>Post </Text>
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/logo/logo.png")}
                style={styles.avatar}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                // textAlign="center"
                placeholder="Share your journey with other Shine Brightly members!"
                onChangeText={(text) => setText(text)}
                value={text}
              ></TextInput>
              <TouchableOpacity
                style={styles.photo}
                onPress={postSubmitHandler}
              >
                <MaterialIcons
                  name="check-circle"
                  size={40}
                  color="#634C87"
                ></MaterialIcons>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "white",
  },
  inputContainer: {
    flex: 2,
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  photo: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
