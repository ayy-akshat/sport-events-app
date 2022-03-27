import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Image,
  Share,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import colorPallette from "../../stuff/colorPallette";
import styles from "../../stuff/styles";
import firebase from "firebase";

export default class ViewEventScreen extends React.Component {
  render() {
    var item = this.props.route.params.event;
    var people = [];
    for (var i in item.people) {
      people.push(i);
    }
    console.log(item);
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView style={{ width: "100%" }}>
            <SafeAreaView style={styles.sav} />
            <AppHeader title="View Event" />
            <TouchableOpacity
              style={[styles.subOptionButton, { alignSelf: "center" }]}
              onPress={this.props.navigation.goBack}
            >
              <Text style={styles.subOptionButtonText}>Back</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.eventItem,
                { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              ]}
            >
              <View style={styles.eventItemLeftContent}>
                <Text
                  style={[
                    styles.eventItemInfo,
                    {
                      fontStyle: "italic",
                      fontWeight: "normal",
                      marginBottom: 20,
                      opacity: 0.4,
                    },
                  ]}
                >
                  {`ID: ${item.id}`}
                </Text>
                <Text style={[styles.eventItemTitle, { fontSize: 30 }]}>
                  {item.eventName}
                </Text>
                <Text style={styles.eventItemInfo}>
                  {this.formatEventDate(item)}
                </Text>
                <Text style={styles.eventItemInfo}>
                  {this.formatEventTime(item)}
                </Text>
                <Text style={styles.eventItemInfo}>
                  {`${Object.keys(item.people).length.toString()} people`}
                </Text>
              </View>
              {(() =>
                item.mine ? (
                  <TouchableOpacity
                    style={styles.eventItemEditButton}
                    onPress={() => {
                      this.props.navigation.navigate("Create Event", {
                        editing: item.id,
                        eventInfo: JSON.parse(JSON.stringify(item)),
                      });
                    }}
                  >
                    <Text style={styles.eventItemEditButtonText}>Edit</Text>
                  </TouchableOpacity>
                ) : undefined)()}
            </View>
            <View
              style={[
                styles.eventItem,
                {
                  flexDirection: "column",
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                },
              ]}
            >
              <Text style={[styles.eventItemTitle, { fontSize: 30 }]}>
                People
              </Text>
              <Text style={[styles.eventItemInfo, { fontSize: 14 }]}>
                {people
                  .map(
                    (value) =>
                      "- [" +
                      (value === firebase.auth().currentUser.uid
                        ? "me"
                        : value) +
                      "]"
                  )
                  .join("\n")}
              </Text>
              {(() =>
                true ? (
                  <View
                    style={{
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text style={[styles.subText, { marginBottom: 0 }]}>
                      Share to someone:
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.messageButton,
                        { padding: 15, marginTop: 10 },
                      ]}
                      onPress={() => {
                        this.sendMessage(item);
                      }}
                    >
                      <Text style={styles.messageButtonText}>SHARE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.messageButton,
                        { padding: 15, marginTop: 10 },
                      ]}
                      onPress={() => {
                        this.sendMessage(item, true);
                      }}
                    >
                      <Text style={styles.messageButtonText}>
                        SHARE ONLY ID
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : undefined)()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  sendMessage = async (item, onlyId) => {
    try {
      const result = await Share.share({
        message: onlyId
          ? item.id
          : `Join my sporting event, ${
              item.eventName
            }! Copy the code to join: [${
              item.id
            }]\n\nDETAILS:\n(DATE & TIME) ${this.formatEventDate(
              item
            )} at ${this.formatEventTime(item)}\n(LOCATION) ${item.location}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  formatEventDate = (item) =>
    `${
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
    } ${item.time.day}, ${item.time.year}`;

  formatEventTime = (item) =>
    `${item.time.hour % 12}:${item.time.minute}${
      item.time.hour % 12 == item.time.hour ? "AM" : "PM"
    }`;
}
