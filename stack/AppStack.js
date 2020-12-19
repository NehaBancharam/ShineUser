import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ProfileStack from "./ProfileStack";
import Home from "../screens/Home";
import Feed from "../screens/Feed";
import Post from "../screens/Post";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  showLabel: true,
  labelStyle:{
    color:"#E4D7F1",
    
  },
  style: {
    backgroundColor: "#ffffff",
    padding: 5,
  },
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
        size={33}
        color={focused ? "#634C87" : "#D3D3D3"}
        
      />
    );
  },
});

export default BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Feed" component={Feed} options={{tabBarBadge: 2}} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
