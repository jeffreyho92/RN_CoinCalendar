import React from 'react';
import { View, Button, Text } from 'react-native';

export default class Tab2Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a Tab1Screen!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Tab1Details')}
          title="Tab1Details"
        />
      </View>
    );
  }
}