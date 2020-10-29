import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";
import About from "../profileScreens/About";
import Feedback from "../profileScreens/Feedback";
import TandC from "../profileScreens/TandC";

const Stack = createStackNavigator();

export default ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Terms and Conditions" component={TandC} />
    </Stack.Navigator>
  );
};
