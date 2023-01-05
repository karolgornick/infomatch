import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, Platform, AsyncStorage} from 'react-native';
import Expo, { Constants } from 'expo';
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

    scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync();
        // console.log('Scan Result:', result)
        if (result.success === true) {
            const user = await AsyncStorage.getItem('@UserCurrent');
            await AsyncStorage.setItem(
                '@User',
                user
            );
            navigation.navigate('Dashboard')
        }
    }

    showAndroidAlert = () => {
        Alert.alert(
            'Fingerprint Scan',
            'Place your finger over the touch sensor and press scan.',
            [
                {text: 'Scan', onPress: () => {
                        this.scanFingerprint();
                    }},
                {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'}
            ]
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Text style={styles.text}>*/}
                {/*    Compatible Device? {this.state.compatible === true ? 'True' : 'False' }*/}
                {/*</Text>*/}
                {/*<Text style={styles.text}>*/}
                {/*    Fingerprings Saved? {this.state.fingerprints === true ? 'True' : 'False'}*/}
                {/*</Text>*/}
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
