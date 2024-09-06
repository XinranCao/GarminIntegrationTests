import { StyleSheet, Text, View } from "react-native";

const GarminHealthAPI = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Method 1: Garmin Health API</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  h1: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GarminHealthAPI;
