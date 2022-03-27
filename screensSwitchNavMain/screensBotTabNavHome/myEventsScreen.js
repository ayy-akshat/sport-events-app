import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";
import * as SMS from "expo-sms";
import { Ionicons } from "@expo/vector-icons";
import colorPallette from "../../stuff/colorPallette";

export default class MyEventsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents();
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

          <AppHeader title="My Events" />

          <Text>Below is a list of all your events.</Text>

          <Ionicons name="calendar" color={colorPallette.tuftsBlue} size={70} style={{marginTop: 10}}/>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.events}
            style={{
              width: "100%",
              flex: 1,
            }}
            renderItem={this.renderEventItem}
          />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  renderEventItem = ({ item }) => {
    return (
      <View style={[styles.eventItem, (item.mine ? {borderLeftColor: "black", borderLeftWidth: 10} : {})]}>
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemTitle}>{item.eventName}</Text>
          <Text style={styles.eventItemInfo}>
            {`${
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
            } ${item.time.day}, ${item.time.year}`}
          </Text>
          <Text style={styles.eventItemInfo}>
            {`${item.time.hour % 12}:${item.time.minute}${
              item.time.hour % 12 == item.time.hour ? "AM" : "PM"
            }`}
          </Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text style={styles.eventItemInfo}>
            {`${Object.keys(item.people).length.toString()} people`}
          </Text>
          <Text
            style={[
              styles.eventItemInfo,
              {
                fontStyle: "italic",
                fontWeight: "normal",
                marginTop: 20,
                opacity: 0.4,
              },
            ]}
          >
            {`ID: ${item.id}`}
          </Text>
        </View>
        <View style={styles.eventItemEditButtonContainer}>
          <TouchableOpacity
            style={styles.eventItemEditButton}
            onPress={() => {
              this.props.navigation.navigate("ViewEventScreen", {
                event: item,
              });
            }}
          >
            <Text style={styles.eventItemEditButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getEvents = async () => {
    var events = await (
      await firebase.database().ref("/events/").get()
    ).toJSON();
    var myEvents = [];
    for (var i in events) {
      if (events[i].people[firebase.auth().currentUser.uid]) {
        var obj = JSON.parse(JSON.stringify(events[i]));
        obj.id = i;
        if (obj.manager === firebase.auth().currentUser.uid)
        {
          obj.mine = true;
        }
        myEvents.push(obj);
      }
    }

    this.setState({ events: myEvents });
  };
}
