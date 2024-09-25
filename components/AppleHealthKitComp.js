import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, useColorScheme } from "react-native";
import AppleHealthKit from "react-native-health";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AppleHealthKitComp = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [steps, setSteps] = useState(null);
  const textColor = isDarkMode ? Colors.white : Colors.black;

  useEffect(() => {
    requestHealthKitPermissions();
  }, []);

  const requestHealthKitPermissions = () => {
    const PERMISSIONS = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount],
      },
    };

    AppleHealthKit.initHealthKit(PERMISSIONS, (err, results) => {
      if (err) {
        console.log("error initializing HealthKit: ", err);
        return;
      }

      fetchSteps();
    });
  };

  const fetchSteps = () => {
    const options = {
      startDate: new Date(2023, 9, 1).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log("Error fetching step count: ", err);
        return;
      }

      setSteps(results.value);
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.title, { color: textColor }]}>
        1. Apple Health Kit
      </Text>
      <View>
        <Text style={{ color: textColor }}>
          Steps Today: {steps ? steps : "Loading..."}
        </Text>
        <Button title="Refresh Steps" onPress={fetchSteps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AppleHealthKitComp;
