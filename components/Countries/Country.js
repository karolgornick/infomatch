import React from "react";
import {View,Text} from "react-native";

export class Country extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: null
        };
    }

    async componentDidMount() {
        console.log(this.props.data)
    }

    render() {
        return(
            <View>
                <Text>{this.props.data}</Text>
            </View>
        )
    }
}


