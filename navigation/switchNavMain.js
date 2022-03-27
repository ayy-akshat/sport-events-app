import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import RegisterScreen from '../screensSwitchNavMain/registerScreen';
import SignInScreen from '../screensSwitchNavMain/signInScreen';
import StartScreen from '../screensSwitchNavMain/startScreen';
import HomeTabs from './bottomTabNavHome';


export default function SwitchNavMain() {
  return (
      <SwitchNav/>
  );
}

var sn = createSwitchNavigator({
    StartScreen: {
        screen: StartScreen
    },
    SignInScreen: {
        screen: SignInScreen
    },
    RegisterScreen: {
        screen: RegisterScreen
    },
    HomeTabs: {
        screen: HomeTabs
    }
})

var SwitchNav = createAppContainer(sn);