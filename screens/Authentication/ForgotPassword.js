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

import { MaterialIcons } from "@expo/vector-icons";
import ErrorMessage from "../../components/ErrorMessage";

const logo = require("../../assets/login.png");

const ForgotPassword = ({ navigation }) => {
  // Screen states
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(false);

  // Clears any errors and invalid check states
  const clearErrors = () => {
    setErrorMessage("");
    setEmailInvalid(false);
  };

  // Checks error codes sent by Firebase and sets error message and invalid states accordingly
  const errorMessageHandler = (code) => {
    if (code === "auth/too-many-requests") {
      setErrorMessage("Too many requests. Try again later.");
      setLoading(false);
    } else if (code === "auth/user-not-found") {
      setErrorMessage("User not found");
      setEmailInvalid(true);
      setLoading(false);
    } else if (code === "auth/invalid-email") {
      setErrorMessage("Invalid email");
      setEmailInvalid(true);
      setLoading(false);
    }
  };

  // Handles Reset password logic
  const resetPasswordHandler = () => {
    clearErrors();

    setLoading(true);

    // Check email length
    if (email.length === 0) {
      setErrorMessage("Enter your email.");
      setEmailInvalid(true);
      setLoading(false);
    } else {
      // Send email with reset link
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoading(false);
          setReset(true);
        })
        .catch((error) => {
          errorMessageHandler(error.code);
          console.log(error.code);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image source={logo} resizeMode="contain" style={{ width: "60%" }} />
        </View>
        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Enter your account's email. An email will be sent to you with a
            password reset link. You can change your password from there.
          </Text>
        </View>
        {/* Error Message */}
        <ErrorMessage errorMessage={errorMessage} />

        {/* //form code */}
        <View style={styles.form}>
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
        </View>

        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: reset ? "#00bf33" : "#E9446A",
          }}
          onPress={
            reset ? () => navigation.navigate("Login") : resetPasswordHandler
          }
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : reset ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ color: "#FFF", fontWeight: "bold", marginRight: 5 }}
              >
                Sign In
              </Text>
              <MaterialIcons name="check" size={24} color="white" />
            </View>
          ) : (
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              Reset Password
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingVertical: 25,
          }}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Want to sign in instead?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: "#E9446A" }}>
              Sign In here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 15,
  },
  message: {
    textAlign: "center",
    fontWeight: "bold",
  },
  form: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    fontSize: 15,
    color: "#161F3D",
    backgroundColor: "white",
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 30,
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForgotPassword;
