/** @format */

import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import {  StyleSheet,  View } from "react-native";
import { Provider } from "react-redux";
import colors from "./app/config/colors";
import Index from "./Index";
import store from "./app/redux/store";
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Index />
        <StatusBar style="inverted" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundprimarycolor,
    alignItems: "center",
    justifyContent: "center",
  },
});
