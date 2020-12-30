import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ProfileStack from "./ProfileStack";
import FeedStack from "./FeedStack";
import HomeStack from "./HomeStack";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

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

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} barStyle={barStyle} shifting>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
