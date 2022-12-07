import React,{useState,useEffect} from 'react';

import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    SafeAreaView,
} from "react-native";

import axios from "axios";

import { useNavigation } from '@react-navigation/native';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Table, Row } from 'react-native-table-component';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import leagueData from "../api/en/table.json";
const Tab = createMaterialTopTabNavigator();

export const League = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Mecze" component={LeagueMatches} />
            <Tab.Screen name="Tabela" component={LeagueTable} />
            <Tab.Screen name="Top strzelcy" component={LeagueScorers} />
            <Tab.Screen name="Mecz" component={LeagueMatch} />
        </Tab.Navigator>
    )
}

function LeagueMatches () {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const getData = () => {
        const matchesData = require('../api/en/matches.json.json');
        setData({
            matches: matchesData.response.slice(0, 30)
        })
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <View style={{
            backgroundColor: '#fff',
            padding: 20,
            marginTop: 10,
        }}>
            <Pressable onPress={() => navigation.navigate('Mecz')}>
                <View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <View
                            style={{
                                borderWidth: 1,
                                paddingVertical: 2,
                                paddingHorizontal: 5,
                            }}
                        >
                            <Text>
                                04.11.22
                            </Text>
                            <Text style={{textAlign: "center"}}>
                                18:00
                            </Text>
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                flexGrow: 1,
                                paddingVertical: 2,
                                paddingHorizontal: 5,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Stal Mielec
                            </Text>
                            <Text
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                Zagłębie Lublin
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

function LeagueScorers () {
    return (
        <Text>strzelcy</Text>
    )
}

function LeagueMatch () {
    return (
        <Text>mecz</Text>
    )
}

function LeagueTable () {
    const [data, setData] = useState([]);

    const getData = () => {
        const leagueData = require('../api/en/table.json');
        setData({
            league: leagueData.response[0].league,
            standings: leagueData.response[0].league.standings[0]
        })
    }
    useEffect(()=>{
        getData()
    },[])

    const style = {
        table: {
            body: {
                borderRightWidth: 1,
                borderBottomWidth: 1,
            },
            row: {
                display: "flex",
                flexDirection: "row"
            },
            rowText: {
                paddingVertical: 4,
                paddingHorizontal: 5,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                fontSize: 11,
                minWidth: 33
            }
        }
    }

    return(
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
                paddingBottom: 10,
            }}>
                {data && data.league &&
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            marginBottom: 10
                        }}
                    >
                        {data.league.name}
                    </Text>
                }
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginVertical: 10,
                    }}
                >
                    <View
                        style={{
                            width: '33%',
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderRadius: 3,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                            }}
                        >
                            <Text>Wszystkie</Text>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            width: '33%',
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderRadius: 3,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                            }}
                        >
                            <Text>Dom</Text>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            width: '33%',
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderRadius: 3,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                            }}
                        >
                            <Text>Wyjazd</Text>
                        </Pressable>
                    </View>
                </View>

                <View
                    style={style.table.body}
                >
                    <View
                        style={style.table.row}
                    >
                        <Text
                            style={style.table.rowText}
                        >
                            #
                        </Text>
                        <Text
                            style={Object.assign({
                                flexGrow: 1,
                            }, style.table.rowText)}
                        >
                            Zespół
                        </Text>
                        <Text
                            style={style.table.rowText}
                        >
                            M
                        </Text>
                        <Text
                            style={style.table.rowText}
                        >
                            W
                        </Text>
                        <Text
                            style={style.table.rowText}
                        >
                            R
                        </Text>
                        <Text
                            style={style.table.rowText}
                        >
                            P
                        </Text>
                        <Text
                            style={style.table.rowText}
                        >
                            PTS
                        </Text>
                    </View>
                    { data && data.league &&
                        data.league.standings[0].map((data, key) => {
                            return (
                                <View
                                    key={`team-${key}`}
                                    style={style.table.row}
                                >
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.rank}.
                                    </Text>
                                    <Text
                                        style={Object.assign({
                                            flexGrow: 1,
                                        }, style.table.rowText)}
                                    >
                                        {data.team.name}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.all.played}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.all.win}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.all.draw}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.all.lose}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data.points}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text>stds</Text>

                {/*<Table*/}
                {/*    borderStyle={{*/}
                {/*        borderWidth: 1*/}
                {/*    }}*/}
                {/*>*/}
                {/*    /!*<Row*!/*/}
                {/*    /!*    textStyle={{*!/*/}
                {/*    /!*        color: 'red'*!/*/}
                {/*    /!*    }}*!/*/}
                {/*    /!*    data={['#', 'Zespół', 'P', 'DIFF', 'PTS']}*!/*/}
                {/*    /!*></Row>*!/*/}
                {/*    /!*<Row*!/*/}
                {/*    /!*    textStyle={{*!/*/}
                {/*    /!*        color: 'red'*!/*/}
                {/*    /!*    }}*!/*/}
                {/*    /!*    data={['1.', 'Zespół 1', '13', '+14', '29']}*!/*/}
                {/*    /!*></Row>*!/*/}
                {/*    /!*<Row*!/*/}
                {/*    /!*    textStyle={{*!/*/}
                {/*    /!*        color: 'red'*!/*/}
                {/*    /!*    }}*!/*/}
                {/*    /!*    data={['2.', 'Zespół 2', '13', '+14', '29']}*!/*/}
                {/*    /!*></Row>*!/*/}
                {/*</Table>*/}
            </ScrollView>
        </SafeAreaView>
    )
}
