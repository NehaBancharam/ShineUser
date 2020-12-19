import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

export default Home = () => {
  const themeBackground = require("../assets/home.png");
  return (
    <ScrollView scrollEnabled>
      <View style={styles.container}>
        {/* header style */}
        <View style={styles.header}>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>Hi Neha!</Text>
        </View>
        <View style={{ flex: 1, padding: 15 }}>
          <ImageBackground
            style={styles.img}
            source={themeBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <Text
              style={{
                fontFamily: "ibarra-italic",
                color: "#ffffff",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              Monthly
            </Text>
          </ImageBackground>
        </View>
        <View
          style={{ flex: 2, backgroundColor: "white", marginHorizontal: 15 }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 15,
            }}
          >
            <Text>Tasks To Complete</Text>
          </View>
          <View>
            <Text style={{ paddingVertical: 15 }}>Self Care</Text>
            <View
              style={{
                width: width / 4,
                height: 100,
                backgroundColor: "black",
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 3, backgroundColor: "blue" }}></View>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Task Name</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    paddingTop: 25,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D8D9DB",
  },
  imgText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    elevation: 5,
  },
});
