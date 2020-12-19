import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, Switch } from "react-native";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";

export default class SignUp extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    user: {
      name: "",
      email: "",
      password: "",
    },
    errorMsg: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        {/* header style */}
        <View
          style={{
            marginTop: -55,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/signup.png")}></Image>
        </View>

        <View
          style={{
            position: "absolute",
            top: 24,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.greeting}>{"Hello!\nSign Up here"}</Text>
        </View>

        {/* error msg display */}
        <View style={styles.errorMsg}>
          {this.state.errorMsg && (
            <Text style={styles.error}>{this.state.errorMsg}</Text>
          )}
        </View>

        {/* //form code */}
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>UserName</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoFocus
              placeholder="Insert user name"
              onChangeText={(name) =>
                this.setState({ user: { ...this.state.user, name } })
              }
              value={this.state.user.name}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Insert email"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              value={this.state.user.email.trim()}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={this.state.showPassword}
              autoCapitalize="none"
              placeholder="Insert password"
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              value={this.state.user.password.trim()}
            ></TextInput>
          </View>
        </View>

        {/* //sign up button */}
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Up</Text>
        </TouchableOpacity>

        {/* sign in back */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 25 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign In</Text>
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
  greeting: {
    marginTop: 32,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMsg: {
    height: 50,
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
    marginBottom: 48,
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
