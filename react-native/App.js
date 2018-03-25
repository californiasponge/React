import React, { Component } from 'react';
import { SwitchNavigator } from 'react-navigation';
import Landing from "./Content/Landing";
import Login from "./Content/Login";
import Register from "./Content/Register";

const RootStack = SwitchNavigator({
  HomePage: {
    screen: Landing,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  }
}, {
  initialRouteName: 'HomePage',
});

export default class App extends Component {
  render() {
    return <RootStack />
  }
}
