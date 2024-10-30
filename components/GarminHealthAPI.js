import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

// @TODO: Replace with real consumer key
const consumerKey = "";
const consumerSecret = "";

const GarminHealthAPI = () => {
  const [userId, setUserId] = useState(null);
  const [accessCredentials, setAccessCredentials] = useState(null);

  const startOAuthFlow = async () => {
    try {
      // get access token and secret from OAuth flow
      const result = await WebBrowser.openAuthSessionAsync(
        "", // @TODO: Replace with real Google Cloud Function (OAuth) URL
        "://handle_callback" // @TODO: Replace with scheme://handle_callback ("scheme" field in app.json)
      );

      if (result.type === "success" && result.url) {
        const params = new URLSearchParams(new URL(result.url).search);
        const access_token = params.get("access_token");
        const access_token_secret = params.get("access_token_secret");

        // @FIXME: this is not secure, should be stored in the server
        setAccessCredentials({ access_token, access_token_secret });
      }
    } catch (error) {
      console.error("Error during OAuth flow:", error);
    }
  };

  const fetchGarminData = async () => {
    if (!accessCredentials) {
      console.error("No access credentials found");
      return;
    }
    const { access_token, access_token_secret } = accessCredentials;
    try {
      const oauth = OAuth({
        consumer: {
          key: consumerKey,
          secret: consumerSecret,
        },
        signature_method: "HMAC-SHA1",
        hash_function(baseString, key) {
          return CryptoJS.HmacSHA1(baseString, key).toString(
            CryptoJS.enc.Base64
          );
        },
      });

      const requestUrl = "https://apis.garmin.com/wellness-api/rest/user/id";

      const requestData = {
        url: requestUrl,
        method: "GET",
      };

      const authHeader = oauth.toHeader(
        oauth.authorize(requestData, {
          key: access_token,
          secret: access_token_secret,
        })
      );

      const response = await axios.get(requestUrl, {
        headers: {
          Authorization: authHeader["Authorization"],
          "Content-Type": "application/json",
        },
      });

      setUserId(response.data.userId);
    } catch (err) {
      console.error("Error fetching User ID:", err);
    } finally {
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>Method 2. Garmin Health API</Text>
      {!accessCredentials && (
        <Button title="Sign in to get data" onPress={startOAuthFlow} />
      )}

      {accessCredentials && (
        <Button title="Fetch User Id" onPress={() => fetchGarminData()} />
      )}
      {userId && <Text>User ID: {userId}</Text>}
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

export default GarminHealthAPI;
