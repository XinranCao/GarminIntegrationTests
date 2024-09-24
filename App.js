import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import GarminHealthAPI from "./components/GarminHealthAPI";
import AppleHealthKit from "./components/AppleHealthKit";
import GoogleFit from "./components/GoogleFit";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <AppleHealthKit />
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
