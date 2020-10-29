import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase";

export default class Login extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMsg: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMsg: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
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
          {this.state.errorMsg && (
            <Text style={styles.error}>{this.state.errorMsg}</Text>
          )}
        </View>

        {/* //form code */}
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Insert email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Insert password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        {/* //sign in button */}
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign In</Text>
        </TouchableOpacity>

        {/* sign up button */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to Shine Brightly?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>
              Sign Up here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//format
const styles = StyleSheet.create({
  container: {
    flex: 1,
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


