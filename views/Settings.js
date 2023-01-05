import React, {useEffect, useState} from "react";
import {
    View,
    Text, AsyncStorage,
} from "react-native";
import {Picker} from '@react-native-picker/picker';

const Settings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedTab, setSelectedTab] = useState();
    const [data, setData] = useState([]);

    const setLanguage = async (itemValue) => {
        await AsyncStorage.setItem(
            '@Language',
            itemValue
        );
        setSelectedLanguage(itemValue)
        setLanguageVariables(itemValue)
    }

    const setLanguageVariables = (lang) => {
        setData({
            options: {
                en: (lang === 'pl') ? 'angielski' : 'english',
                pl: (lang === 'pl') ? 'polski' : 'polish',
                leagues: (lang === 'pl') ? 'ligi' : 'leagues',
                matches: (lang === 'pl') ? 'mecze' : 'matches',
            }
        })
    }

    const setTab = async (itemValue) => {
        await AsyncStorage.setItem(
            '@MainTab',
            itemValue
        );
        setSelectedTab(itemValue)
    }

    const setLanguageFromState = async () => {
        const lang = await AsyncStorage.getItem('@Language')
        setSelectedLanguage(lang)
        setLanguageVariables(lang)
    }

    const setTabFromState = async () => {
        const tab = await AsyncStorage.getItem('@MainTab')
        setTab(tab)
    }

    useEffect(() =>{
        setLanguageFromState()
        setTabFromState()
    },[])

    return (
        <View
            style={{
                padding: 20,
                backgroundColor: '#fff',
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    fontWeight: "500",
                }}
            >
                { selectedLanguage === 'pl' &&
                    <Text>
                        Ustawienia
                    </Text>
                }
                { selectedLanguage === 'en' &&
                    <Text>
                        Settings
                    </Text>
                }
            </Text>
            { data && data.options &&
                <View>
                    {selectedLanguage === 'pl' &&
                        <Text>
                            Język:
                        </Text>
                    }
                    {selectedLanguage === 'en' &&
                        <Text>
                            Language:
                        </Text>
                    }
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setLanguage(itemValue)
                        }>
                        <Picker.Item
                            label={data.options.pl}
                            value="pl"
                        />
                        <Picker.Item
                            label={data.options.en}
                            value="en"
                        />
                    </Picker>
                    {selectedLanguage === 'pl' &&
                        <Text>
                            Główna zakładka:
                        </Text>
                    }
                    {selectedLanguage === 'en' &&
                        <Text>
                            Main tab:
                        </Text>
                    }
                    <Picker
                        selectedValue={selectedTab}
                        onValueChange={(itemValue, itemIndex) =>
                            setTab(itemValue)
                        }>
                        <Picker.Item
                            label={data.options.leagues}
                            value="Leagues"
                        />
                        <Picker.Item
                            label={data.options.matches}
                            value="Matches"
                        />
                    </Picker>
                </View>
            }
        </View>
    )
}

export default Settings;
