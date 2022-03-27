import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MyEventsScreen from '../screensSwitchNavMain/screensBotTabNavHome/myEventsScreen';
import ViewEventScreen from '../screensSwitchNavMain/screensBotTabNavHome/viewEventScreen';


export default function MyEventsStack() {
  return (
      <StackNav.Navigator
      screenOptions={{
          headerShown: false
      }}
      >
          <StackNav.Screen name='MyEventsScreen' component={MyEventsScreen}/>
          <StackNav.Screen name='ViewEventScreen' component={ViewEventScreen}/>
      </StackNav.Navigator>
  );
}

var StackNav = createStackNavigator();