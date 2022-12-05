import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {Button, Text, View} from "react-native";
import {CountriesList} from "../views/Countries";

const Tab = createMaterialTopTabNavigator();

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
            <CountriesList></CountriesList>
        </View>
    );
}

const TopNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Ligi" component={LeaguesScreen} />
            <Tab.Screen name="Mecze" component={MatchesScreen} />
        </Tab.Navigator>
    );
};

export default TopNavigator;
