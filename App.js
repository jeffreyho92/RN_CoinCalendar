/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import TabRoutes from "./app/Routes";

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <TabRoutes />;
  }
}