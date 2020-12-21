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
  ScrollView,
} from "react-native";
import firebase from "../config/Firebase";

import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";

const { height } = Dimensions.get("screen");

export default Post = ({ navigation }) => {
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const userID = firebase.auth().currentUser.uid;

  const postSubmitHandler = () => {
    setLoading(true);
    let postRef = firebase.firestore().collection("posts").doc();
    if (text !== "") {
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
    } else {
      setErrorMessage("Post cannot be left blank");
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* header style */}
        <Header
          title="Post"
          left={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          }
        />
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
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

            <View style={styles.errorMsg}>
              {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
              ) : (
                <></>
              )}
            </View>

            <View style={{ marginHorizontal: 15, alignItems: "center" }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#634C87",
                  marginVertical: 15,
                  paddingHorizontal: 15,
                }}
                multiline={true}
                textAlign="center"
                numberOfLines={4}
                // textAlign="center"
                placeholder="Share your journey with other Shine Brightly members!"
                onChangeText={(text) => {
                  setErrorMessage("");
                  setText(text);
                }}
                value={text}
              />
              <TouchableOpacity
                style={styles.photo}
                onPress={postSubmitHandler}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#634C87",
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 15, color: "white", paddingRight: 10 }}
                  >
                    Share Now
                  </Text>
                  <MaterialIcons name="check" size={30} color="white" />
                </View>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "white",
  },
  errorMsg: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
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
