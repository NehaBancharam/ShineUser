import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Linking,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { HelperText } from "react-native-paper";
import * as Notifications from "expo-notifications";

import * as Speech from "expo-speech";

import { MaterialIcons } from "@expo/vector-icons";

import firebase from "../../config/Firebase";
import Header from "../../components/Header";

const { width, height } = Dimensions.get("screen");

const ViewCategory = ({ navigation, route }) => {
  const {
    id,
    title,
    name,
    description,
    image,
    resources,
    completed,
    qr,
  } = route.params;

  const [narrationStarted, setNarrationStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [loading, setLoading] = useState(false);

  const [correctQR, setCorrectQR] = useState(true);

  const userID = firebase.auth().currentUser.uid;

  const getLocationPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onScanPress = () => {
    navigation.navigate("ScanCode", { qr, handleQRScan });
  };

  const handleQRScan = (successful) => {
    if (successful) {
      completeActivity();
      setCorrectQR(true);
    } else {
      setCorrectQR(false);
    }
  };

  const completeActivity = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .update({
        categoriesCompleted: firebase.firestore.FieldValue.arrayUnion(id),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("categories")
          .doc(id)
          .update({
            completedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          })
          .then(() => {
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Completed A Task",
                body: `🎉🎉 Congratulations on completing the ${name} task 🎉🎉`,
                color: "#11ffed00",
              },
              trigger: {
                seconds: 2,
              },
            });
            setIsCompleted(true);
            setLoading(false);
          });
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title={title}
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, marginHorizontal: 15, paddingBottom: 100 }}>
          <View
            style={{
              width: "100%",
              height: Dimensions.get("screen").height / 2.5,
            }}
          >
            <Image
              source={{ uri: image.imageUrl }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ marginRight: 5, fontSize: 20, fontWeight: "bold" }}
              >
                {name}
              </Text>
              {qr ? (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("google.navigation:q=mountain+le+pouce")
                  }
                >
                  <MaterialIcons name="directions" size={24} />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                if (narrationStarted) {
                  Speech.stop();
                  setNarrationStarted(false);
                } else {
                  Speech.speak(description, { pitch: 1, rate: 1 });
                  setNarrationStarted(true);
                }
              }}
            >
              <Text
                style={{
                  marginVertical: 5,
                  textAlign: "justify",
                }}
              >
                {description}
              </Text>
            </TouchableWithoutFeedback>

            {qr ? (
              <HelperText type="error" visible={!correctQR}>
                Incorrect QR Code. Are you at the right location?
              </HelperText>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#E9446A",
                alignItems: "center",
                paddingVertical: 10,
                marginVertical: 15,
                borderRadius: 20,
              }}
              disabled={isCompleted}
              onPress={() => {
                qr ? onScanPress() : completeActivity();
              }}
            >
              <Text style={{ color: "white" }}>
                {loading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : isCompleted ? (
                  <MaterialIcons name="check" size={24} />
                ) : qr ? (
                  "Scan QR Code"
                ) : (
                  "Complete"
                )}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginVertical: 15,
                borderTopWidth: 1,
                borderTopColor: "gray",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Resources</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={resources}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#634C87",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginVertical: 15,
                      marginHorizontal: 5,
                      borderRadius: 20,
                    }}
                    onPress={() => Linking.openURL(item)}
                  >
                    <Text style={{ color: "white" }}>Link{index + 1}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ViewCategory;
