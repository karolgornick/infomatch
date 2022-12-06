import React from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";

export class LeagueTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(login) {
        this.setState({login});
    }

    handlePasswordChange(password) {
        this.setState({password});
    }

    handleSubmit(event) {
        alert(`Login: ${this.state.login}, hasło: ${this.state.password}`);
        event.preventDefault();
    }

    render() {

        const styles = {
            container: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
            },
            label: {
                width: 50,
                textAlign: "right",
                paddingRight: 10,
            },
            input: {
                flexGrow: 1,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "grey",
                paddingHorizontal: 10,
                paddingVertical: 5,
            },
            buttonContainer: {
                marginTop: 0,
                display: "flex",
                justifyContent: "center"
            },
            button: {
                marginTop: 20,
                backgroundColor: "grey",
                paddingHorizontal: 10,
                paddingVertical: 10,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            },
            footerText: {
                marginTop: 20,
                textAlign: "center",
            }
        }

        return (
            <View
                style={{
                    padding: 20,
                    backgroundColor: '#fff',
                    marginTop: 20,
                }}
            >
                <Text>Liga</Text>
            </View>
        )
    }
}
