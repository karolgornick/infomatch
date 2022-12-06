import React from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export class Register extends React.Component {
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
                width: 70,
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
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "500",
                    }}
                >
                    Rejestracja
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
                        Login
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
                    style={styles.container}
                >
                    <Text
                        style={styles.label}
                    >
                        Powtórz hasło
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
                    >
                        <Text>
                            Zarejestruj się
                        </Text>
                    </Pressable>
                </View>
                <Text
                    style={styles.footerText}
                >
                    Masz konto?
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text>
                        Przejdź do logowania
                    </Text>
                </Pressable>
            </View>
        )
    }
}
