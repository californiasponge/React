import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button
} from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import Landing from "./Content/Landing";
import Login from "./Content/Login";
import Register from "./Content/Register";
import HomeScreen from "./Content/Home";

const RootStack = SwitchNavigator({
  HomePage: {
    screen: Landing,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  Home: {
    screen: HomeScreen,
  } //remove after demo
}, {
  initialRouteName: 'HomePage',
});


export default class App extends Component {
  render() {
    return <RootStack />
  }
}
