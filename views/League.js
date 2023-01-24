import React,{useState,useEffect} from 'react';

import {
    View,
    Text,
    Pressable,
    ScrollView,
    SafeAreaView, Image, AsyncStorage,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import apiData from '../api/apiData'
import {BackHandler} from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import {
    LeagueHeader
} from "../components/LeagueHeader";

export const League = (props) => {
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
                table: (lang === 'pl') ? 'Tabela' : 'Table',
                scorers: (lang === 'pl') ? 'Strzelcy' : 'Scorers',
                match: (lang === 'pl') ? 'Mecz' : 'Match',
            }
        })
    }, [lang])
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Matches"
                children={() => <LeagueMatches prop={props} /> }
                options={{
                    title: (data && data.options) ? data.options.matches : ''
                }}
            />
            <Tab.Screen
                name="Table"
                children={() => <LeagueTable prop={props} />}
                options={{
                    title: (data && data.options) ? data.options.table : ''
                }}
            />
            <Tab.Screen
                name="Scorers"
                children={() => <LeagueScorers prop={props} /> }
                options={{
                    title: (data && data.options) ? data.options.scorers : ''
                }}
            />
        </Tab.Navigator>
    )
}

function LeagueMatches (props) {
    const [data, setData] = useState([]);
    const [match, setMatch] = useState(null);

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

    function removeMatch() {
        setMatch(null)
        BackHandler.removeEventListener("hardwareBackPress", removeMatch, true)
        return true;
    }

    function redirectToMatch(item) {
        if (item.fixture.periods.first) {
            setMatch(item)
            BackHandler.addEventListener('hardwareBackPress', removeMatch);
        }
    }
    return (
        <SafeAreaView>

                { !match &&
                    <ScrollView style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        marginTop: 10,
                    }}>
                        <LeagueHeader
                            data={
                                props.prop.route.params
                            }
                        ></LeagueHeader>
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
                                        <Pressable
                                            key={`match-${key}`}
                                            onPress={() => redirectToMatch(data)}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row"
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        paddingVertical: 2,
                                                        paddingHorizontal: 5,
                                                    }}
                                                >
                                                    { data &&
                                                        <View>
                                                            <Text>
                                                                {moment(new Date(data.fixture.date)).format('DD.MM.YYYY')}
                                                            </Text>
                                                            <Text style={{textAlign: "center"}}>
                                                                {moment(new Date(data.fixture.date)).format('HH:mm')}
                                                            </Text>
                                                        </View>
                                                    }

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
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                }
                { match &&
                    <LeagueMatch
                        data={match}
                    ></LeagueMatch>
                }
        </SafeAreaView>
    )
}

