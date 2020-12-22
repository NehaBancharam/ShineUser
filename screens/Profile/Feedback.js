import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";

import firebase from "../../config/Firebase";
import InfoModal from "../../components/profile/InfoModal";

export default Feedback = ({ navigation }) => {
  const [category, setCategory] = useState("performance");
  const [review, setReview] = useState("");
  const [reviewInvalid, setReviewInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [categoryTypes, setCategoryTypes] = useState([
    {
      label: "Bug",
      value: "bug",
    },
    {
      label: "Design",
      value: "design",
    },
    {
      label: "Performance",
      value: "performance",
    },
  ]);

  const submitFeedbackHandler = () => {
    setLoading(true);

    if (review.length > 0) {
      firebase
        .firestore()
        .collection("feedback")
        .doc()
        .set({
          category,
          review,
          submittedOn: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          setReview("");
          setModalVisible(true);
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage(`An error has occured ${error.code}`);
          setLoading(false);
        });
    } else {
      setErrorMessage("Feedback cannot be left blank.");
      setReviewInvalid(true);
      setLoading(false);
    }
  };

  const onSubmitSuccessHandler = () => {
    setModalVisible(!modalVisible);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <InfoModal
        label="You review has been submitted. Thank you for the insight. 👍"
        visible={modalVisible}
        onRequestClose={onSubmitSuccessHandler}
      />
      <View style={styles.container}>
        <Header
          title="Feedback"
          left={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          }
        />
        <View style={{ flex: 1, marginHorizontal: 30, marginTop: 30 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Select a Category
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#808080",
              borderRadius:  5,
              marginVertical: 15,
            }}
          >
            <Picker
              selectedValue={category}
              style={{
                height: 50,
                width: "100%",
                color: "#808080",
              }}
              dropdownIconColor="#FFF"
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              mode="dropdown"
            >
              {categoryTypes.map(({ label, value }) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>
          <View style={{ marginVertical: 15 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, marginVertical: 15 }}
            >
              Leave a Review
            </Text>
            {errorMessage ? (
              <View style={styles.errorMsg}>
                <Text style={styles.error}>{errorMessage}</Text>
              </View>
            ) : (
              <></>
            )}
            <TextInput
              onFocus={() => {
                setErrorMessage("");
                setReviewInvalid("");
              }}
              error={reviewInvalid}
              label="Review"
              mode="flat"
              multiline
              numberOfLines={10}
              style={styles.input}
              onChangeText={(review) => setReview(review)}
              value={review}
              underlineColor="#F0F7FF"
              keyboardType="default"
              theme={{
                colors: { primary: "#808080" },
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={submitFeedbackHandler}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 17 }}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                "Submit"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorMsg: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    fontSize: 15,
    color: "#161F3D",
    backgroundColor: "#F0F7FF",
  },
  button: {
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});
