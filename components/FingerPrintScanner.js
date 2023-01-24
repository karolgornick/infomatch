import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Alert, Platform, AsyncStorage} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import styles from '../views/styles/LoginAndRegister'
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();


export default class FingerPrintScanner extends Component {

    state = {
        compatible: false,
        fingerprints: false,
        result: ''
    }

    // sprawdzanie czy urzadzenie obsluguje odczyt odcisku palca
    componentDidMount() {
        this.checkDeviceForHardware();
        this.checkForFingerprints();
    }

    checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        console.log(compatible);
        this.setState({compatible})
    }

    checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        console.log(fingerprints);
        this.setState({fingerprints})
    }

    // pobieranie palucha, jesli pobrano loguje na ostatnio zalogowanego usera
    scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync();
        if (result.success === true) {
            const user = await AsyncStorage.getItem('@UserCurrent');
            await AsyncStorage.setItem(
                '@User',
                user
            );
            navigation.navigate('Dashboard')
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={Platform.OS === 'android' ? this.scanFingerprint : this.scanFingerprint}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Zaloguj odciskiem palca
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
