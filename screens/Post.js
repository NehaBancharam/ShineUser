import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";

import firebase from "../config/Firebase";
import ErrorMessage from "../components/ErrorMessage";

const { height } = Dimensions.get("screen");

export default Post = ({ navigation }) => {
  const [text, setText] = useState("");
  const [textInvalid, setTextInvalid] = useState(false);
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
      setTextInvalid(true);
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
          <View>
            <View style={{ alignItems: "center", paddingVertical: 15 }}>
              <Image
                source={require("../assets/login.png")}
                style={styles.avatar}
              />
            </View>

            <ErrorMessage errorMessage={errorMessage} />

            <View style={{ flex: 1, marginHorizontal: 15, marginTop: 15 }}>
              <TextInput
                onFocus={() => {
                  setErrorMessage("");
                  setTextInvalid(false);
                }}
                error={textInvalid}
                label="Share your journey with other members!"
                mode="flat"
                multiline
                numberOfLines={5}
                style={styles.input}
                onChangeText={(text) => setText(text)}
                value={text}
                underlineColor="#F0F7FF"
                keyboardType="default"
                theme={{
                  colors: { primary: "#808080" },
                }}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={postSubmitHandler}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#E9446A",
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
    paddingBottom: 100,
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
  input: {
    fontSize: 15,
    color: "#161F3D",
    backgroundColor: "#F0F7FF",
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
  submitButton: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
