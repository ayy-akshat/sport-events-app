import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SwitchNavMain from "./navigation/switchNavMain";
import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <SwitchNavMain />
    </NavigationContainer>
  );
}

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
