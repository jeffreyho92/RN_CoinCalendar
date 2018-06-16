import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { StyleProvider, Container, Header, Content, Button, Tab, Tabs, Item, Icon, Input, Card, CardItem, Left, Right, Thumbnail, Body } from 'native-base';

import getTheme from '../../native-base-theme/components';
import variables from '../../native-base-theme/variables';

export default class Tab1Screen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource: []}
  }

  componentWillMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
      <Container style={{ backgroundColor: '#30374a' }}>
            <Content>
        <Item rounded style={{ paddingLeft: 10, height: 35, backgroundColor: 'white', marginTop:20, marginRight:20, marginBottom:20, marginLeft:20 }}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        {
        this.state.dataSource.map(function(data, key) {
           return <Text key={key}>{data.title}</Text>
        })
        }

        <Tabs initialPage={0} tabStyle={{ backgroundColor: '#fff', borderBottomWidth: 0 }}>
          <Tab heading="Hot" style={{ backgroundColor: '#30374a' }}>
              <Card>
                <CardItem cardBody>
                  <ImageBackground rkCardImg source={require('../../image/style.jpg')} style={s.backgroundImage}>
                    <View style={s.overlay}/>

                    <Left style={s.img_text}>
                      <Thumbnail small source={require('../../image/style.jpg')} />
                      <Body>
                        <Text style={{ color: 'white' }}> quick brown fox jumps over the lazy dog</Text>
                      </Body>
                    </Left>
                  </ImageBackground>
                </CardItem>
              </Card>
          </Tab>
          <Tab heading="New">
            <Text>tab2</Text>
          </Tab>
          <Tab heading="Upcoming">
            <Text>tab3</Text>
          </Tab>
        </Tabs>
            </Content>
      </Container>
      </StyleProvider>
    );
  }
}

const s = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      marginLeft: -2,
      marginRight: -2,
      marginTop: -2,
      marginBottom: -2,
      height: 130,
      backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.8
  },
  img_text: {
    marginTop: 'auto',
    color: 'white',
    paddingLeft: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  }
});