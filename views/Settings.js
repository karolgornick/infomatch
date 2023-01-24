import React, {useEffect, useState} from "react";
import {
    View,
    Text, AsyncStorage,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import Cameras from "../components/Cameras";

// widok ustawien
const Settings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [data, setData] = useState([]);

    // sprawdzanie jezyka
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


    const setLanguageFromState = async () => {
        const lang = await AsyncStorage.getItem('@Language')
        setSelectedLanguage(lang)
        setLanguageVariables(lang)
    }


    useEffect(() =>{
        setLanguageFromState()
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
                    marginBottom: 20
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
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: 4,
                            marginTop: 5,
                            marginBottom: 10,
                        }}
                    >
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
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <Cameras
                            lang={selectedLanguage}
                        ></Cameras>
                    </View>
                </View>
            }
        </View>
    )
}

export default Settings;
