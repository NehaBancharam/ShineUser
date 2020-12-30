import React, { useEffect, useState } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "../screens/Authentication/Login";
import SignUp from "../screens/Authentication/SignUp";
import ForgotPassword from "../screens/Authentication/ForgotPassword";
import OnBoarding from "../screens/Authentication/OnBoarding";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../screens/SplashScreen";

const AuthStack = () => {
  const AuthStack = createStackNavigator();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <AuthStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {isFirstLaunch === null ? (
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      ) : (
        <>
          {isFirstLaunch === true ? (
            <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
          ) : (
            <></>
          )}
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </AuthStack.Navigator>
  );
};
export default AuthStack;
