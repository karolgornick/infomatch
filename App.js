/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
// import type {Node} from 'react';
import {
      Button,
      Text,
      View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();



const Stack = createNativeStackNavigator();


// import { createDrawerNavigator } from '@react-navigation/drawer';
//
//
// const Drawer = createDrawerNavigator();

// import 'react-native-gesture-handler';

//
// function MyDrawer() {
//     return (
//         <Drawer.Navigator
//         >
//             <Drawer.Screen name="Logowanie" component={MatchesScreen} />
//             <Drawer.Screen name="Ustawienia" component={LeaguesScreen} />
//         </Drawer.Navigator>
//     );
// }


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const FlatListBasics = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22,
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
            borderBottomWidth: 1,
            width: '100%',
        },
        list: {
            margin: 0,
            padding: 0,
            width: '100%'
        }
    });
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
}

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
          <FlatListBasics></FlatListBasics>
      </View>
  );
}

function TopBar() {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <Text
                style={{
                    marginRight: 10
                }}
            >Tu będzie ikona</Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: 'black'
                }}
            >AppScore</Text>
        </View>

    );
}

function TopBarNavigation() {
    return (
        <NavigationContainer>
            {/*<TopBar></TopBar>*/}
            {/*<Stack.Navigator>*/}
            {/*  <Stack.Screen*/}
            {/*      name="Matches"*/}
            {/*      component={MatchesScreen}*/}
            {/*      options={{ title: 'Mecze', }}*/}
            {/*  />*/}
            {/*  <Stack.Screen*/}
            {/*      name="Leagues"*/}
            {/*      component={LeaguesScreen}*/}
            {/*      options={{ title: 'Ligi' }}*/}
            {/*  />*/}
            {/*</Stack.Navigator>*/}
            <Tab.Navigator>
                <Tab.Screen name="Ligi" component={LeaguesScreen} />
                <Tab.Screen name="Mecze" component={MatchesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default class App extends Component {
  // state = {
  //   view: 'ViewOne'
  // }
  render() {
    return (
        <React.StrictMode>
            <TopBarNavigation></TopBarNavigation>
        </React.StrictMode>
    );
  }
}

// const App: () => Node = () => {
//   return(
//     <SafeAreaView>
//       <ScrollView>
//         <View>
//           <Header/>
//           <Text>
//             dsdasddsdsdsdssddsa
//           </Text>
//           <Text>dsadsad</Text>
//           <ViewOne/>
//           <ViewTwo/>
//           <Button
//               onPress={kurwujMac}
//               title={`kurwamać`}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// };

// export default App;
