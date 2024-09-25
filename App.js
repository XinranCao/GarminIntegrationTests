import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import GarminHealthAPI from "./components/GarminHealthAPI";
import AppleHealthKitComp from "./components/AppleHealthKitComp";
import GoogleFit from "./components/GoogleFit";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <AppleHealthKitComp />
        {/* <GoogleFit /> */}
        <GarminHealthAPI />
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
