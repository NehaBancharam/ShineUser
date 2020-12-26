import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack/AppStack";

import firebase from "../config/Firebase";
import SplashScreen from "../screens/SplashScreen";
import { Alert } from "react-native";
import NoInternet from "../screens/NoInternet";

export default MainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isConnected, setIsConnected] = useState(null);

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

  useEffect(() => {
    const subscriber = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

    // To unsubscribe to these update, just use:
    return subscriber;
  });

  return (
    <MainStack.Navigator headerMode="none">
      {isLoggedIn === null ? (
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      ) : isConnected ? (
        isLoggedIn === true ? (
          <MainStack.Screen name="App" component={AppStack} />
        ) : (
          <MainStack.Screen name="Auth" component={AuthStack} />
        )
      ) : (
        <MainStack.Screen name="NoInternet" component={NoInternet} />
      )}
    </MainStack.Navigator>
  );
};
