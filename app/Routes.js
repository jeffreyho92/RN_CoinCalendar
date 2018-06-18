import React from "react";
import { View } from "react-native";
import {
  TabNavigator,
  TabBarBottom,
  createStackNavigator
} from "react-navigation";
import Tab1Screen from "./Tabs/Tab1Screen";
import Tab1Details from "./Tabs/Tab1Details";
import Tab2Screen from "./Tabs/Tab2Screen";

import Ionicons from 'react-native-vector-icons/Ionicons';

let headerDefaultNavigationConfig = {
  headerStyle: {
   backgroundColor: "#575d6d"
  },
  headerTitleStyle: {
    color: "#fff",
    zIndex: 1,
    fontSize: 18,
    lineHeight: 23
  },
  headerTintColor: "#fff"
};

const Tab1 = createStackNavigator(
  {
    Tab1: {
      screen: Tab1Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Coin Calendar"
      }
    },
    Tab1Details: {
      screen: Tab1Details,
      navigationOptions: {
        headerTitle: "Tab 1 Details"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);

const Tab2 = createStackNavigator(
  {
    Tab2: {
      screen: Tab2Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 2 Screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);
const Tab3 = createStackNavigator(
  {
    Tab3: {
      screen: Tab2Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 2 Screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);
const Tab4 = createStackNavigator(
  {
    Tab4: {
      screen: Tab2Screen,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Tab 2 Screen"
      }
    }
  },
  {
    navigationOptions: {
      ...headerDefaultNavigationConfig
    }
  }
);

const TabRoutes = TabNavigator(
  {
    Tab1: Tab1,
    Tab2: Tab2,
    Tab3: Tab3,
    Tab4: Tab4
  },
  {
    initialRouteName: "Tab1",
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      let params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          //return <Icon type={routeName} focused={focused} />;
          switch(routeName) {
              case 'Tab1':
                  return <Ionicons name={'ios-home'} color={tintColor} size={30}  focused={focused}/>;
                  break;
              case 'Tab2':
                  return <Ionicons name={'ios-stats'} color={tintColor} size={30}  focused={focused}/>;
                  break;
              case 'Tab3':
                  return <Ionicons name={'ios-notifications'} color={tintColor} size={30}  focused={focused}/>;
                  break;
              default:
                  return <Ionicons name={'ios-contact'} color={tintColor} size={30}  focused={focused}/>;
          }
        },
        tabBarVisible:
          params && params.hideTabBar != null ? !params.hideTabBar : true,
        swipeEnabled:
          params && params.hideTabBar != null ? !params.hideTabBar : true
      };
    },
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#c994ff",
      inactiveTintColor: "#30374a",
      style: {
        height: 50,
        paddingVertical: 5,
        backgroundColor: "#575d6d",
        color: "#fff",
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20,
        fontFamily: "CircularStd-Book"
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true
  }
);

//lightlightgray = #7d808f
//lightgray = #575d6d
//darkgray = #30374a
//purple = #c994ff

export default TabRoutes;