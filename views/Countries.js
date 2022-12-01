import React from "react";
import {getCountries} from "../api/FootballAPI";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {List} from "react-native-paper";
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
            <View style={styles.container}>
                {this.state.countries &&
                    <List.Section
                        style={{
                            width: '100%'
                        }}
                    >
                        {this.state.countries.map((country) => {
                            return (
                                <List.Accordion
                                    style={{
                                        backgroundColor: 'white',
                                    }}
                                    title={country.name}>
                                    <Country
                                        data={country.code}
                                    />
                                </List.Accordion>
                                // <List.Item title={country.name} />
                            );
                        })}

                    </List.Section>
                }
            </View>
        );
    }
}


// <FlatList
//     style={styles.list}
//     data={this.state.countries}
//     renderItem={({ item }) => (
//         // return a component using that data
//         <View
//             style={styles.item}
//         >
//             <SvgFromUri
//                 width="20px"
//                 height="20px"
//                 uri={item.flag}
//                 style={styles.flag}
//             />
//             <Text>{item.name}</Text>
//         </View>
//     )}
// />
