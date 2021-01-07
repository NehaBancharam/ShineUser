import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import CategoryCard from "../../components/home/CategoryCard";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

import firebase from "../../config/Firebase";

const themeBackground = require("../../assets/theme-bg.jpg");
const avatar = require("../../assets/avatar.png");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [monthlyTheme, setMonthlyTheme] = useState(null);
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
        getMonthlyTheme(doc.data().categoriesCompleted);
      });
  };

  const getMonthlyTheme = (categoriesCompleted) => {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();

    firebase
      .firestore()
      .collection("monthlyTheme")
      .where("year", "==", year)
      .where("month", "==", month)
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setMonthlyTheme({
              id: doc.id,
              ...doc.data(),
            });
            firebase
              .firestore()
              .collection("categories")
              .where("monthlyThemeId", "==", doc.id)
              .onSnapshot((querySnapshot) => {
                let tempSelfCare = [];
                let tempChallenge = [];
                let tempPhysical = [];

                querySnapshot.forEach(async (doc) => {
                  let completed = false;

                  if (categoriesCompleted.includes(doc.id)) completed = true;
                  if (doc.data().category === "selfcare") {
                    tempSelfCare.push({
                      id: doc.id,
                      ...doc.data(),
                      completed,
                    });
                  }
                  if (doc.data().category === "challenge") {
                    tempChallenge.push({
                      id: doc.id,
                      ...doc.data(),
                      completed,
                    });
                  }
                  if (doc.data().category === "physical") {
                    tempPhysical.push({
                      id: doc.id,
                      ...doc.data(),
                      completed,
                    });
                  }
                });
                setSelfCarePosts(tempSelfCare);
                setChallengePosts(tempChallenge);
                setPhysicalPosts(tempPhysical);
                setLoading(false);
              });
          });
        }
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

  useEffect(() => {
    const subscriber = getUserData();
    return subscriber;
  }, []);

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
    return <Loading label="Loading" />;
  } else {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* header style */}
          <Header
            style={styles.header}
            left={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: "#D8D9DB",
                    backgroundColor: "white",
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={avatar}
                    resizeMode="cover"
                    style={{ width: 60, height: 60 }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15, color: "white" }}>Hi</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontFamily: "ibarra-italic-bold",
                    }}
                  >
                    {user ? user.username : ""}
                  </Text>
                </View>
              </View>
            }
          />
          <View
            style={{
              backgroundColor: "#634C87",
              height: Dimensions.get("screen").height / 4,
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 15,
                borderTopLeftRadius: 50,
                backgroundColor: "white",
              }}
            >
              <ImageBackground
                style={styles.img}
                source={themeBackground}
                imageStyle={{ borderRadius: 20 }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                    flex: 1,
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "ibarra-italic-bold",
                      color: "#ffffff",
                      fontSize: 30,
                      textAlign: "center",
                    }}
                  >
                    {monthlyTheme ? monthlyTheme.title : ""}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View
            style={{
              // height: 1000,
              backgroundColor: "white",
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Tasks To Complete
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#300016",
                  padding: 1,
                  width: Dimensions.get("screen").width - 225,
                }}
              ></View>
            </View>
            <View>
              <Text style={styles.taskText}>Me time</Text>
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
              <Text style={styles.taskText}>Challenge Yourself!</Text>
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
              <Text style={styles.taskText}>Let's get moving!</Text>
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
        </View>
      </ScrollView>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 150,
  },
  header: {
    borderBottomWidth: 0,
    backgroundColor: "#634C87",
    borderBottomRightRadius: 50,
  },
  imgText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  taskText: {
    paddingVertical: 15,
    fontWeight: "bold",
  },
});
