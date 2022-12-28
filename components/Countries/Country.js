import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    Image, Pressable, Button
} from "react-native";
import {
    getCountryLeague
} from "../../api/FootballAPI";

import { useNavigation } from '@react-navigation/native';
import apiData from '../../api/apiData.js'
import matchesData from "../../api/en/matches.json";
// const navigation = useNavigation();

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
// const navigation = createNativeStackNavigator();

export const Country = (props) => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const getData = () => {
        const data = apiData[props.code.toLowerCase()];
        setData({
            leagues: data.leagues.response
        })

    }
    useEffect(()=>{
        getData()

    },[])

    return (
        <View>
            {data.leagues &&
                data.leagues.map((item, key) => (
                    <Pressable
                        onPress={() => navigation.navigate('Liga')}
                        key={key}
                    >
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
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                source={{
                                    uri: item.league.logo
                                }}
                            />
                            <Text
                                style={{
                                    marginLeft: 20,
                                    fontSize: 14
                                }}
                            >
                                {item.league.name}
                            </Text>
                        </View>
                    </Pressable>
                ))
            }
        </View>
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


