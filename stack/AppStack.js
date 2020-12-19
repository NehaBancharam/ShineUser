import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ProfileStack from "./ProfileStack";
import Home from "../screens/Home";
import Feed from "../screens/Feed";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "../screens/Post";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

const barStyle = {
  backgroundColor: "white",
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName = "home";

    switch (route.name) {
      case "Home":
        iconName = "home";
        break;

      case "Post":
        iconName = "add-circle";
        break;

      case "Feed":
        iconName = "rss-feed";
        break;

      case "Profile":
        iconName = "person";
        break;

      default:
        iconName = "home";
    }
    return (
      <MaterialIcons
        name={iconName}
        size={24}
        color={focused ? "#634C87" : "#D3D3D3"}
      />
    );
  },
});

const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ViewFeed"
      component={Feed}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Post"
      component={Post}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} barStyle={barStyle} shifting>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
