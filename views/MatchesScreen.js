import {AsyncStorage, Button, Image, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {
    ScrollView
} from "react-native";

import apiData from '../api/apiData'
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";

// widok meczy z zakładki MECZE
function MatchesScreen({ navigation }) {
    const [data, setData] = useState(null)
    const [language, setLanguage] = useState(null)
    const isFocused = useIsFocused();

    async function getLang() {
        const language = await AsyncStorage.getItem('@Language');
        setLanguage(language)
    }

    useEffect(()=>{
        getLang()
    },[isFocused])

    useEffect(() => {
        let countries = []
        for (let i in apiData) {
            let country = {}
            switch (true) {
                case i === 'pl':
                    country.names = {
                        pl: 'Polska',
                        en: 'Poland'
                    }
                    break;
                case i === 'de':
                    country.names = {
                        pl: 'Niemcy',
                        en: 'Germany'
                    }
                    break;
                case i === 'es':
                    country.names = {
                        pl: 'Hiszpania',
                        en: 'Spain'
                    }
                    break;
                case i === 'it':
                    country.names = {
                        pl: 'Włochy',
                        en: 'Italy'
                    }
                    break;
                case i === 'gb':
                    country.names = {
                        pl: 'Anglia',
                        en: 'England'
                    }
                    break;
            }
            let shortData = apiData[i].matches[0].response
            shortData = shortData.sort(function(a,b){
                return new Date(b.fixture.date) - new Date(a.fixture.date);
            })
            const index = shortData.findIndex(item => new Date(item.fixture.date) < new Date())
            country.matches = shortData.slice(index - 4, index)
            countries.push(country)
        }
        setData(countries)

    }, [])

    return (
        <ScrollView
            style={{
                padding: 20,
                marginTop: 20,
            }}
        >
            { data && language &&
                <View>
                    { data.map((country, key) => {
                        return(
                            <View key={`matches-country-${key}`}>
                                <Text
                                    style={{
                                        borderBottomWidth: 1,
                                        paddingVertical: 10,
                                        marginTop: (key > 0) ? 30 : 0,
                                        textAlign: "center",
                                        backgroundColor: '#fff',
                                        fontSize: 20,
                                        fontWeight: "500" +
                                            ""
                                    }}
                                >
                                    { country.names[language] }
                                </Text>
                                { country.matches.map((match, matchKey) => {
                                    return(
                                        <View
                                            key={`matches-country-${key}-${matchKey}`}
                                            style={{
                                                backgroundColor: '#fff',
                                                display: "flex",
                                                flexDirection: "row",
                                                paddingVertical: 10,
                                                borderTopWidth: (matchKey > 0) ? 1 : 0,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    width: "30%"
                                                }}
                                            >
                                                <Image
                                                    source={{
                                                        uri: match.teams.home.logo
                                                    }}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        backgroundColor: 'white',
                                                    }}
                                                />
                                                <Text style={{
                                                    textAlign: "center",
                                                    marginTop: 10
                                                }}>
                                                    { match.teams.home.name }
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexGrow: 1,
                                                    textAlign: "center",
                                                    width: '40%',
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Text style={{textAlign: "center"}}>
                                                    {moment(new Date(match.fixture.date)).format('DD.MM.YYYY')}
                                                </Text>
                                                <Text style={{textAlign: "center"}}>
                                                    {moment(new Date(match.fixture.date)).format('HH:mm')}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    width: "30%"
                                                }}
                                            >
                                                <Image
                                                    source={{
                                                        uri: match.teams.away.logo
                                                    }}
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        backgroundColor: 'white',
                                                    }}
                                                />
                                                <Text style={{
                                                    textAlign: "center",
                                                    marginTop: 10
                                                }}>
                                                    { match.teams.away.name }
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            }
        </ScrollView>
    );
}

export default MatchesScreen;
