import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";

export default class JoinEventScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      joinId: ""
    }
  }

  render() {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <SafeAreaView style={styles.sav} />

          <AppHeader title="Join Event" />

          <Text style={styles.subText}>
            Type the ID of an event to join it.
          </Text>
          <Text style={styles.subText}>
            To get the ID of a event, ask the event manager to go to the event
            edit menu.
          </Text>

          <TextInput
          style={styles.optionTextInput}
          placeholder="Event ID"
          value={this.state.joinId}
          onChangeText={(joinId) => {this.setState({joinId})}}
          autoCorrect={false}
          spellCheck={false}
          />

          <TouchableOpacity style={styles.optionButton} onPress={this.joinEvent}>
            <Text style={styles.optionButtonText}>Join</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  joinEvent = async () => {
    console.log("ok");
    if (!this.state.joinId)
    {
      Alert.alert("Enter something");
      return;
    }
    var ref = await firebase.database().ref("events/" + this.state.joinId + "/").get();
    if (!ref.exists())
    {
      Alert.alert(`Event with ID ${this.state.joinId} does not exist.`);
    }
    else
    {
      let t = {};
      t[firebase.auth().currentUser.uid] = true;
      var ref = await firebase.database().ref("events/" + this.state.joinId + "/people/").update(t);
    }
    this.setState({joinId: ""});
  }
}