function LeagueScorers (props) {
    const [data, setData] = useState([]);
    const getData = () => {
        const data = apiData[props.prop.route.params.code.toLowerCase()].scorers
        const scorersData = data.find(item => item.parameters.league == props.prop.route.params.id)
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
                <LeagueHeader
                    data={
                        props.prop.route.params
                    }
                ></LeagueHeader>
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

function LeagueMatch (props) {
    const [data, setData] = useState(null);
    const [lang, setLang] = useState('pl');
    const style = {
        text: {
            textAlign: "center",
            fontSize: 12,
        },
        container: {
            marginTop: 7,
        }
    }

    const isFocused = useIsFocused();

    async function getLang() {
        const language = await AsyncStorage.getItem('@Language');
        setLang(language)
    }

    useEffect(()=>{
        getLang()
    },[isFocused])


    const getData = () => {
        const scorersData = require('../api/en/match.json');
        setData({
            match: scorersData.response[0],
            teams: props.data
        })
    }

    useEffect(()=>{
        getData()
    },[])

    function getText(text) {
        if (lang === 'en') {
            return text
        } else if (text === 'Shots on Goal') {
            return 'Strzały celne'
        } else if (text === 'Shots off Goal') {
            return 'Strzały niecelne'
        } else if (text === 'Total Shots') {
            return 'Wszystkie strzały'
        } else if (text === 'Blocked Shots') {
            return 'Strzały blokowane'
        } else if (text === 'Shots insidebox') {
            return 'Strzały w p. karnym'
        } else if (text === 'Shots outsidebox') {
            return 'Strzały zza karnego'
        } else if (text === 'Fouls') {
            return 'Faule'
        } else if (text === 'Corner Kicks') {
            return 'Rzuty rożne'
        } else if (text === 'Offsides') {
            return 'Spalone'
        } else if (text === 'Ball Possession') {
            return 'Posiadanie piłki'
        } else if (text === 'Yellow Cards') {
            return 'Żółte kartki'
        } else if (text === 'Red Cards') {
            return 'Czerwone kartki'
        } else if (text === 'Goalkeeper Saves') {
            return 'Strzały obronione'
        } else if (text === 'Total passes') {
            return 'Podania'
        } else if (text === 'Passes accurate') {
            return 'Celność podań'
        } else if (text === 'Passes %') {
            return 'Podania %'
        }
        return text
    }

    return (
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                padding: 20,
                marginTop: 10,
            }}>
                {data && data.teams && data.match &&
                    <View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <View
                                style={{
                                    width: '35%',
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={{
                                        uri: props.data.teams.home.logo
                                    }}
                                ></Image>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 12
                                    }}
                                >
                                    { props.data.teams.home.name }
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    marginTop: 30,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: "600"
                                    }}
                                >
                                    {props.data.score.fulltime.home} - {props.data.score.fulltime.away}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "500",
                                        color: "grey"
                                    }}
                                >
                                    ({props.data.score.halftime.home} - {props.data.score.halftime.away})
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '35%',
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={{
                                        uri: props.data.teams.away.logo
                                    }}
                                ></Image>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 12,
                                    }}
                                >
                                    { props.data.teams.away.name }
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <View
                                style={{
                                    width: '35%',
                                }}
                            >
                                {data && data.match &&
                                    data.match.statistics[0].statistics.map((stat, key) => {
                                        return(
                                            <View
                                                key={`stat-0-${key}`}
                                                style={style.container}
                                            >
                                                <Text
                                                    style={style.text}
                                                >
                                                    {(stat.value) ? stat.value : 0}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View
                                style={{
                                    width: '30%'
                                }}
                            >
                                {data && data.match &&
                                    data.match.statistics[0].statistics.map((stat, key) => {
                                        return(
                                            <View
                                                key={`stat-1-${key}`}
                                                style={style.container}
                                            >
                                                <Text
                                                    style={style.text}
                                                >
                                                    { getText(stat.type) }
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View
                                style={{
                                    width: '35%'
                                }}
                            >
                                {data && data.match &&
                                    data.match.statistics[1].statistics.map((stat, key) => {
                                        return(
                                            <View
                                                key={`stat-2-${key}`}
                                                style={style.container}
                                            >
                                                <Text
                                                    style={style.text}
                                                >
                                                    {(stat.value) ? stat.value : 0}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

function LeagueTable (props) {
    const [data, setData] = useState([]);
    const [type, setType] = useState([]);

    const getData = () => {
        const data = apiData[props.prop.route.params.code.toLowerCase()].tables
        const tablesData = data.find(item => item.parameters.league == props.prop.route.params.id)
        setData({
            league: tablesData.response[0].league,
            standings: tablesData.response[0].league.standings[0]
        })
    }
    useEffect(()=> {
        setType('all')
        getData()
    },[])

    const style = {
        table: {
            body: {
                borderRightWidth: 1,
                borderBottomWidth: 1,
                marginBottom: 10,
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
        },
        picker: {
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: 20,
        }
    }

    return(
        <SafeAreaView>
            <ScrollView style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                marginTop: 10,
                //paddingBottom: 10,
            }}>
                <LeagueHeader
                    data={
                        props.prop.route.params
                    }
                ></LeagueHeader>
                <View
                    style={
                        style.picker
                    }
                >
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) =>
                            setType(itemValue)
                        }>
                        <Picker.Item
                            label="Wszystkie"
                            value="all"
                        />
                        <Picker.Item
                            label="Dom"
                            value="home"
                        />
                        <Picker.Item
                            label="Wyjazd"
                            value="away"
                        />
                    </Picker>
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
                                        {data[type].played}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data[type].win}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data[type].draw}
                                    </Text>
                                    <Text
                                        style={style.table.rowText}
                                    >
                                        {data[type].lose}
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
