import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../../config/Firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

const logo = require("../../assets/login.png");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const clearErrors = () => {
    setErrorMessage("");
    setPasswordInvalid(false);
    setEmailInvalid(false);
  };

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

  const signInHandler = () => {
    clearErrors();

    setLoading(true);

    if (email.length === 0 && password.length === 0) {
      setErrorMessage("Enter your email and password.");
      setEmailInvalid(true);
      setPasswordInvalid(true);
      setLoading(false);
    } else if (email.length === 0) {
      setErrorMessage("Enter your email.");
      setEmailInvalid(true);
      setLoading(false);
    } else if (password.length === 0) {
      setErrorMessage("Enter your password.");
      setPasswordInvalid(true);
      setLoading(false);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => setLoading(false))
        .catch((error) => {
          checkErrorCode(error.code);
          setLoading(false);
        });
    }
  };

  const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <ScrollView scrollEnabled>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View
          style={{
            marginTop: 45,
            marginBottom: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={logo}></Image>
        </View>

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
            error={emailInvalid}
            label="Email Address"
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
          <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity onPress={forgotPassword}>
              <Text style={{ fontSize: 13, color: "gray", paddingTop: 5 }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={signInHandler}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Sign In"
            )}
          </Text>
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
            New to Shine Brightly?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: "#E9446A" }}>
              Sign Up here
            </Text>
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
    height,
    backgroundColor: "white",
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
    fontSize: 15,
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
});
