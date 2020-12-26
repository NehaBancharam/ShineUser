import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/Profile/Profile";
import Feedback from "../../screens/Profile/Feedback";
import TandC from "../../screens/Profile/TandC";

const Stack = createStackNavigator();

export default ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms and Conditions"
        component={TandC}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
