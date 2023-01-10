import React from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator, AsyncStorage
} from "react-native";
import {
    API_HOST
} from '@env'
import { useNavigation } from '@react-navigation/native';
import styles from './styles/LoginAndRegister'



export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            password: '',
            repeatPassword: '',
            sending: '',
            errorEmail: '',
            errorLogin: '',
            errorPasswords: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRepeatPasswordChange(repeatPassword) {
        this.setState({repeatPassword})
    }

    handleEmailChange(email) {
        this.setState({email});
    }

    handleLoginChange(login) {
        this.setState({login});
    }

    handlePasswordChange(password) {
        this.setState({password});
    }

    emailValidation (mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    }

    passwordValidation (password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*/()_={}\[\]\\|;:+"'<,>.?-])[A-Za-z\d~`!@#$%^&*/()_={}\[\]\\|;:+"'<,>.?-]{8,}$/.test(password)
    }

    async userExists (email) {
        let users = await AsyncStorage.getItem('@Users')
        if (!users) {
            users = []
        } else {
            users = JSON.parse(users)
        }

        const sameEmailUser = users.findIndex(item => item.email === email)
        return (sameEmailUser >= 0) ? "Uzytkownik z tym emailem istnieje" : ""
    }

    async handleSubmit(event) {
        let errorPasswords = (this.state.password === this.state.repeatPassword) ? '' : 'Hasła nie są takie same'
        errorPasswords = (this.passwordValidation(this.state.password)) ? errorPasswords : 'Hasło powinno mieć co najmniej 8 znaków, jedną dużą literę i jeden znak specjalny'
        this.setState({
            errorEmail: (this.emailValidation(this.state.email)) ? '' : 'Nieprawidłowy format adresu email',
            errorLogin: (this.state.login.length >= 5) ? '' : 'Login powinien mieć co najmniej pięć znaków',
            errorPasswords
        })

        if (this.state.errorEmail.length === 0) {
            const userExist = await this.userExists(this.state.email)
            if (userExist) {
                this.setState({
                    errorEmail: userExist
                })
            }
        }

        if (this.state.errorEmail.length > 0 || this.state.errorLogin.length > 0 || this.state.errorPasswords.length > 0) {
            return
        }

        this.setState({
            sending: true
        });

        const user = {
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            avatar: null
        }
        let users = await AsyncStorage.getItem('@Users')
        if (!users) {
            users = []
        } else {
            users = JSON.parse(users)
        }
        users.push(user)
        await AsyncStorage.setItem('@Users', JSON.stringify(users))

        this.setState({
            email: '',
            login: '',
            password: '',
        });

        this.setState({
            sending: false
        });
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
                        value={this.state.email}
                        onChangeText={newText => this.handleEmailChange(newText)}
                    />
                </View>
                {this.state.errorEmail &&
                    <Text
                        style={styles.error}
                    >
                        {this.state.errorEmail}
                    </Text>
                }


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
                {this.state.errorLogin &&
                    <Text
                        style={styles.error}
                    >
                        {this.state.errorLogin}
                    </Text>
                }

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
                        value={this.state.repeatPassword}
                        onChangeText={newText => this.handleRepeatPasswordChange(newText)}
                        secureTextEntry={true}
                    />
                </View>
                {this.state.errorPasswords &&
                    <Text
                        style={styles.error}
                    >
                        {this.state.errorPasswords}
                    </Text>
                }

                <View
                    style={styles.buttonContainer}
                >
                    <Pressable
                        style={styles.button}
                        onPress={this.handleSubmit}
                    >
                        {this.state.sending &&
                            <ActivityIndicator></ActivityIndicator>
                        }
                        {!this.state.sending &&
                            <Text>
                                Zarejestruj się
                            </Text>
                        }
                    </Pressable>
                </View>
                <Text
                    style={styles.footerText}
                >
                    Masz konto?
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    <Text>
                        Przejdź do logowania
                    </Text>
                </Pressable>
            </View>
        )
    }
}
