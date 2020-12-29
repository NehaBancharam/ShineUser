import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../config/Firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorMessage from "../../components/ErrorMessage";

const logo = require("../../assets/login.png");

const Login = ({ navigation }) => {
  // Screen states
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
    setPasswordInvalid(false);
    setEmailInvalid(false);
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
    if (code === "auth/user-not-found") {
      setErrorMessage("No account with this email found.");
    }
    if (code === "auth/wrong-password") {
      setErrorMessage("Incorrect password. Try again.");
      setPasswordInvalid(true);
    }
  };

  // Handles Sign in logic
  const signInHandler = () => {
    clearErrors();

    setLoading(true);

    // Check email and password length
    if (email.length === 0 && password.length === 0) {
      setErrorMessage("Enter your email and password.");
      setEmailInvalid(true);
      setPasswordInvalid(true);
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
    // Values properly entered
    else {
      // Sign in using Firebase auth()
      // If successful, AuthStack is removed and AppStack is loaded (see MainStack)
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password) // Sign user in
        .then(() => setLoading(false)) // Stops loading
        .catch((error) => {
          checkErrorCode(error.code); // Display error message using error codes
          setLoading(false); // Stops loading
        });
    }
  };

  // Navigate to ForgotPassword screen
  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  // Navigate to SignUp screen
  const signUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={{ width: "60%" }} />
        </View>

        {/* Display error message */}
        <ErrorMessage errorMessage={errorMessage} />

        {/* Sign in Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <TextInput
            onFocus={clearErrors}
            error={emailInvalid}
            label="Email Address"
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
          {/* Forgot Password button */}
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity onPress={forgotPassword}>
              <Text style={{ fontSize: 13, color: "gray", paddingTop: 5 }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={signInHandler}>
          <Text style={styles.buttonText}>
            {/* Checks if loading; displays spinner if yes else displays Sign In */}
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Sign In"
            )}
          </Text>
        </TouchableOpacity>
        {/* Sign Up text and button */}
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>New to Shine Brightly? </Text>
          <TouchableOpacity onPress={signUp}>
            <Text style={styles.signUpTextMain}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    marginTop: 45,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 15,
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
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  signUpTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 25,
  },
  signUpText: {
    color: "#414959",
    fontSize: 13,
  },
  signUpTextMain: {
    fontSize: 13,
    fontWeight: "500",
    color: "#E9446A",
  },
});
