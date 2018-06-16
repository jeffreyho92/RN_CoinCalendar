import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, Button, Tab, Tabs, Item, Icon, Input, Card, CardItem, Left, Right, Thumbnail, Body } from 'native-base';

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
      <Container>
            <Content>
        <Item style={{ paddingLeft: 10 }}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        {
        this.state.dataSource.map(function(data, key) {
           return <Text key={key}>{data.title}</Text>
        })
        }

        <Tabs initialPage={0}>
          <Tab heading="Hot">
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
    );
  }
}

const s = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      marginLeft: -1,
      marginRight: -1,
      height: 130
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