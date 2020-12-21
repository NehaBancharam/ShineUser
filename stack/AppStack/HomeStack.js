import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home/Home";
import ViewCategory from "../../screens/Home/ViewCategory";
import ScanCode from "../../screens/Home/ScanCode";

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewCategory"
        component={ViewCategory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanCode"
        component={ScanCode}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
