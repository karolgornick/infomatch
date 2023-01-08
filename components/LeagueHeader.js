import {Image, Text, View} from "react-native";
import React from "react";

function LeagueHeader (props) {
    console.log(props.data)
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Image
                source={{
                    uri: props.data.logo
                }}
                style={{
                    width: 70,
                    height: 70
                }}
            ></Image>
            <Text
                style={{
                    marginVertical: 10,
                    fontSize: 20,
                    fontWeight: "500",
                }}
            >
                { props.data.name }
            </Text>
        </View>
    )
}

export {
    LeagueHeader
}
