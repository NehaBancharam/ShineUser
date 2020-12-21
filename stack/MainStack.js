import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack/AppStack";

import firebase from "../config/Firebase";

export default MainStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const MainStack = createStackNavigator();

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <MainStack.Navigator headerMode="none">
      {isLoggedIn ? (
        <MainStack.Screen name="App" component={AppStack} />
      ) : (
        <MainStack.Screen name="Auth" component={AuthStack} />
      )}
    </MainStack.Navigator>
  );
};
