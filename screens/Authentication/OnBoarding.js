import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { MaterialIcons } from "@expo/vector-icons";

const OnBoarding = ({ navigation }) => {
  const NextButton = ({ ...props }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
      }}
      {...props}
    >
      <Text style={{ color: "white", fontSize: 15 }}>Done</Text>
      <MaterialIcons name="navigate-next" size={24} color="white" />
    </TouchableOpacity>
  );
  const DoneButton = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <MaterialIcons
        name="check-circle"
        size={24}
        color="white"
        style={{ marginHorizontal: 15 }}
      />
    </TouchableOpacity>
  );
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      pages={[
        {
          backgroundColor: "#70ae98",
          image: (
            <Image
              source={require("../../assets/onboarding/onb-1.png")}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
              }}
            />
          ),
          title: "Onboarding 1",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#5cbe7a",
          image: (
            <Image
              source={require("../../assets/onboarding/onb-2.png")}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
              }}
              resizeMode="contain"
            />
          ),
          title: "Onboarding 2",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#e58b88",
          image: (
            <Image
              source={require("../../assets/onboarding/onb-3.png")}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
              }}
              resizeMode="contain"
            />
          ),
          title: "Onboarding 3",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OnBoarding;
