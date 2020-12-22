import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack/AppStack";

import firebase from "../config/Firebase";
import SplashScreen from "../screens/SplashScreen";

export default MainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const MainStack = createStackNavigator();

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return subscriber;
  }, []);

  return (
    <MainStack.Navigator headerMode="none">
      {isLoggedIn === null ? (
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      ) : isLoggedIn === true ? (
        <MainStack.Screen name="App" component={AppStack} />
      ) : (
        <MainStack.Screen name="Auth" component={AuthStack} />
      )}
    </MainStack.Navigator>
  );
};
