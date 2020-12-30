import React, { useState } from "react";
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
} from "react-native";

import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "../../config/Firebase";
import ReservedWords from "../../constants/ReservedWords";
import TermsAndConditions from "../../components/TermsAndConditions";
import ErrorMessage from "../../components/ErrorMessage";

const logo = require("../../assets/signup.png");

const SignUp = ({ navigation }) => {
  // Screen states
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

  // Clears any errors and invalid check states
  const clearErrors = () => {
    setErrorMessage("");
    setUsernameInvalid(false);
    setEmailInvalid(false);
    setPasswordInvalid(false);
  };

  // Checks error codes sent by Firebase and sets error message accordingly
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

  // Handles Sign up logic
  const signUpHandler = () => {
    clearErrors();

    setLoading(true);
    let regex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/; // Regular expression for password

    // Check email, password and username length
    if (email.length === 0 && password.length === 0 && username.length === 0) {
      setErrorMessage("Fields cannot be left blank");
      setUsernameInvalid(true);
      setEmailInvalid(true);
      setPasswordInvalid(true);
      setLoading(false);
    }
    // Check username length
    else if (username.length === 0) {
      setErrorMessage("Enter a username.");
      setUsernameInvalid(true);
      setLoading(false);
    }
    // Check email length
    else if (email.length === 0) {
      setErrorMessage("Enter your email.");
      setEmailInvalid(true);
      setLoading(false);
    }
    // Check password length
    else if (password.length === 0) {
      setErrorMessage("Enter your password.");
      setPasswordInvalid(true);
      setLoading(false);
    }
    // Check password using regex
    else if (!regex.test(password)) {
      setErrorMessage(
        "Password must contain atleast 1 capital, 1 small letter and 1 number and be 6 characters long."
      );
      setPasswordInvalid(true);
      setLoading(false);
    } else if (username.length > 0) {
      // Check if password matches with any reserve words
      if (!ReservedWords.includes(username.toLocaleLowerCase())) {
        // Check if username already taken
        firebase
          .firestore()
          .collection("users")
          .where("username", "==", username)
          .get()
          .then((querySnapshot) => {
            // Username taken
            if (!querySnapshot.empty) {
              setErrorMessage("Username already taken.");
              setUsernameInvalid(true);
              setLoading(false);
            }
            // Username valid
            // Create new user with email and password
            // If user created, AuthStack is removed and AppStack is loaded (see MainStack)
            else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  let userID = firebase.auth().currentUser.uid; // Get current user's id
                  // Create new user document in Firebase firestore and sets details
                  firebase.firestore().collection("users").doc(userID).set({
                    username,
                    posts: [],
                    categoriesCompleted: [],
                    dateJoined: firebase.firestore.Timestamp.now(),
                  });
                })
                .catch((error) => {
                  checkErrorCode(error.code); // Display error message using error codes
                  setLoading(false); // Stops loading
                });
            }
          });
      } else {
        setErrorMessage(
          "Username not valid. Please choose another one."
        );
        setUsernameInvalid(true);
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Terms and Conditions Modal */}
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
            <TermsAndConditions />
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
        {/* Header */}
        <View style={styles.header}>
          <Image source={logo} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{"Hello!\nSign Up here"}</Text>
        </View>

        {/* Error Message */}
        <ErrorMessage errorMessage={errorMessage} />

        {/* Sign Up Form */}
        <View style={styles.form}>
          {/* Username Input */}
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
          {/* Email Input */}
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
          {/* Password Input */}
          <View style={styles.passwordContainer}>
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
            {/* Password visibility toggle */}
            <TouchableOpacity
              style={styles.showPasswordIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <MaterialCommunityIcons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={signUpHandler}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>
            {/* Checks if loading; displays spinner if yes else displays Sign Up */}
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Sign Up"
            )}
          </Text>
        </TouchableOpacity>

        {/* Sign Up text and button */}
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
    backgroundColor: "white",
  },
  header: {
    marginTop: -65,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingContainer: {
    position: "absolute",
    top: 24,
    width: "100%",
  },
  greeting: {
    marginTop: 15,
    marginBottom: 15,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "400",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showPasswordIcon: {
    marginLeft: 15,
    position: "absolute",
    right: 15,
    alignSelf: "center",
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
