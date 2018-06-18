import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { StyleProvider, Container, Header, Content, Button, Tab, Tabs, Item, Icon, Input, Card, CardItem, Left, Right, Thumbnail, Body } from 'native-base';

import getTheme from '../../native-base-theme/components';
import variables from '../../native-base-theme/variables';

async function fetchCoinInfo(self){
  await fetch('https://www.cryptocompare.com/api/data/coinlist/')
    .then((response) => response.json())
    .then((responseJson) => {
      self.setState({
        token: "",
        coin_img: responseJson.BaseImageUrl,
        arr_coin: responseJson.Data,
      });
    })
    .catch((error) =>{
      console.error(error);
    });
}

async function fetchCoinMarketCal(self){
  var token = "";
  var URL_getToken = "https://api.coinmarketcal.com/oauth/v2/token?grant_type=client_credentials&client_id=894_5fuoelisrd0kow0so840cs0gog0gskcckw8kkwcgcgkokcs4cw&client_secret=1prvzyo2uwkkw4w88k8ogssw0cg8s4ccgw80s0goco44scwwws";
  var URL_getEvents = "https://api.coinmarketcal.com/v1/events?access_token=";
  var nowTimeStamp = Math.floor(Date.now() / 1000);

  console.log("AsyncStorage");
  await AsyncStorage.getItem("CoinMarketCal").then((value) => {
    console.log("AsyncStorage2");
    var obj = JSON.parse(value);
    if(obj){
      if((nowTimeStamp - obj.timestamp) < 43200){  //12 hours
        token = obj.token;
        console.log("AsyncStorage3");
      }
    }
  }).done();

  console.log("token",token);
  if(token == ""){
    await fetch(URL_getToken)
      .then((response) => response.json())
      .then((responseJson) => {
        token = responseJson.access_token;
        console.log(token);

        
        var obj = {
          token: token,
          timestamp: nowTimeStamp
        };
        AsyncStorage.setItem("CoinMarketCal", JSON.stringify(obj));
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  await fetch(URL_getEvents+token)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson){
        self.setState({
          arr_events: responseJson.slice(0,5)
        });
      }
      console.log(self.state.arr_events);
    })
    .catch((error) =>{
      console.error(error);
    });
}

export default class Tab1Screen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      coin_img: "",
      arr_coin: [],
      arr_events: []
    }
  }

  async componentWillMount(){
    console.log("componentWillMount");
    await fetchCoinMarketCal(this);
    await fetchCoinInfo(this);
    console.log("done fetch");
    var arr_events = this.state.arr_events;
    var coin_img = this.state.coin_img;
    var arr_coin = this.state.arr_coin;

    await arr_events.map(function(event) {
      var coin_symbol = event.coins[event.coins.length-1].symbol;
      if(arr_coin[coin_symbol]){
        var logo_url = coin_img + arr_coin[coin_symbol].ImageUrl;
        event.logo_url = logo_url;
      }else{
        event.logo_url = "";
      }
    })

    this.setState({
      arr_events: arr_events
    });
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
      <Container style={{ backgroundColor: '#30374a' }}>
            <Content>
        <Item rounded style={{ paddingLeft: 10, height: 30, backgroundColor: 'white', marginTop:20, marginRight:20, marginBottom:5, marginLeft:20 }}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Text>{this.state.myKey}</Text>
        <Tabs initialPage={0} tabStyle={{ backgroundColor: '#fff', borderBottomWidth: 0 }}>
          <Tab heading="Hot" style={{ backgroundColor: '#30374a' }}>
            {
              this.state.arr_events.map(function(data, key) {
                const card = (
                    <Card key={key} style={{ marginLeft: -2,marginRight: -2, marginBottom: -6, backgroundColor: '#30374a' }}>
                      <CardItem cardBody>
                        <ImageBackground rkCardImg source={(data.proof) ? {uri:data.proof} : require('../../image/crypto_banner.jpg')} style={s.backgroundImage}>
                          <View style={s.overlay}/>

                          <Left style={s.img_text}>
                            <Thumbnail small source={(data.logo_url) ? {uri:data.logo_url} : require('../../image/crypto_banner.jpg')} />
                            <Body>
                              <Text style={{ color: 'white' }}> {data.coins[data.coins.length-1].symbol + " - " +data.title}</Text>
                            </Body>
                          </Left>
                        </ImageBackground>
                      </CardItem>
                    </Card>
                  )
                 return card
              })
            }
          </Tab>
          <Tab heading="New">
            <Text>tab2</Text>
          </Tab>
          <Tab heading="Upcoming">
            <Text>tab3</Text>
          </Tab>
          <Tab heading="Past">
            <Text>tab4</Text>
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
      marginTop: -3,
      marginBottom: -2,
      height: 150,
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
    paddingLeft: 20,
    paddingBottom: 20,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  }
});