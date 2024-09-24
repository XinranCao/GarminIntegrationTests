import { StyleSheet, Text, View } from "react-native";

const GoogleFit = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Method 1: Google Fit</Text>
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

export default GoogleFit;
