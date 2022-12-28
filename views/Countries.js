import React from "react";
import {getCountries} from "../api/FootballAPI";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import {
    List
} from "react-native-paper";
import {SvgFromUri} from "react-native-svg";
import {
    Country
} from "../components/Countries/Country";


export class CountriesList extends React.Component {
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
                        <List.Section
                            style={{
                                width: '100%',
                            }}
                            key="ListSection"
                        >
                            {this.state.countries.map((country) => {
                                return (
                                    <List.Accordion
                                        key={country.name}
                                        style={{
                                            backgroundColor: 'white',
                                        }}
                                        title={country.name}>
                                        <Country
                                            code={country.code}
                                        />
                                    </List.Accordion>
                                );
                            })}

                        </List.Section>
                    }
                </View>
            </ScrollView>
        );
    }
}
