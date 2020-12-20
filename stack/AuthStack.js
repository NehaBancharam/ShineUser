import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Authentication/Login";
import SignUp from "../screens/Authentication/SignUp";
import ForgotPassword from "../screens/Authentication/ForgotPassword";

export default AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};
