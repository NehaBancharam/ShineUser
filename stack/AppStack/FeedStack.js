import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Post from "../../screens/Post";
import Feed from "../../screens/Feed";

const Stack = createStackNavigator();

export default FeedStack = () => {
  return (
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
};
