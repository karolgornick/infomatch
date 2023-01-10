import React, {useEffect, useState} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    League
} from "../views/League";


import {AsyncStorage, Button, Image, Text, View, LogBox, Pressable} from "react-native";
import {CountriesList} from "../views/Countries";
import {useIsFocused, useNavigation} from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import {Country} from "../components/Countries/Country";



LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

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

function FavouritesScreen() {
    const navigation = useNavigation();
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        getFavourites()
    }, [])

    const isFocused = useIsFocused();
    useEffect(()=>{
        getFavourites()
    },[isFocused])

    async function getFavourites() {
        let favs = JSON.parse(await AsyncStorage.getItem(
            '@Favs'
        ));
        if (!favs) {
            favs = []
        }
        setFavs(favs)
    }

    return (
        <View>
            { favs && favs.length === 0 &&
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 30,
                    }}
                >
                    Nie masz żadnych ulubionych lig :(
                </Text>
            }
            { favs && favs.length > 0 && favs.map((fav, key) => {
                return(
                    <Pressable
                        onPress={() => navigation.navigate('League', {
                            code: fav.country,
                            id: fav.id,
                            name: fav.name,
                            logo: fav.logo,
                        })}
                        key={key}
                        style={{
                            backgroundColor: "white",
                            marginTop: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                            }}
                            source={{
                                uri: fav.logo
                            }}
                        />
                        <Text
                            style={{
                                marginLeft: 20,
                                fontSize: 18
                            }}
                        >
                            {fav.name}
                        </Text>
                    </Pressable>
                )
            })}
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

function FavouritesNavigator(props) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Ulubione"
                component={FavouritesScreen}
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


    const [data, setData] = useState([]);
    const [lang, setLang] = useState([]);
    const isFocused = useIsFocused();

    async function getLang() {
        const language = await AsyncStorage.getItem('@Language');
        setLang(language)
    }

    useEffect(()=>{
        getLang()
    },[isFocused])
    useEffect(() => {
        setData({
            options: {
                matches: (lang === 'pl') ? 'Mecze' : 'Matches',
                leagues: (lang === 'pl') ? 'Ligi' : 'Leagues',
                favourites: (lang === 'pl') ? 'Ulubione' : 'Favourites',
            }
        })
    }, [lang])

    return (
        <Tab.Navigator
            initialRouteName={mainTab}
        >
            <Tab.Screen
                name="Leagues"
                component={LeaguesNavigator}
                options={{
                    headerTitle: 'Ligi',
                    tabBarLabel: (data && data.options) ? data.options.leagues : ''
                }}
            />
            <Tab.Screen
                name="Matches"
                component={MatchesScreen}
                options={{
                    headerTitle: 'Mecze',
                    tabBarLabel: (data && data.options) ? data.options.matches : ''
                }}
            />
            <Tab.Screen
                name="Favourities"
                component={FavouritesNavigator}
                options={{
                    headerTitle: 'Ulubione',
                    tabBarLabel: (data && data.options) ? data.options.favourites : ''
                }}
            />
        </Tab.Navigator>
    );
};

export default TopNavigator;
