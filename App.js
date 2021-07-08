//AppComponents;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';

import {createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screencompo/HomeScreen';
import InactiveEmplyScreen from './screencompo/InactiveEmplyScreen';
import ActiveEmplScreen    from './screencompo/ActiveEmplScreen';
import RightOrgScreen from './screencompo/RightOrgScreen';
import LeftOrgScreen from './screencompo/LeftOrgScreen';
import DrawerMenu from './screencompo/DrawerMenu';



import ProductScreen from './components/ProductScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import ProductAddScreen from './components/ProductAddScreen';
import ProductEditScreen from './components/ProductEditScreen';

//RightOrgScreen
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Menu : DrawerMenu,
    Inactive: InactiveEmplyScreen,
    Active: ActiveEmplScreen,
    RightOrganization: RightOrgScreen,
    LeftOrganization : LeftOrgScreen,

    Product: ProductScreen,
    ProductDetails: ProductDetailsScreen,
    AddProduct: ProductAddScreen,
    EditProduct: ProductEditScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <RootContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

