import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/appHeader";
import styles from "../stuff/styles";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import colorPallette from "../stuff/colorPallette";

export default class StartScreen extends React.Component {
  render() {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate("HomeTabs");
    }
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <SafeAreaView style={styles.sav} />

          <AppHeader />

          <Ionicons name="people" color={colorPallette.tuftsBlue} size={60}/>

          <View style={styles.optionButtonsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                this.props.navigation.navigate("SignInScreen");
              }}
            >
              <Text style={styles.optionButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                this.props.navigation.navigate("RegisterScreen");
              }}
            >
              <Text style={styles.optionButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}
