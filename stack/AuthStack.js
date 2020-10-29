import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

export default AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
