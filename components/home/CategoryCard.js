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
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ViewCategory", {
          title,
          ...item,
        })
      }
    >
      <View
        style={{
          margin: 10,
          padding: 10,
          elevation: 3,
          backgroundColor: "white",
          width: 150,
          height: 150,
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 4 }}>
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
            source={{ uri: item.image.imageUrl }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryCard;
