import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import firebase from "../config/Firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const signInHandler = () => {
    setErrorMessage("");
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setLoading(false))
      .catch((error) => setLoading(false));
  };

  return (
    <ScrollView scrollEnabled>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View
          style={{
            marginTop: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/login.png")}></Image>
        </View>

        <View style={styles.errorMsg}>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : (
            <></>
          )}
        </View>

        {/* //form code */}
        <View style={styles.form}>
          <View>
            <TextInput
              label="Email Address"
              mode="outlined"
              style={styles.input}
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </View>
          <View
            style={{
              marginTop: 32,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              label="Password"
              mode="outlined"
              style={[{ flex: 1 }, styles.input]}
              secureTextEntry={passwordVisible}
              onChangeText={(password) => setPassword(password)}
              value={password}
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

        {/* //sign in button */}
        <TouchableOpacity style={styles.button} onPress={signInHandler}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              "Sign In"
            )}
          </Text>
        </TouchableOpacity>

        {/* sign up button */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to Shine Brightly?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>
              Sign Up here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
//format
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  errorMsg: {
    height: 40,
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
  form: {
    marginBottom: 42,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
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
