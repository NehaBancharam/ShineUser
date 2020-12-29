import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import { FAB, Searchbar } from "react-native-paper";
import PostCard from "../components/feed/PostCard";
import { TouchableOpacity } from "react-native-gesture-handler";

import firebase from "../config/Firebase";

import { LogBox } from "react-native";
import _ from "lodash";
import Empty from "../components/feed/Empty";
import Header from "../components/Header";

LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const userID = firebase.auth().currentUser.uid;

  const getPostsHandler = (query) => {
    setLoading(true);

    if (query) {
      firebase
        .firestore()
        .collection("posts")
        .where("username", "==", query)
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
          let tempPosts = [];
          querySnapshot.forEach(function (postDoc) {
            tempPosts.push({
              id: postDoc.id,
              ...postDoc.data(),
            });
          });
          setPosts(tempPosts);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .orderBy("timestamp", "desc")
        .limit(10)
        .get()
        .then((querySnapshot) => {
          let tempPosts = [];
          querySnapshot.forEach(function (postDoc) {
            tempPosts.push({
              id: postDoc.id,
              ...postDoc.data(),
            });
          });
          setPosts(tempPosts);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const getUserPostsHandler = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", userID)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        let tempPosts = [];
        querySnapshot.forEach(function (postDoc) {
          tempPosts.push({
            id: postDoc.id,
            ...postDoc.data(),
          });
        });
        setUserPosts(tempPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deletePostHandler = (postID) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(userID)
          .update({
            posts: firebase.firestore.FieldValue.arrayRemove(postID),
          })
          .then(() => {
            getPostsHandler();
            getUserPostsHandler();
          });
      });
  };

  useEffect(() => {
    getPostsHandler();
    getUserPostsHandler();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Feed" />
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: showAll ? "#634C87" : "white",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (showAll) {
                return;
              } else {
                setShowAll(!showAll);
              }
            }}
          >
            <Text style={{ color: showAll ? "white" : "black" }}>
              All Posts
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: showAll ? "white" : "#634C87",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (showAll) {
                setShowAll(!showAll);
              } else {
                return;
              }
            }}
          >
            <Text style={{ color: showAll ? "black" : "white" }}>
              Your Posts
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        {showAll ? (
          <>
            <Searchbar
              placeholder="Search Username"
              onChangeText={(search) => getPostsHandler(search)}
              style={{ margin: 15, borderRadius: 20, fontSize: 10 }}
            />
            {posts.length > 0 ? (
              <>
                <View style={{ flex: 1, marginTop: 5 }}>
                  <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                      item.uid === userID ? (
                        <PostCard
                          post={item}
                          deletable
                          onDelete={deletePostHandler}
                        />
                      ) : (
                        <PostCard post={item} />
                      )
                    }
                    refreshControl={
                      <RefreshControl
                        colors={["black"]}
                        progressBackgroundColor="white"
                        refreshing={loading}
                        onRefresh={() => {
                          getPostsHandler();
                          getUserPostsHandler();
                        }}
                      />
                    }
                  />
                </View>
              </>
            ) : (
              <Empty
                label="No Posts"
                onRefresh={getPostsHandler}
                loading={loading}
              />
            )}
          </>
        ) : userPosts.length > 0 ? (
          <View style={{ flex: 1, marginTop: 5 }}>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PostCard post={item} deletable onDelete={deletePostHandler} />
              )}
              refreshControl={
                <RefreshControl
                  colors={["black"]}
                  progressBackgroundColor="white"
                  refreshing={loading}
                  onRefresh={() => {
                    getPostsHandler();
                    getUserPostsHandler();
                  }}
                />
              }
            />
          </View>
        ) : (
          <Empty
            label="No Posts"
            onRefresh={getUserPostsHandler}
            loading={loading}
          />
        )}
      </View>
      <FAB
        style={styles.fab}
        color="white"
        icon="plus"
        onPress={() => navigation.navigate("Post")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "white",
  },

  fab: {
    position: "absolute",
    backgroundColor: "#E9446A",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
