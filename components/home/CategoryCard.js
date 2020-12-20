import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const CategoryCard = ({ navigation, item, title }) => {
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        elevation: 3,
        backgroundColor: "white",
        width: width / 2,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ViewCategory", {
            title,
            ...item,
          })
        }
      >
        {item.completed ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(0, 191, 51, 0.05)",
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="check-circle" size={50} color="green" />
          </View>
        ) : (
          <></>
        )}
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: 100 }}
        />
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryCard;
