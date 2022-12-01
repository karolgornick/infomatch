/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
// import type {Node} from 'react';
import {
      Button,
      Text,
      View,
} from 'react-native';
import {CountriesList} from "./views/Countries";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator();



function MatchesScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Matches Screen</Text>
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Leagues')}
        />
      </View>
  );
}

function LeaguesScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <React.StrictMode>
            <CountriesList></CountriesList>
          </React.StrictMode>
      </View>
  );
}

function TopBar() {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <Text
                style={{
                    marginRight: 10
                }}
            >Tu będzie ikona</Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: 'black'
                }}
            >AppScore</Text>
        </View>

    );
}

function TopBarNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Ligi" component={LeaguesScreen} />
                <Tab.Screen name="Mecze" component={MatchesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default class App extends Component {
  render() {
    return (
        <TopBarNavigation></TopBarNavigation>
    );
  }
}
