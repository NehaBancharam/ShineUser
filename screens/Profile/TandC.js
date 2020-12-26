import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import TermsAndConditions from "../../components/TermsAndConditions";

import { MaterialIcons } from "@expo/vector-icons";

export default Terms = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
      />
      <View
        style={{ padding: 15, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Terms and Conditions
        </Text>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <TermsAndConditions />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
