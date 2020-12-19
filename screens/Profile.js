import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import firebase from "../config/Firebase";

export default Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* header style */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Your Profile </Text>
      </View>
      {/* other screens */}
      <View style={{ marginTop: 120 }}>
        <View>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Text>Give us a feedback</Text>
            <MaterialIcons name="feedback" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("Terms and Conditions")}
          >
            <Text>Terms and Conditions</Text>
            <MaterialIcons name="info" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => navigation.navigate("About")}
          >
            <Text>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.logOut}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={{ fontSize: 14, color: "#ffffff" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.layout}>
        <Text style={{ color: "#D3D3D3", fontSize: 10 }}>
          @ Copyright 2021 All Rights Reserved
        </Text>
      </View>
    </View>
  );
};

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
  layout: {
    flexDirection: "row",
    marginTop: 10,
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
