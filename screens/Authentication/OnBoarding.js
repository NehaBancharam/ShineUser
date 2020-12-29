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
      <Text style={{ color: "white", fontSize: 15 }}>Next</Text>
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
          backgroundColor: "#E083A3",
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
          title: "Welcome to Shine Brightly!",
          subtitle:
            "Embark on a journey to enhance the quality of your life by using a holistic approach to self development.",
        },
        {
          backgroundColor: "#F4A943",
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
          title: " Complete monthly tasks.",
          subtitle:
            "Each month you will given a list of tasks to complete ranging from self care and physical activities to help both your mental and physical health.",
        },
        {
          backgroundColor: "#70BEC1",
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
          title: "Get out of your comfort zone.",
          subtitle:
            "There will also be challenges for you to help you get out of your comfort zone and connect with members of the society.",
        },
        {
          backgroundColor: "#e58b88",
          image: (
            <Image
              source={require("../../assets/onboarding/onb-4.png")}
              style={{
                width: "100%",
                height: 200,
                resizeMode: "contain",
              }}
              resizeMode="contain"
            />
          ),
          title: "Connect with other members.",
          subtitle:
            "Share your thoughts and progress with other members of the Shine Brightly family.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OnBoarding;
