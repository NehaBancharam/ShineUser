import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./stack/MainStack";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    ibarra: require("./assets/fonts/ibarra.ttf"),
    "ibarra-italic": require("./assets/fonts/ibarra-italic.ttf"),
    "ibarra-italic-bold": require("./assets/fonts/ibarra-italic-bold.ttf"),
  });
};

export default App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  } else {
    return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    );
  }
};
