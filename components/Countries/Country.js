import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    Image, Pressable, Button, AsyncStorage
} from "react-native";
import {
    getCountryLeague
} from "../../api/FootballAPI";

import { useNavigation } from '@react-navigation/native';
import apiData from '../../api/apiData.js'
import matchesData from "../../api/en/matches.json";
// const navigation = useNavigation();

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
// const navigation = createNativeStackNavigator();

export const Country = (props) => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [favs, setFavs] = useState([]);

    const getData = () => {
        const data = apiData[props.code.toLowerCase()];
        setData({
            leagues: data.leagues.response
        })
    }
    useEffect(()=>{
        getData()
        checkFavourites()
    },[])

    async function checkFavourites() {
        let favs = await AsyncStorage.getItem(
            '@Favs'
        );
        favs = JSON.parse(favs)
        if (!favs) {
            favs = []
        }
        setFavs(favs)

    }

    async function setFavourites(item) {
        let favs = JSON.parse(await AsyncStorage.getItem(
            '@Favs'
        ));

        console.log(`favs ${favs}`)

        if (!favs) {
            favs = []
        }

        console.log(favs)


        const index = favs.findIndex(x => x.id === item.id)
        if (index < 0) {
            favs.push(item)
        } else {
            favs.splice(index, 1)
        }
        await AsyncStorage.setItem(
            '@Favs',
            JSON.stringify(favs)
        );
        checkFavourites()
    }

    return (
        <View>
            {data.leagues &&
                data.leagues.map((item, key) => (
                    <View
                        key={key}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                width: "100%",
                                alignItems: "center",
                                // paddingTop: (i === 0) ? 10 : 0,
                                marginTop: 20,
                                paddingBottom: 10,
                            }}
                        >
                            <Pressable
                                onPress={() => navigation.navigate('League', {
                                    code: props.code,
                                    id: item.league.id,
                                    name: item.league.name,
                                    logo: item.league.logo,
                                })}
                                style={{
                                    width: '90%',
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={{
                                        uri: item.league.logo
                                    }}
                                />
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        fontSize: 14
                                    }}
                                >
                                    {item.league.name}
                                </Text>
                            </Pressable>
                            {favs &&
                                <Pressable
                                    onPress={() => {
                                        setFavourites(item.league)
                                    }}
                                    style={{
                                        width: '10%',
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    {favs.findIndex(x => x.id === item.league.id) < 0 &&
                                        <Image
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                            source={{
                                                uri: 'https://cdn-icons-png.flaticon.com/512/130/130188.png'
                                            }}
                                        />
                                    }
                                    {favs.findIndex(x => x.id === item.league.id) >= 0 &&
                                        <Image
                                            style={{
                                                width: 20,
                                                height: 20,
                                            }}
                                            source={{
                                                uri: 'https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png'
                                            }}
                                        />
                                    }
                                </Pressable>
                            }
                        </View>
                    </View>
                ))
            }
        </View>
    );
};


