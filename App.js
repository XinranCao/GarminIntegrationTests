import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import GarminHealthAPI from "./components/GarminHealthAPI";
import BluetoothComm from "./components/BluetoothComm";
import GarminConnectSDK from "./components/GarminConnectSDK";
import AppleHealthKit from "./components/AppleHealthKit";
import GoogleFit from "./components/GoogleFit";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <GarminHealthAPI />
        <BluetoothComm />
        <GarminConnectSDK />
        <AppleHealthKit />
        <GoogleFit />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "100%",
    padding: 20,
  },
  h1: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
