import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default Home = () => {
  return (
    <View style={styles.container}>
      {/* header style */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Hi Neha!</Text>
      </View>
      <View>
        <Image
          style={styles.img}
          source={require("../assets/home.png")}
        ></Image>
        <View style={styles.imgText}>
          <Text style={{ marginTop: -120, color: "#ffffff", fontSize: 30 }}>
            Monthly THEME 
          </Text>
        </View>
      </View>
      <View style={{margin: 10}}>
        <Text>Self care</Text>
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
    marginTop: 30,
    justifyContent: "flex-start",
    marginLeft: -10,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D8D9DB",
  },
  imgText: {
    flexDirection: "row",
    justifyContent:"center",
  },
  img: {
    height: 200,
  },
});
