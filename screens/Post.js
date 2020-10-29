import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Fire from "../Fire";

const firebase = require("firebase");
require("firebase/firestore");

export default class Post extends React.Component {
  state = {
    text: "",
  };

  /* componentDidMount() {
    this.handlePost();
  } */

  handlePost = () => {
    Fire.shared
      .addPost({
        text: this.state.text.trim(),
      })
      .then((ref) => {
        this.setState({ text: "" });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //rendering part
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* header style */}
        <View style={styles.header}>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>Post </Text>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/login.png")}
            style={styles.avatar}
          ></Image>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Share your journey with other Shine Brightly members!"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.handlePost}>
          <MaterialIcons
            name="check-circle"
            size={40}
            color="#634C87"
          ></MaterialIcons>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 15,
  },
});
