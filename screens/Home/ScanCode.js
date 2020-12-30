import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Ionicons } from "@expo/vector-icons";

const ScanCode = ({ navigation, route }) => {
  const { handleQRScan, qr } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (data === qr) {
      navigation.goBack();
      handleQRScan(true);
    } else {
      navigation.goBack();
      handleQRScan(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="md-qr-scanner"
        color="white"
        size={200}
        style={{
          position: "absolute",
          zIndex: 1,
          left: 80,
          top: 170,
          alignSelf: "center",
        }}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanCode;
