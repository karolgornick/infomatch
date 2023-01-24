import React from "react";
import {getCountries} from "../api/FootballAPI";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable, Image,
} from "react-native";
import {
    Country
} from "../components/Countries/Country";

// lista krajów z dropdownami na zakładce LIGI
export class CountriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: null,
            selected: [],
            language: null
        };
    }

    // pobieranie krajów z jsona
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

    // sprawdzanie czy dropdown kraju jest rozwiniety
    checkIfSelected (code) {
        let selected = this.state.selected,
            index = selected.indexOf(code)
        if (index >= 0) {
            return  true
        }
        return false
    }

    // rozwijanie dropdowna kraju
    selectCode (code) {
        let selected = this.state.selected,
            index = selected.indexOf(code)
        if (index < 0) {
            selected.push(code)
        } else {
            selected.splice(index, 1)
        }
        this.setState({
            selected
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
            },
            item: {
                display: "flex",
                flexDirection: "row",
                paddingVertical: 5,
                borderBottomWidth: 1,
                width: "100%"
            },
            list: {
                width: "100%",
            },
        });


        return (
            <ScrollView
                style={{
                    width: '100%'
                }}
            >
                <View
                    style={styles.container}
                    key="List"
                >
                    {this.state.countries &&
                        <View
                            style={{
                                width: '100%'
                            }}
                        >
                            {this.state.countries.map((country) => {
                                return (
                                    <Pressable
                                        key={country.name}
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: 20,
                                            paddingVertical: 20,
                                            backgroundColor: 'white',
                                            marginBottom: 10,
                                        }}
                                        onPress={() => { this.selectCode(country.code) }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: 'white',
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Text>
                                                {country.name}
                                            </Text>
                                            <Image
                                                source={{
                                                    uri: 'https://www.vippng.com/png/detail/31-311399_white-down-arrow-icon-png-icon-chevron-down.png'
                                                }}
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    backgroundColor: 'white',
                                                    transform: [
                                                        {
                                                            rotate: (this.checkIfSelected(country.code)) ? '180deg' : '0deg'
                                                        }
                                                    ]
                                                }}
                                            />
                                        </View>
                                        { this.checkIfSelected(country.code) &&
                                            <View
                                                style={{
                                                    backgroundColor: 'white',
                                                }}
                                                title={country.name}>
                                                <Country
                                                    code={country.code}
                                                />
                                            </View>
                                        }
                                    </Pressable>
                                );
                            })}
                        </View>
                    }
                </View>
            </ScrollView>
        );
    }
}
