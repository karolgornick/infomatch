import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LeagueTable
} from "../views/LeagueTable";


import {Button, Text, View} from "react-native";
import {CountriesList} from "../views/Countries";

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

function LeaguesScreen({ navigator }) {
    console.log(navigator)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CountriesList></CountriesList>
        </View>
    );
}


function LeaguesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Kraje"
                component={LeaguesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Liga"
                component={LeagueTable}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const TopNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Ligi" component={LeaguesNavigator} />
            <Tab.Screen name="Mecze" component={MatchesScreen} />
        </Tab.Navigator>
    );
};

export default TopNavigator;
