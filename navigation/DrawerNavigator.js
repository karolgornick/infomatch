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


const Drawer = createDrawerNavigator();


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
            }
        })
    }

    const isDrawerOpen = useDrawerStatus() === 'open';
    if (isDrawerOpen === true) {
        getData()
    }

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
                        source = {{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'}}
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
                options={{ headerTitle: 'Zaloguj się' }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{ headerTitle: 'Zarejestruj się' }}
            />
            <Drawer.Screen name="Ustawienia" component={Settings} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
