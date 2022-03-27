import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react"
import AccountScreen from "../screensSwitchNavMain/screensBotTabNavHome/accountScreen";
import CreateEventScreen from "../screensSwitchNavMain/screensBotTabNavHome/createEventScreen";
import JoinEventScreen from "../screensSwitchNavMain/screensBotTabNavHome/joinEventScreen";
import MyEventsScreen from "../screensSwitchNavMain/screensBotTabNavHome/myEventsScreen";
import MyEventsStack from "./myEventsStack";
import { Ionicons } from "@expo/vector-icons";
import colorPallette from "../stuff/colorPallette";

var BotTabNav = createBottomTabNavigator();

var AccScreen;
export default class HomeTabs extends React.Component
{
  componentDidMount()
  {
    AccScreen = <AccountScreen parentNavigation={this.props.navigation}/>
  }

  render()
  {
    return (
      <BotTabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "My Events":
              return <Ionicons name={focused ? "body" : "body-outline"} size={size} color={color}/>;
              
            case "Create Event":
              return <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} color={color}/>;
              
            case "Join Event":
              return <Ionicons name={focused ? "person-add" : "person-add-outline"} size={size} color={color}/>;
          
            case "Account":
              return <Ionicons name={focused ? "at" : "at-outline"} size={size} color={color}/>;
              
            default:
              break;
          }
        },
        tabBarActiveTintColor: colorPallette.tuftsBlue,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        unmountOnBlur: true
      })}
      >
        <BotTabNav.Screen name="My Events" component={MyEventsStack} />
        <BotTabNav.Screen name="Create Event" component={CreateEventScreen} />
        <BotTabNav.Screen name="Join Event" component={JoinEventScreen} />
        <BotTabNav.Screen name="Account" component={() => AccScreen} />
      </BotTabNav.Navigator>
    );
  }
}
