import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { List, TextInput } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import Header from "../../components/Header";
import firebase from "../../config/Firebase";
import UserCard from "../../components/profile/UserCard";
import ReservedWords from "../../constants/ReservedWords";
import InfoModal from "../../components/profile/InfoModal";

export default Profile = ({ navigation }) => {
  const userID = firebase.auth().currentUser.uid;
  const [user, setUser] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordInvalid, setCurrentPasswordInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const clearUserNameErrors = () => {
    setErrorMessage("");
    setUsernameInvalid(false);
  };

  const clearPasswordErrors = () => {
    setErrorMessage("");
    setNewPasswordInvalid(false);
    setCurrentPasswordInvalid(false);
  };

  const getUserData = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .onSnapshot((doc) => {
        setUser(doc.data());
        setLoading(false);
      });
  };

  const modalHandler = (text, visible) => {
    setModalVisible(visible);
    setModalText(text);
  };

  const checkErrorCode = (code) => {
    if (code === "auth/too-many-requests") {
      setErrorMessage("System locked. Try again after some time.");
    }
    if (code === "auth/wrong-password") {
      setErrorMessage(
        "Password entered does not match your current password. Try again."
      );
    }
  };

  const changeUsernameHandler = () => {
    clearUserNameErrors();
    setUsernameLoading(true);

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
                  modalHandler("Your username has been changed", true);
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
      setUsernameInvalid(true);
      setUsernameLoading(false);
    }
  };

  const reauthenticate = (currentPassword) => {
    let user = firebase.auth().currentUser;
    let credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(credentials);
  };

  const changePasswordHandler = () => {
    clearPasswordErrors();
    setPasswordLoading(true);

    let regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;

    if (newPassword.length === 0) {
      setErrorMessage("Enter a new password.");
      setNewPasswordInvalid(true);
      setPasswordLoading(false);
    } else if (currentPassword === newPassword) {
      setErrorMessage("New password cannot be the same as current password.");
      setCurrentPasswordInvalid(true);
      setNewPasswordInvalid(true);
      setPasswordLoading(false);
    } else if (!regex.test(newPassword)) {
      setErrorMessage(
        "New password must contain atleast 1 capital, 1 small letter and 1 number and be 6 characters long."
      );
      setNewPasswordInvalid(true);
      setPasswordLoading(false);
    } else {
      reauthenticate(currentPassword)
        .then(() => {
          setCurrentPassword("");
          setNewPassword("");
          let user = firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              modalHandler("Your password has been changed", true);
              setNewPasswordInvalid(false);
              setPasswordLoading(false);
            })
            .catch((error) => {
              checkErrorCode(error.code);
              setCurrentPasswordInvalid(true);
              setPasswordLoading(false);
            });
        })
        .catch((error) => {
          checkErrorCode(error.code);
          setCurrentPasswordInvalid(true);
          setPasswordLoading(false);
        });
    }
  };

  useEffect(() => getUserData(), []);

  return (
    <View style={styles.container}>
      <InfoModal
        label={modalText}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setModalText("");
        }}
      />
      {/* header style */}
      <Header
        title="Profile"
        right={
          <TouchableOpacity onPress={() => firebase.auth().signOut()}>
            <AntDesign name="logout" size={20} color="#634C87" />
          </TouchableOpacity>
        }
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
                <List.Accordion
                  title="Edit Username"
                  id="1"
                  onPress={() => console.log("pj")}
                >
                  <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ textAlign: "center" }}>
                      Changes to your username will be effected immediately.
                    </Text>
                    <TextInput
                      onFocus={clearUserNameErrors}
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
                <List.Accordion
                  title="Edit Password"
                  id="2"
                  onPress={clearPasswordErrors}
                >
                  <View style={{ marginHorizontal: 15 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        onFocus={clearPasswordErrors}
                        error={currentPasswordInvalid}
                        label="Current Password"
                        mode="outlined"
                        style={[{ flex: 1 }, styles.input]}
                        secureTextEntry={passwordVisible}
                        onChangeText={(password) =>
                          setCurrentPassword(password.trim())
                        }
                        value={currentPassword.trim()}
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        onFocus={clearPasswordErrors}
                        error={newPasswordInvalid}
                        label="New Password"
                        mode="outlined"
                        style={[{ flex: 1 }, styles.input]}
                        secureTextEntry={passwordVisible}
                        onChangeText={(password) =>
                          setNewPassword(password.trim())
                        }
                        value={newPassword.trim()}
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
                      onPress={changePasswordHandler}
                    >
                      <Text style={{ color: "#FFF", fontWeight: "500" }}>
                        {passwordLoading ? (
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
              © Copyright 2021 All Rights Reserved
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
