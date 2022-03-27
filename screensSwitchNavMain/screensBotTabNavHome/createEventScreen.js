import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";
// import Clipboard from "expo-clipboard";

export default class CreateEventScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      eventName: "",
      location: "",
      hour: "",
      minute: "",
      month: "",
      day: "",
      year: "2022",
      editingId: "",
    };
  }

  componentDidMount() {
    if (this.props.route.params) {
      if (this.props.route.params.editing != "") {
        let p = this.props.route.params;
        this.setState({
          editingId: p.editing,
          eventName: p.eventInfo.eventName,
          location: p.eventInfo.location,
          hour: p.eventInfo.time.hour.toString(),
          minute: p.eventInfo.time.minute.toString(),
          month: p.eventInfo.time.month.toString(),
          day: p.eventInfo.time.day.toString(),
          year: p.eventInfo.time.year.toString(),
        });
      }
    }
  }

  componentWillUnmount() {
    this.stopEditing();
  }

  render() {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView
            contentContainerStyle={[styles.container, { flex: undefined }]}
            style={{ width: "100%" }}
          >
            <SafeAreaView style={styles.sav} />

            <AppHeader
              title={this.state.editingId == "" ? "Create Event" : "Edit Event"}
            />

            {(() =>
              this.state.editingId != "" ? (
                <View style={styles.alertItem}>
                  <Text style={styles.alertText}>
                    You are currently editing an event (id:
                    {this.state.editingId})
                  </Text>
                  <TouchableOpacity
                    style={styles.alertButton}
                    onPress={this.stopEditing}
                  >
                    <Text style={styles.alertButtonText}>Stop Editing</Text>
                  </TouchableOpacity>
                </View>
              ) : undefined)()}

            <TextInput
              value={this.state.eventName}
              placeholder="Event name"
              maxLength={16}
              style={styles.optionTextInput}
              onChangeText={(eventName) => {
                this.setState({ eventName });
              }}
            />

            <TextInput
              value={this.state.location}
              placeholder="Location"
              maxLength={70}
              style={styles.optionTextInput}
              onChangeText={(location) => {
                this.setState({ location });
              }}
            />

            <Text
              style={{ textAlign: "center", marginTop: 30, marginBottom: -15 }}
            >
              Enter the time in 24h time below.
            </Text>
            <View style={styles.horizontalArrangement}>
              <TextInput
                value={this.state.hour}
                placeholder="hh"
                maxLength={2}
                style={[
                  styles.optionTextInput,
                  { flex: 0.4, textAlign: "center" },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(hour) => {
                  this.setState({ hour });
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                :
              </Text>
              <TextInput
                value={this.state.minute}
                placeholder="mm"
                maxLength={2}
                style={[
                  styles.optionTextInput,
                  { flex: 0.4, textAlign: "center" },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(minute) => {
                  this.setState({ minute });
                }}
              />
            </View>

            <Text
              style={{ textAlign: "center", marginTop: 30, marginBottom: -15 }}
            >
              Enter the date below.
            </Text>
            <View style={styles.horizontalArrangement}>
              <TextInput
                value={this.state.month}
                placeholder="MM"
                maxLength={2}
                style={[
                  styles.optionTextInput,
                  {
                    flex: 0.3,
                    textAlign: "center",
                    borderRadius: 20,
                    padding: 10,
                    margin: 0,
                  },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(month) => {
                  this.setState({ month });
                }}
              />
              <TextInput
                value={this.state.day}
                placeholder="DD"
                maxLength={2}
                style={[
                  styles.optionTextInput,
                  {
                    flex: 0.3,
                    textAlign: "center",
                    borderRadius: 20,
                    padding: 10,
                    margin: 0,
                  },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(day) => {
                  this.setState({ day });
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                ,
              </Text>
              <TextInput
                value={this.state.year}
                placeholder="YYYY"
                maxLength={4}
                style={[
                  styles.optionTextInput,
                  {
                    flex: 1,
                    textAlign: "center",
                    borderRadius: 20,
                    padding: 10,
                    margin: 0,
                  },
                ]}
                keyboardType="numeric"
                returnKeyType="done"
                onChangeText={(year) => {
                  this.setState({ year });
                }}
              />
            </View>

            <TouchableOpacity
              style={[styles.optionButton, { marginTop: 40 }]}
              onPress={this.createEvent}
            >
              <Text style={styles.optionButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  stopEditing = () => {
    this.setState({ editingId: "" });
    this.props.navigation.setParams({ editing: "" });
    this.setState({
      eventName: "",
      location: "",
      hour: "",
      minute: "",
      month: "",
      day: "",
      year: "2022",
      editingId: "",
    });
  };

  createEvent = async () => {
    if (!this.state.eventName) {
      Alert.alert("Enter something");
      return;
    }
    var eventInfo = {
      eventName: this.state.eventName,
      time: {
        year: this.state.year,
        month: this.state.month,
        day: this.state.day,
        hour: this.state.hour,
        minute: this.state.minute,
      },
      people: {},
      location: this.state.location,
      manager: firebase.auth().currentUser.uid,
    };
    eventInfo.people[firebase.auth().currentUser.uid] = true;

    if (this.state.editingId === "")
    {
      var id = firebase
        .database()
        .ref("/events/")
        .push(eventInfo, (a) => {});
      Alert.alert("Created Event!",  "ID " + id.key, [
        {
          text: "Copy",
          style: "default",
          onPress: (value) => {
            console.log(id.key);
            Clipboard.setString(id.key);
            Alert.alert("Copied!");
          }
        },
        {
          text: "OK",
          style: "cancel"
        },
      ]);
    }
    else
    {
      var id = firebase
        .database()
        .ref("/events/" + this.state.editingId)
        .update(eventInfo, (a) => {});
      Alert.alert("Edited Event!",  "ID " + id.key, [
        {
          text: "Copy",
          style: "default",
          onPress: (value) => {
            console.log(id.key);
            Clipboard.setString(id.key);
            Alert.alert("Copied!");
          }
        },
        {
          text: "OK",
          style: "cancel"
        },
      ]);
    }

  };

  async shareEvent(item) {
    try {
      const result = await Share.share({
        message:
          `Join my sporting event, ${item.eventName}! Copy the code to join: [${item.id}]\n\nDETAILS:\n(DATE & TIME) ${this.formatEventDate(item)} at ${this.formatEventTime(item)}\n(LOCATION) ${item.location}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared: " + result.activityType);
        } else {
          Alert.alert("Shared!");
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  formatEventDate = (item) => `${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][item.time.month - 1]
    } ${item.time.day}, ${item.time.year}`

  formatEventTime = (item) => `${item.time.hour % 12}:${item.time.minute}${
      item.time.hour % 12 == item.time.hour ? "AM" : "PM"
    }`
}
