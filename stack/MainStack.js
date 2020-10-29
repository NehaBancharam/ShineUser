import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default MainStack = () => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator headerMode="none">
      {/* <MainStack.Screen name="Auth" component={AuthStack} /> */}
      <MainStack.Screen name="App" component={AppStack} />
    </MainStack.Navigator>
  );
};
