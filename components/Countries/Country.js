import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    AsyncStorage
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import apiData from '../../api/apiData.js'

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
        let user = JSON.parse(await AsyncStorage.getItem(
            '@User'
        ));
        let users = JSON.parse(await AsyncStorage.getItem(
            '@Users'
        ));

        console.log(users)

        favs = (user && user.favourites) ? user.favourites : JSON.parse(favs)
        if (!favs) {
            favs = []
        }
        setFavs(favs)

    }

    async function setFavourites(item) {
        let favs = JSON.parse(await AsyncStorage.getItem(
            '@Favs'
        ));
        let user = JSON.parse(await AsyncStorage.getItem(
            '@User'
        ));


        if (user) {
            const index = user.favourites.findIndex(x => x.id === item.id)
            if (index < 0) {
                user.favourites.push(item)
            } else {
                user.favourites.splice(index, 1)
            }

            let users = JSON.parse(await AsyncStorage.getItem(
                '@Users'
            ));
            const indexUser = users.findIndex(item => item.email === user.email)
            if (indexUser >= 0) {
                users[indexUser] = user
                await AsyncStorage.setItem(
                    '@User',
                    JSON.stringify(user)
                );
                await AsyncStorage.setItem(
                    '@UserCurrent',
                    JSON.stringify(user)
                );
                await AsyncStorage.setItem(
                    '@Users',
                    JSON.stringify(users)
                );
            }
        } else {
            if (!favs) {
                favs = []
            }
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
        }
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


