import React,{useState,useEffect} from 'react';

import {
    View,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    SafeAreaView, Image,
} from "react-native";

import moment from 'moment';
import apiData from '../api/apiData'

import { useNavigation } from '@react-navigation/native';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Table, Row } from 'react-native-table-component';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import scorersData from "../api/en/scorers.json";
const Tab = createMaterialTopTabNavigator();

export const League = (props) => {
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Mecze"
                children={() => <LeagueMatches prop={props} /> }
            />
            <Tab.Screen
                name="Tabela"
                children={() => <LeagueTable prop={props} />}
            />
            <Tab.Screen
                name="Strzelcy"
                children={() => <LeagueScorers prop={props} /> }
            />
            <Tab.Screen
                name="Match"
                children={() => <LeagueMatch prop={props} />}
            />
        </Tab.Navigator>
    )
}

function LeagueMatches (props) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const getData = () => {
        const data = apiData[props.prop.route.params.code.toLowerCase()].matches
        const matchesData = data.find(item => item.parameters.league == props.prop.route.params.id)
        let shortData = matchesData.response
        shortData = shortData.sort(function(a,b){
            return new Date(b.fixture.date) - new Date(a.fixture.date);
        })
        const index = shortData.findIndex(item => new Date(item.fixture.date) < new Date())
        setData({
            matches: shortData.slice(index - 8, index + 50)
        })
    }
    useEffect(()=>{
        getData()
    },[])

    function redirectToMatch() {
        navigation.navigate('Tabela')
    }
    return (
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
            }}>
                <Pressable onPress={redirectToMatch}>
                    <View>
                        { data && data.matches &&
                            data.matches.map((data, key) => {
                                let homeColor = null, awayColor = null
                                if (data.teams.home.winner === false && data.teams.away.winner === true) {
                                    homeColor = 'red'
                                } else if (data.teams.home.winner === true && data.teams.away.winner === false) {
                                    homeColor = 'green'
                                }
                                if (data.teams.away.winner === false && data.teams.home.winner === true) {
                                    awayColor = 'red'
                                } else if (data.teams.away.winner === true && data.teams.home.winner === false) {
                                    awayColor = 'green'
                                }
                                return (
                                    <View
                                        key={`match-${key}`}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <View
                                            style={{
                                                // borderWidth: 1,
                                                paddingVertical: 2,
                                                paddingHorizontal: 5,
                                            }}
                                        >
                                            <Text>
                                                {/*{new Date(data.fixture.date).toLocaleDateString("pl-PL")}*/}
                                                {moment(new Date(data.fixture.date)).format('DD.MM.YYYY')}
                                            </Text>
                                            <Text style={{textAlign: "center"}}>
                                                {/*{new Date(data.fixture.date).toLocaleTimeString("pl-PL", {*/}
                                                {/*    timeStyle: 'short'*/}
                                                {/*})}*/}
                                                {moment(new Date(data.fixture.date)).format('HH:mm')}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                // borderWidth: 1,
                                                flexGrow: 1,
                                                paddingVertical: 8,
                                                paddingHorizontal: 5,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: homeColor
                                                }}
                                            >
                                                {data.teams.home.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                    color: awayColor
                                                }}
                                            >
                                                {data.teams.away.name}
                                            </Text>
                                        </View>
                                        <View style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>
                                            <Text>
                                                {data.goals.home}
                                            </Text>
                                            <Text>
                                                {data.goals.away}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

function LeagueScorers () {
    const [data, setData] = useState([]);

    const getData = () => {
        const scorersData = require('../api/en/scorers.json');
        setData({
            scorers: scorersData.response.slice(0, 15)
        })
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
            }}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderRightWidth: 1,
                    }}
                >
                    { data && data.scorers &&
                        data.scorers.map((data, key) => {
                            return (
                                <View
                                    key={`scorer-${key}`}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            borderLeftWidth: 1,
                                            borderTopWidth: 1,
                                            paddingVertical: 5,
                                            paddingHorizontal: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                flexGrow: 1
                                            }}
                                        >
                                            {data.player.firstname} {data.player.lastname}
                                        </Text>
                                        <Text>
                                            {data.statistics[0].goals.total}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function LeagueMatch () {
    const [data, setData] = useState([]);

    const style = {
        text: {
            textAlign: "center"
        }
    }

    const getData = () => {
        const scorersData = require('../api/en/match.json');
        setData({
            match: scorersData.response[0]
        })
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
            }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    { data && data.match &&
                        data.match.statistics.map((data, key) => {
                            return (
                                <View
                                    key={`stat-${key}`}
                                    style={{
                                        width: '50%'
                                    }}
                                >
                                    <View>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                                source={{
                                                    uri: data.team.logo
                                                }}
                                            ></Image>
                                        </View>
                                        <Text
                                            style={style.text}
                                        >
                                            {data.team.name}
                                        </Text>
                                        { data.statistics.map((stat, key2) => {
                                            return(
                                                <View
                                                    key={`stat-${key}-${key2}`}
                                                >
                                                    <Text
                                                        style={style.text}
                                                    >
                                                        {stat.type}
                                                    </Text>
                                                    <Text
                                                        style={style.text}
                                                    >
                                                        {(stat.value) ? stat.value : 0}
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

function LeagueTable (prop) {
    const [data, setData] = useState([]);

    const getData = () => {
        const leagueData = require('../api/en/table.json');
        setData({
            league: leagueData.response[0].league,
            standings: leagueData.response[0].league.standings[0]
        })
    }
    useEffect(()=> {
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
            </ScrollView>
        </SafeAreaView>
    )
}
