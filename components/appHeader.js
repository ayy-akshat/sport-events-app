import { StyleSheet, Text, View } from "react-native";
import styles from "../stuff/styles";

export default function AppHeader(props) {
  return (
    <Text style={styles.headerText}>
      {props.title ? props.title : "SportEvents"}
    </Text>
  );
}
