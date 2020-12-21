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
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { HelperText } from "react-native-paper";
import * as Notifications from "expo-notifications";

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
    imageUrl,
    resources,
    completed,
    qr,
  } = route.params;

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

  const handleQRScan = (completed) => {
    if (completed) {
      completeActivity();
      console.log("Completed");
      setCorrectQR(true);
    } else {
      console.log("Nope");
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
                seconds: 5,
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
        title={<Text style={{ fontWeight: "500", fontSize: 20 }}>{title}</Text>}
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: imageUrl }}
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
              <Text style={{ marginRight: 5 }}>{name}</Text>
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
            <Text style={{ marginVertical: 5 }}>{description}</Text>

            <HelperText type="error" visible={!correctQR}>
              Incorrect QR Code. Are you at the right location?
            </HelperText>
            <TouchableOpacity
              style={{
                backgroundColor: isCompleted ? "#00ad2e" : "#00bf33",
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
              <Text>Resources</Text>
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
