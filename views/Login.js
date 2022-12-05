import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
} from "react-native";

export class Login extends React.Component {
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

    handleLoginChange(event) {
        this.setState({login: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
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
            button: {
                marginTop: 10,
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
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "500",
                    }}
                >
                    Logowanie
                </Text>

                <View
                    style={styles.container}
                >
                    <Text
                        style={styles.label}
                    >
                        E-mail
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.login}
                        onChange={this.handleLoginChange}
                    />
                </View>

                <View
                    style={styles.container}
                >
                    <Text
                        style={styles.label}
                    >
                        Hasło
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        secureTextEntry={true}
                    />
                </View>

                <Button
                    style={styles.button}
                    onPress={this.handleSubmit}
                    title="Zaloguj się"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}
