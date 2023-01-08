import React from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    AsyncStorage
} from "react-native";

import styles from './styles/LoginAndRegister'

import {
    API_HOST
} from '@env'

import FingerPrintScanner from "../components/FingerPrintScanner";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            sending: false,
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

    async setUser(data) {
        const user = data.find(item => item.login === this.state.login)
        if (user && user.password === this.state.password) {
            await AsyncStorage.setItem(
                '@User',
                JSON.stringify(user)
            );
            await AsyncStorage.setItem(
                '@UserCurrent',
                JSON.stringify(user)
            );
            this.handleLoginChange('')
            this.handlePasswordChange('')
            this.props.navigation.navigate("Dashboard");
        }
    }

    async handleSubmit(event) {
        this.setState({
            sending: true
        });
        const config = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Cache-Control": "max-age=0",
                'Expires' : '0',
                'If-Modified-Since': null
            },
        }

        await fetch(`${API_HOST}/users`, config)
            .then(res => {
                this.setState({
                    sending: false
                });
                return res.json();
            })
            .then(data => {
                this.setUser(data)
            })

        event.preventDefault();
    }

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
                        onChangeText={newText => this.handleLoginChange(newText)}
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
                        onChangeText={newText => this.handlePasswordChange(newText)}
                        secureTextEntry={true}
                    />
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <Pressable
                        style={styles.button}
                        onPress={this.handleSubmit}
                        disabled={this.state.sending}
                    >
                        {this.state.sending &&
                            <ActivityIndicator></ActivityIndicator>
                        }
                        {!this.state.sending &&
                            <Text>
                                Zaloguj się
                            </Text>
                        }
                    </Pressable>
                </View>
                <FingerPrintScanner></FingerPrintScanner>
                <Text
                    style={styles.footerText}
                >
                    Nie masz konta?
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Register')}
                >
                    <Text>
                        Przejdź do rejestracji
                    </Text>
                </Pressable>
            </View>
        )
    }
}
