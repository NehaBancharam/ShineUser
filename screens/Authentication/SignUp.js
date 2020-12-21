import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from "react-native";

import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "../../config/Firebase";
import ReservedWords from "../../constants/ReservedWords";

const logo = require("../../assets/signup.png");

const { height } = Dimensions.get("screen");

const SignUp = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const clearErrors = () => {
    setErrorMessage("");
    setUsernameInvalid(false);
    setEmailInvalid(false);
    setPasswordInvalid(false);
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

  const signUpHandler = () => {
    clearErrors();

    setLoading(true);
    let regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;

    if (email.length === 0 && password.length === 0 && username.length === 0) {
      setErrorMessage("Fields cannot be left blank");
      setUsernameInvalid(true);
      setEmailInvalid(true);
      setPasswordInvalid(true);
      setLoading(false);
    } else if (username.length === 0) {
      setErrorMessage("Enter your name.");
      setUsernameInvalid(true);
      setLoading(false);
    } else if (email.length === 0) {
      setErrorMessage("Enter your email.");
      setEmailInvalid(true);
      setLoading(false);
    } else if (password.length === 0) {
      setErrorMessage("Enter your password.");
      setPasswordInvalid(true);
      setLoading(false);
    } else if (!regex.test(password)) {
      setErrorMessage(
        "Password must contain atleast 1 capital, 1 small letter and 1 number and be 6 characters long."
      );
      setPasswordInvalid(true);
      setLoading(false);
    } else if (username.length > 0) {
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
              setLoading(false);
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  let userID = firebase.auth().currentUser.uid;
                  firebase.firestore().collection("users").doc(userID).set({
                    username,
                    posts: [],
                    categoriesCompleted: [],
                    dateJoined: firebase.firestore.Timestamp.now(),
                  });
                })
                .catch((error) => {
                  checkErrorCode(error.code);
                  setLoading(false);
                });
            }
          });
      } else {
        setErrorMessage(
          "Username not valid. Please choose another one. Thank you very much, Hallelujah, Hail Jesussss"
        );
        setUsernameInvalid(true);
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          navigation.goBack();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    marginBottom: 15,
                    textAlign: "center",
                    color: "purple",
                    fontWeight: "bold",
                  }}
                >
                  The terms defined below govern your use of Shine Brightly and
                  its services and functionalities. By using this app, you are
                  agreeing to abide by these terms.
                </Text>
                <Text>For the purposes of this Terms of Use:</Text>
                <Text>
                  {"\u2B24"}“We”, “Service” and “Activities” refers to the Shine
                  Brightly app.
                  {"\n"}
                  {"\u2B24"}“You” and “Your” refers to you as the user making
                  use of the Service. {"\n"}
                </Text>

                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    “Use at Your Own Risk” Disclaimer
                  </Text>
                  <Text>
                    This Service is not meant to be used as an alternative for
                    medical treatment or advice. All the activities that You
                    partake in should be done with care. We will not be liable
                    for any mishaps, illness or damages caused by Your usage of
                    the Service. If You have any medical queries about
                    participating in certain Activities, please contact seek
                    professional medical advice first.{"\n"}
                  </Text>
                </View>

                <View>
                  <Text style={{ fontWeight: "bold" }}>Prohibited Conduct</Text>
                  <Text>
                    You agree to use the Service by accepting the rules and
                    regulations below. Any violation of these rules shall be
                    fully Your responsibility and can lead to termination of
                    Your account. By using this Service, you agree not to:
                    {"\n"}
                    {"\u2B24"}Exhibit any behaviour such as harassment or
                    intimidation to other users.{"\n"}
                    {"\u2B24"}Use the Service in any manner to make it less
                    pleasant for others such as posting offensive, demeaning
                    comments on other users’ post.{"\n"}
                    {"\u2B24"}Attempt to corrupt or crash the Service by
                    “flooding” it with requests.{"\n"}
                    {"\u2B24"}Reverse engineer any aspect of the Service for
                    Your personal gain.{"\n"}
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>
                  <Text>
                    The personal information collected by this Service will be
                    used to provide You with a better experience. All
                    information gathered will not be shared with anyone except
                    by third party services used to identify You:{"\n"}
                    {"\u2B24"}Facebook{"\n"}
                    {"\u2B24"}Google Analytics for Firebase{"\n"}
                    We value Your trust in providing all personal information
                    required. However, no electronic media is 100% protected and
                    thus We cannot guarantee its total security.
                  </Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Termination</Text>
                  <Text>
                    If You fail to abide by the Terms of Use, We have the right
                    to terminate access to the Service and Your account. We
                    shall not be held accountable for any harm or loss of
                    information lead by the termination of Your account.
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>
                I agree to the Terms and Condition.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        {/* header style */}
        <View
          style={{
            marginTop: -65,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={logo}></Image>
        </View>

        <View
          style={{
            position: "absolute",
            top: 24,
            width: "100%",
          }}
        >
          <Text style={styles.greeting}>{"Hello!\nSign Up here"}</Text>
        </View>

        {/* error msg display */}
        {errorMessage ? (
          <View style={styles.errorMsg}>
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
        ) : (
          <></>
        )}

        {/* //form code */}
        <View style={styles.form}>
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
          <TextInput
            onFocus={clearErrors}
            error={emailInvalid}
            label="Email"
            mode="outlined"
            style={styles.input}
            onChangeText={(email) => setEmail(email.trim())}
            value={email.trim()}
            keyboardType="email-address"
            theme={{ colors: { primary: "purple" } }}
          />
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
              onChangeText={(password) => setPassword(password.trim())}
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
        </View>

        {/* //sign up button */}
        <TouchableOpacity style={styles.button} onPress={signUpHandler}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Sign Up"
            )}
          </Text>
        </TouchableOpacity>

        {/* sign in back */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    backgroundColor: "white",
  },
  greeting: {
    marginTop: 15,
    marginBottom: 15,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
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
  form: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    fontSize: 13,
    color: "#161F3D",
    backgroundColor: "white",
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    elevation: 5,
  },
  acceptButton: {
    marginTop: 15,
    backgroundColor: "purple",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
