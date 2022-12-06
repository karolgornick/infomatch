import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import TopNavigator from "./TopNavigator";
import {Login} from "../views/Login";
import {Settings} from "../views/Settings";
import {Register} from "../views/Register";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="InfoMatch">
            <Drawer.Screen name="InfoMatch" component={TopNavigator} />
            <Drawer.Screen name="Zaloguj się" component={Login} />
            <Drawer.Screen name="Zarejestruj się" component={Register} />
            <Drawer.Screen name="Ustawienia" component={Settings} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
