import React from "react";
import {
    View,
    Text,
    Image, Pressable, Button
} from "react-native";
import {
    getCountryLeague
} from "../../api/FootballAPI";

import { useNavigation } from '@react-navigation/native';
// const navigation = useNavigation();

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
// const navigation = createNativeStackNavigator();

export const Country = () => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('Liga')}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 30,
                    width: "100%",
                    alignItems: "center",
                    // paddingTop: (i === 0) ? 10 : 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}
            >
                <Text
                    style={{
                        marginLeft: 20,
                        fontSize: 14
                    }}
                >
                    Liga 1
                </Text>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingHorizontal: 30,
                    width: "100%",
                    alignItems: "center",
                    // paddingTop: (i === 0) ? 10 : 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}
            >
                <Text
                    style={{
                        marginLeft: 20,
                        fontSize: 14
                    }}
                >
                    Liga 2
                </Text>
            </View>
        </Pressable>
    );
};

// export default function Country ({ navigation }) {
//     console.log(navigation)
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//             <Button
//                 title="Go to Details"
//                 onPress={() => navigation.navigate('Details')}
//             />
//         </View>
//     );
// }





// export class Country extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             leagues: null,
//             navigator: null
//         };
//     }
//
//     async componentDidMount() {
//         const fetchLeagues = async () => {
//             return await getCountryLeague(this.props.code)
//         }
//         const response = await fetchLeagues()
//         // const navigation = await useNavigation();
//
//         this.setState(() => {
//             return {
//                 leagues: response.response
//             }
//         })
//     }
//
//     render() {
//         return(
//             <View key="Ligawloska">
//                 {this.state.leagues &&
//                     this.state.leagues.map((country, i) => {
//                         return (
//                             <View
//                                 key={country.league.name}
//                             >
//                                 <Pressable
//                                     style={{
//                                         display: "flex",
//                                         flexDirection: "row",
//                                         paddingHorizontal: 30,
//                                         width: "100%",
//                                         alignItems: "center",
//                                         paddingTop: (i === 0) ? 10 : 0,
//                                         paddingBottom: 10,
//                                     }}
//                                     onPress={() => this.props.navigation.navigate('Liga')}
//                                 >
//                                     <Image
//                                         style={{
//                                             width: 40,
//                                             height: 40,
//                                         }}
//                                         source={{
//                                             uri: country.league.logo
//                                         }}
//                                     />
//                                     <Text
//                                         style={{
//                                             marginLeft: 20,
//                                             fontSize: 14
//                                         }}
//                                     >
//                                         {country.league.name}
//                                     </Text>
//                                 </Pressable>
//                             </View>
//                         )
//                     })
//                 }
//             </View>
//         )
//     }
// }


