import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { List, TextInput } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Header from "../../components/Header";
import moment from "moment";
import firebase from "../../config/Firebase";
import UserCard from "../../components/profile/UserCard";
import ReservedWords from "../../constants/ReservedWords";
const { height } = Dimensions.get("screen");

export default Profile = ({ navigation }) => {
  const userID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const clearErrors = () => {
    setErrorMessage("");
  };

  const getUserData = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .onSnapshot((doc) => {
        setUser(doc.data());
        console.log(doc.data().dateJoined);
        setLoading(false);
      });
  };

  const checkErrorCode = (code) => {
    if (code === "auth/too-many-requests") {
      setErrorMessage("System locked. Try to login after some time.");
    }
    if (code === "auth/invalid-email") {
      setErrorMessage("Email badly formatted.");
      setEmailInvalid(true);
    }
    if (code === "auth/email-already-in-use") {
      setErrorMessage("An account with the same email address already exists.");
      setEmailInvalid(true);
    }
    if (code === "auth/user-not-found") {
      setErrorMessage("No account with this email found.");
    }
    if (code === "auth/wrong-password") {
      setErrorMessage("Incorrect password. Try again.");
      setPasswordInvalid(true);
    }
  };

  const changeUsernameHandler = () => {
    setUsernameLoading(true);
    setUsernameInvalid(false);

    if (username.length > 0) {
      if (!ReservedWords.includes(username.toLocaleLowerCase())) {
        firebase
          .firestore()
          .collection("users")
          .where("username", "==", username)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              setErrorMessage("Username already taken.");
              setUsernameInvalid(true);
              setUsernameLoading(false);
            } else {
              firebase
                .firestore()
                .collection("users")
                .doc(userID)
                .update({
                  username,
                })
                .then(() => {
                  setUsername("");
                  setUsernameInvalid(false);
                  setUsernameLoading(false);
                });
            }
          });
      } else {
        setErrorMessage(
          "Username not valid. Please choose another one. Thank you very much, Hallelujah, Hail Jesussss"
        );
        setUsernameInvalid(true);
        setUsernameLoading(false);
      }
    } else {
      setErrorMessage("Enter a username");
      setUsernameLoading(false);
    }
  };

  const changePasswordHandler = () => {};

  useEffect(() => getUserData(), []);

  return (
    <View style={styles.container}>
      {/* header style */}
      <Header
        title="Profile"
        right={<AntDesign name="logout" size={20} color="#634C87" />}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* other screens */}
        <View style={{ flex: 1 }}>
          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#634C87" />
            ) : (
              <UserCard
                username={user ? user.username : ""}
                dateJoined={user ? user.dateJoined : null}
              />
            )}
            <View>
              {errorMessage ? (
                <View style={styles.errorMsg}>
                  <Text style={styles.error}>{errorMessage}</Text>
                </View>
              ) : (
                <></>
              )}
              <List.AccordionGroup>
                <List.Accordion title="Edit Username" id="1">
                  <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ textAlign: "center" }}>
                      Changes to your username will be effected immediately.
                    </Text>
                    <TextInput
                      onFocus={clearErrors}
                      error={usernameInvalid}
                      label="Username"
                      mode="outlined"
                      style={styles.input}
                      onChangeText={(name) => setUsername(name)}
                      value={username}
                      theme={{ colors: { primary: "purple" } }}
                    />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={changeUsernameHandler}
                    >
                      <Text style={{ color: "#FFF", fontWeight: "500" }}>
                        {usernameLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          "Change Username"
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </List.Accordion>
                <List.Accordion title="Edit Password" id="2">
                  <View style={{ marginHorizontal: 15 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        onFocus={clearErrors}
                        error={passwordInvalid}
                        label="Password"
                        mode="outlined"
                        style={[{ flex: 1 }, styles.input]}
                        secureTextEntry={passwordVisible}
                        onChangeText={(password) =>
                          setPassword(password.trim())
                        }
                        value={password.trim()}
                        theme={{ colors: { primary: "purple" } }}
                      />
                      <TouchableOpacity
                        style={{
                          marginLeft: 15,
                          position: "absolute",
                          right: 15,
                          alignSelf: "center",
                        }}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      >
                        <MaterialCommunityIcons
                          name={passwordVisible ? "eye-off" : "eye"}
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={changeUsernameHandler}
                    >
                      <Text style={{ color: "#FFF", fontWeight: "500" }}>
                        {usernameLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          "Change Password"
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Text>Give us a feedback</Text>
            <MaterialIcons name="feedback" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("Terms and Conditions")}
          >
            <Text>Terms and Conditions</Text>
            <MaterialIcons name="info" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("About")}
          >
            <Text>About Us</Text>
          </TouchableOpacity>
          {/* <View>
          <TouchableOpacity
            style={styles.logOut}
            onPress={() => firebase.auth().signOut()}
          >
            <Text style={{ fontSize: 14, color: "#ffffff" }}>Log Out</Text>
          </TouchableOpacity>
        </View> */}
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ color: "#D3D3D3", fontSize: 10, textAlign: "center" }}
            >
              @ Copyright 2021 All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  layout: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    fontSize: 13,
    color: "#161F3D",
    backgroundColor: "white",
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logOut: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#634C87",
    borderRadius: 25,
    padding: 10,
  },
});
