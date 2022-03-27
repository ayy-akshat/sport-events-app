import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/appHeader";
import styles from "../stuff/styles";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default class RegisterScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      errorMessage: "",
    };
  }

  render() {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate("HomeTabs");
    }
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={[styles.container, { flex: undefined }]}
          behavior="height"
          enabled
        >
          <ScrollView
            style={{
              width: "100%",
            }}
            contentContainerStyle={[styles.container, { flex: undefined }]}
          >
            <SafeAreaView style={styles.sav} />

            <AppHeader title="Register" />

            <Image
              source={require("../assets/images/peach.png")}
              style={{
                width: 240,
                height: 135,
              }}
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Email"
              value={this.state.emailInput}
              onChangeText={(emailInput) => {
                this.setState({ emailInput });
              }}
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.passwordInput}
              onChangeText={(passwordInput) => {
                this.setState({ passwordInput });
              }}
            />

            <TextInput
              style={styles.optionTextInput}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={this.state.confirmPasswordInput}
              onChangeText={(confirmPasswordInput) => {
                this.setState({ confirmPasswordInput });
              }}
            />

            <TouchableOpacity
              style={styles.optionButton}
              onPress={this.attemptRegister}
            >
              <Text style={styles.optionButtonText}>Register</Text>
            </TouchableOpacity>

            {(() =>
              this.state.errorMessage != "" ? (
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
              ) : undefined)()}

            <TouchableOpacity
              style={styles.subOptionButton}
              onPress={() => {
                this.props.navigation.navigate("StartScreen");
              }}
            >
              <Text style={styles.subOptionButtonText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  attemptRegister = async () => {
    if (!(this.state.emailInput && this.state.passwordInput)) {
      this.setState({ errorMessage: "Please enter something" });
      return;
    }

    if (this.state.passwordInput != this.state.confirmPasswordInput) {
      this.setState({ errorMessage: "Passwords do not match" });
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.emailInput,
          this.state.passwordInput
        );
      if (response) {
        this.props.navigation.navigate("HomeTabs");
      }
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.code });
    }
  };
}
