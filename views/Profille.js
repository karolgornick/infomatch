import React, {useEffect, useState} from "react";
import {
    View, Text, Pressable, ActivityIndicator, TextInput, AsyncStorage, Image, ScrollView
} from "react-native";
import styles from './styles/LoginAndRegister'
import {useIsFocused} from "@react-navigation/native";

const Profile = () => {
    const isFocused = useIsFocused();
    const [passwordError, setPasswordError] = useState('')
    const [passwordChange, setPasswordChange] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState(null);
    const [languageVariables, setLanguageVariables] = useState({
        password: '',
        newPassword: '',
        changePassword: '',
        sendPassword: '',
        repeatPassword: '',
        creationDate: '',
        cancel: ''
    });

    useEffect(() => {
        getLanguageFromState()
        getData()
    }, [isFocused])

    async function getLanguageFromState() {
        const lang = await AsyncStorage.getItem('@Language')
        console.log(lang)
        setLanguage(lang)
        setLanguageVariables({
            password: (language === 'pl') ? 'Hasło' : 'Password',
            newPassword: (language === 'pl') ? 'Nowe hasło' : 'New password',
            changePassword: (language === 'pl') ? 'Zmień hasło' : 'Change password',
            sendPassword: (language === 'pl') ? 'Wyślij' : 'Send',
            repeatPassword: (language === 'pl') ? 'Powtórz hasło' : 'Repeat password',
            creationDate: (language === 'pl') ? 'Data utworzenia' : 'Creation date',
            cancel: (language === 'pl') ? 'Anuluj' : 'Cancel',
            errors: {
                wrong: (language === 'pl') ? 'Hasło się nie zgadza' : 'Password is wrong',
                notSame: (language === 'pl') ? 'Hała nie są takie same' : 'Passwords are not same',
            }
        })
    }

    // useEffect(() => {
    //     setLanguageVariables({
    //         changePassword: (language === 'pl') ? 'Zmień hasło' : 'Change password',
    //         sendPassword: (language === 'pl') ? 'Wyślij' : 'Send',
    //         repeatPassword: (language === 'pl') ? 'Powtórz hasło' : 'Repeat password',
    //         creationDate: (language === 'pl') ? 'Data utworzenia' : 'Creation date'
    //     })
    // }, language)

    function passwordChangeState() {
        setPasswordChange(!passwordChange)
        setCurrentPassword('')
        setNewPassword('')
        setNewPasswordRepeat('')
        setPasswordError('')
    }

    function handleCurrentPassword(value) {
        setCurrentPassword(value)
    }

    function handleNewPassword(value) {
        setNewPassword(value)
    }

    function handleNewPasswordRepeat(value) {
        setNewPasswordRepeat(value)
    }

    async function saveNewPassword() {
        let users = JSON.parse(await AsyncStorage.getItem('@Users')),
            index = users.findIndex(item => item.email === user.email)

        if (users[index].password === currentPassword && newPassword === newPasswordRepeat) {
            users[index].password = newPassword
            await AsyncStorage.setItem('@Users', JSON.stringify(users))
            passwordChangeState()
        } else if (users[index].password !== currentPassword) {
            setPasswordError(languageVariables.errors.wrong)
        } else if (newPassword !== newPasswordRepeat) {
            setPasswordError(languageVariables.errors.notSame)
        }
    }

    async function getData() {
        const user = await AsyncStorage.getItem('@User');
        setUser(JSON.parse(user))
    }

    useEffect(() => {
        getLanguageFromState()
        getData()
    }, [])



    return(
        <ScrollView>
            <View
                style={{
                    padding: 20,
                    backgroundColor: '#fff',
                    marginTop: 20,
                }}
            >
                { user &&
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Image
                            source = {{
                                uri: (user.avatar) ? user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                            }}
                            style = {{
                                width: 120,
                                height: 120,
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 20,
                                fontWeight: "500"
                            }}
                        >
                            {user.login}
                        </Text>
                        <Text>
                            {languageVariables.creationDate}: {user.creationDate}
                        </Text>
                    </View>
                }
                { passwordChange &&
                    <View>
                        <View
                            style={styles.container}
                        >
                            <Text
                                style={styles.label}
                            >
                                {languageVariables.password}
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={newText => handleCurrentPassword(newText)}
                            />
                        </View>
                        <View
                            style={styles.container}
                        >
                            <Text
                                style={styles.label}
                            >
                                {languageVariables.newPassword}
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={newText => handleNewPassword(newText)}
                            />
                        </View>
                        <View
                            style={styles.container}
                        >
                            <Text
                                style={styles.label}
                            >
                                {languageVariables.repeatPassword}
                            </Text>
                            <TextInput
                                style={styles.input}
                                value={newPasswordRepeat}
                                onChangeText={newText => handleNewPasswordRepeat(newText)}
                            />
                        </View>
                        { passwordError &&
                            <Text
                                style={styles.error}
                            >
                                {passwordError}
                            </Text>

                        }
                        <Pressable
                            style={styles.button}
                            onPress={() => saveNewPassword()}
                        >
                            <Text>
                                {languageVariables.sendPassword}
                            </Text>
                        </Pressable>
                    </View>
                }
                <Pressable
                    style={styles.button}
                    onPress={() => passwordChangeState()}
                >
                    { passwordChange &&
                        <Text>
                            {languageVariables.cancel}
                        </Text>
                    }
                    { !passwordChange &&
                        <Text>
                            {languageVariables.changePassword}
                        </Text>
                    }
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default Profile;
