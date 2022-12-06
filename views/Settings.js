import React from "react";
import {
    View,
    Text
} from "react-native";

export class Settings extends React.Component {
    render() {
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
                    Ustawienia
                </Text>
            </View>
        )
    }
}
