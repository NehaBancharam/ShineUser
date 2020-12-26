import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const InfoModal = ({ visible, onRequestClose, label }) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
              textAlign: "center",
            }}
          >
            {label}
          </Text>
          <TouchableOpacity onPress={onRequestClose}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: "#E9446A",
                margin: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ color: "white" }}>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    elevation: 5,
  },
});

export default InfoModal;
