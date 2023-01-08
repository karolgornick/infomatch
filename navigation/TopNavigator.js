import React, {useEffect, useState} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    League
} from "../views/League";


import {AsyncStorage, Button, Text, View} from "react-native";
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

function LeaguesScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CountriesList></CountriesList>
        </View>
    );
}


function LeaguesNavigator(props) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Kraje"
                component={LeaguesScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="League"
                component={League}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const TopNavigator = () => {
    let mainTab;

    const getMainTab = async () => {
        // const [tab, setTab] = useState([])
        mainTab = await AsyncStorage.getItem(
            '@MainTab'
        );
        if (!mainTab) {
            mainTab === 'Leagues'
        }
        // setTab(mainTab)
        // console.log(tab)
        console.log(mainTab)
    }

    getMainTab()

    useEffect(() => {

    }, [])

    return (
        <Tab.Navigator
            initialRouteName={mainTab}
        >
            <Tab.Screen
                name="Leagues"
                component={LeaguesNavigator}
                options={{ headerTitle: 'Ligi' }}
            />
            <Tab.Screen
                name="Matches"
                component={MatchesScreen}
                options={{ headerTitle: 'Mecze' }}
            />
        </Tab.Navigator>
    );
};

export default TopNavigator;
