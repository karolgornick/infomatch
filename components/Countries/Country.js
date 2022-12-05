import React from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import {
    getCountryLeague
} from "../../api/FootballAPI";

export class Country extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leagues: null
        };
    }

    async componentDidMount() {
        const fetchLeagues = async () => {
            return await getCountryLeague(this.props.code)
        }
        const response = await fetchLeagues()
        this.setState(() => {
            return {
                leagues: response.response
            }
        })
        console.log(this.state.leagues)
    }

    render() {
        return(
            <View key="Ligawloska">
                {/*{this.state.leagues &&*/}
                {/*    this.state.leagues.map((country, i) => {*/}
                {/*        return (*/}
                {/*            <View*/}
                {/*                key={country.league.name}*/}
                {/*                style={{*/}
                {/*                    display: "flex",*/}
                {/*                    flexDirection: "row",*/}
                {/*                    paddingHorizontal: 30,*/}
                {/*                    width: "100%",*/}
                {/*                    alignItems: "center",*/}
                {/*                    paddingTop: (i === 0) ? 10 : 0,*/}
                {/*                    paddingBottom: 10,*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <Image*/}
                {/*                    style={{*/}
                {/*                        width: 40,*/}
                {/*                        height: 40,*/}
                {/*                    }}*/}
                {/*                    source={{*/}
                {/*                        uri: country.league.logo*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*                <Text*/}
                {/*                    style={{*/}
                {/*                        marginLeft: 20,*/}
                {/*                        fontSize: 14*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    {country.league.name}*/}
                {/*                </Text>*/}
                {/*            </View>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </View>
        )
    }
}


