import React, {useEffect, useState} from "react";
import {
    AsyncStorage,
    View,
    Text,
    Image,
} from "react-native";

import {
    createDrawerNavigator,
    DrawerItem,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import TopNavigator from "./TopNavigator";
import {Login} from "../views/Login";
import Settings from "../views/Settings";
import {Register} from "../views/Register";
import { useDrawerStatus } from '@react-navigation/drawer';
import {
    LeagueMatch
} from "../views/League";
import Profile from "../views/Profille";


const Drawer = createDrawerNavigator();

// Drawer nawigator
const DrawerContentComponent = (props) => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const lang = await AsyncStorage.getItem('@Language');
        if (!lang) {
            await AsyncStorage.setItem(
                '@Language',
                'pl'
            );
        }
        const user = await AsyncStorage.getItem('@User');

        setData({
            user: JSON.parse(user),
            screens: {
                login: (lang === 'pl') ? 'Zaloguj się' : 'Log in',
                logout: (lang === 'pl') ? 'Wyloguj się' : 'Log out',
                settings: (lang === 'pl') ? 'Ustawienia' : 'Settings',
                register: (lang === 'pl') ? 'Zarejestruj się' : 'Register',
                profile: (lang === 'pl') ? 'Profil' : 'Profile',
            }
        })
    }

    // sprawdzanie czy drawer jest otartwy
    const isDrawerOpen = useDrawerStatus() === 'open';
    if (isDrawerOpen === true) {
        getData()
    }

    // wylogowanie usera
    const logout = () => {
        logoutUser()
    }

    const logoutUser = async () => {
        await AsyncStorage.removeItem(
            '@User',
        );
        getData()
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <DrawerContentScrollView>
            {data && data.user &&
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 10,
                        paddingLeft: 20,
                    }}
                >
                    <Image
                        source = {{
                            uri: (data.user.avatar) ? data.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                    }}
                        style = {{
                            width: 60,
                            height: 60,
                            borderRadius: 100,
                            marginRight: 10,
                    }}
                    />
                    <Text>
                        {data.user.login}
                    </Text>
                </View>
            }
            <DrawerItem label="InfoMatch" onPress={() => props.navigation.navigate("Dashboard")} />
            {data && data.user && data.screens &&
                <View>
                    <DrawerItem
                        label={data.screens.profile}
                        onPress={() => props.navigation.navigate("Profile")}
                    />
                    <DrawerItem
                        label={data.screens.settings}
                        onPress={() => props.navigation.navigate("Ustawienia")}
                    />
                    <DrawerItem
                        label={data.screens.logout}
                        onPress={() => logout()}
                    />
                </View>
            }
            { data && !data.user && data.screens &&
                <View>
                    <DrawerItem
                        label={data.screens.login}
                        onPress={() => props.navigation.navigate("Login")}
                    />
                    <DrawerItem
                        label={data.screens.register}
                        onPress={() => props.navigation.navigate("Register")}
                    />
                </View>
            }
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const lang = await AsyncStorage.getItem('@Language');
        if (!lang) {
            await AsyncStorage.setItem(
                '@Language',
                'pl'
            );
        }
        const user = await AsyncStorage.getItem('@User');

        setData({
            user: JSON.parse(user),
            screens: {
                login: (lang === 'pl') ? 'Zaloguj się' : 'Log in',
                settings: (lang === 'pl') ? 'Ustawienia' : 'Settings',
                register: (lang === 'pl') ? 'Zarejestruj się' : 'Register',
                profile: (lang === 'pl') ? 'Profil' : 'Profile',
            }
        })
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerContentComponent {...props} /> }
        >
            <Drawer.Screen
                name="Dashboard"
                component={TopNavigator}
                options={{ headerTitle: 'InfoMatch' }}
            />
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{ headerTitle: (data && data.screens) ? data.screens.login : '' }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{ headerTitle: (data && data.screens) ? data.screens.register : '' }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{ headerTitle: (data && data.screens) ? data.screens.profile: '' }}
            />
            <Drawer.Screen
                name="Ustawienia"
                component={Settings}
                options={{ headerTitle: (data && data.screens) ? data.screens.settings: '' }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
