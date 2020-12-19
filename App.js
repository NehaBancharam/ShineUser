import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./stack/MainStack";
import Loading from "./screens/Loading";

export default App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? <Loading /> : <MainStack />}
    </NavigationContainer>
  );
};
