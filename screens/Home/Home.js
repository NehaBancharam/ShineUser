import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import CategoryCard from "../../components/home/CategoryCard";

import firebase from "../../config/Firebase";

const { width, height } = Dimensions.get("screen");

const themeBackground = require("../../assets/home.png");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [selfCarePosts, setSelfCarePosts] = useState([]);
  const [challengePosts, setChallengePosts] = useState([]);
  const [physicalPosts, setPhysicalPosts] = useState([]);

  const [notification, setNotification] = useState(false);

  const [loading, setLoading] = useState(false);

  const userID = firebase.auth().currentUser.uid;
  const notificationListener = useRef();
  const responseListener = useRef();

  const getUserData = () => {
    setLoading(true);

    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .onSnapshot((doc) => {
        setUser(doc.data());
        getCategories();
      });
  };

  const getCategories = () => {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();

    firebase
      .firestore()
      .collection("categories")
      .where("year", "==", year)
      .where("month", "==", month)
      .onSnapshot((querySnapshot) => {
        setSelfCarePosts([]);
        setChallengePosts([]);
        setPhysicalPosts([]);
        querySnapshot.forEach(async (doc) => {
          let completed;
          await firebase
            .firestore()
            .collection("users")
            .doc(userID)
            .get()
            .then((user) => {
              completed = user.data().categoriesCompleted.includes(doc.id);
            });
          if (doc.data().category === "selfcare") {
            setSelfCarePosts((previousPosts) => [
              ...previousPosts,
              {
                id: doc.id,
                ...doc.data(),
                completed,
              },
            ]);
          }
          if (doc.data().category === "challenge") {
            setChallengePosts((previousPosts) => [
              ...previousPosts,
              {
                id: doc.id,
                ...doc.data(),
                completed,
              },
            ]);
          }
          if (doc.data().category === "physical") {
            setPhysicalPosts((previousPosts) => [
              ...previousPosts,
              {
                id: doc.id,
                ...doc.data(),
                completed,
              },
            ]);
          }
        });
        setLoading(false);
      });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;

        firebase.firestore().collection("users").doc(userID).update({
          push_token: token,
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  useEffect(() => getUserData(), []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView scrollEnabled>
          {/* header style */}
          <View style={styles.header}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>
              Hi {user.username}!
            </Text>
          </View>

          <View style={{ height: "20%", padding: 15 }}>
            <ImageBackground
              style={styles.img}
              source={themeBackground}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text
                style={{
                  fontFamily: "ibarra-italic",
                  color: "#ffffff",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                Monthly
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{
              height: 1000,
              backgroundColor: "white",
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 15,
              }}
            >
              <Text>Tasks To Complete</Text>
            </View>
            <View>
              <Text style={{ paddingVertical: 15 }}>Self Care</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={selfCarePosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CategoryCard
                    title="Self Care"
                    item={item}
                    navigation={navigation}
                  />
                )}
              />
            </View>
            <View>
              <Text style={{ paddingVertical: 15 }}>Challenge</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={challengePosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CategoryCard
                    title="Challenge"
                    item={item}
                    navigation={navigation}
                  />
                )}
              />
            </View>
            <View>
              <Text style={{ paddingVertical: 15 }}>Physical</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={physicalPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CategoryCard
                    title="Physical"
                    item={item}
                    navigation={navigation}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D8D9DB",
  },
  imgText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    elevation: 5,
  },
});
