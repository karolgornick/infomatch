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

import MatchesScreen from "../views/MatchesScreen";

// ulubione
function FavouritesScreen() {
    const navigation = useNavigation();
    const [favs, setFavs] = useState([]);

    // pobieranie ulubionych przy otworzeniu widoku
    useEffect(() => {
        getFavourites()
    }, [])

    const isFocused = useIsFocused();
    // pobieranie ulubionych przy otworzeniu widoku
    useEffect(()=>{
        getFavourites()
    },[isFocused])


    // pobieranie ulubionych
    async function getFavourites() {
        let favs = await AsyncStorage.getItem(
            '@Favs'
        );
        let user = JSON.parse(await AsyncStorage.getItem(
            '@User'
        ));

        // sprawdzanie czy user jest zalogowany, jeśli tak to ulubieni z usera, jeśli nie to ulubieni z niezalogowanego usera
        favs = (user && user.favourites) ? user.favourites : JSON.parse(favs)
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

// lista krajów z ligami
function LeaguesScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CountriesList></CountriesList>
        </View>
    );
}

// nawigator lig, wyświetla listę krajów lub konkretną ligę (mecze, tabela, strzelcy)
function LeaguesNavigator() {
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

// nawigator ulubionych, wyświetla listę lig lub konkretną ligę (mecze, tabela, strzelcy)
function FavouritesNavigator() {
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

// główny nawigator (ligi, mecze, ulubione)
const TopNavigator = () => {
    let mainTab;

    const getMainTab = async () => {
        mainTab = await AsyncStorage.getItem(
            '@MainTab'
        );
        if (!mainTab) {
            mainTab === 'Leagues'
        }
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
