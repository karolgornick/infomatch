/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
// import type {Node} from 'react';
import {
      Button,
      Text,
      View,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {SvgFromUri} from "react-native-svg";

import {
    getCountries
} from "./api/FootballAPI";

import {
    test
} from "./api/test";


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


// class Country extends React.Component {
//     render () {
//         return (
//             <Text>dfsafds</Text>
//             <Text>fdsfdsf</Text>
//         )
//     }
// }

class FlatListBasicsTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: null
        };
    }

    async componentDidMount() {
        const fetchCountries = async () => {
            return await getCountries()
        }
        const response = await fetchCountries()
        this.setState(() => {
            return {
                countries: response.response.slice(0, 10)
            }
        })
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                height: "100%",
                alignItems: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 10,
                // flex: 1,
                // paddingTop: 22,
                // position: "relative",
                // width: "100%",
                // padding: "10px"
            },
            item: {
                display: "flex",
                flexDirection: "row",
                paddingVertical: 5,
                borderBottomWidth: 1,
                width: "100%"
                // padding: 10,
                // fontSize: 18,
                // height: 44,
                // borderBottomWidth: 1,
                // width: '100%',
            },
            list: {
                width: "100%",
                // position: "absolute",
                // left: 0,
                // marginLeft: 0,
                // margin: 0,
                // padding: 0,
                // width: '100%'
            },
            flag: {
                height: 30,
                width: 30,
                marginRight: 10
            }
        });
        return (
            <View style={styles.container}>
                {this.state.countries &&
                    <Text>dsadsa</Text>
                }
                {this.state.countries &&
                    <FlatList
                        style={styles.list}
                        data={this.state.countries}
                        renderItem={({ item }) => (
                            // return a component using that data
                            <View
                                style={styles.item}
                            >
                                <SvgFromUri
                                    width="20px"
                                    height="20px"
                                    uri={item.flag}
                                    style={styles.flag}
                                />
                                <Text>{item.name}</Text>
                            </View>
                        )}
                    />
                }
            </View>
        );
    }
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
          <React.StrictMode>
            <FlatListBasicsTwo></FlatListBasicsTwo>
          </React.StrictMode>
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
        <TopBarNavigation></TopBarNavigation>
        // <React.StrictMode>
        //     <TopBarNavigation></TopBarNavigation>
        // </React.StrictMode>
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
