import { Camera, CameraType } from 'expo-camera';
import {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, ScrollView} from 'react-native';
import {useIsFocused} from "@react-navigation/native";

export default function App(props) {
    const isFocused = useIsFocused();
    const [enabled, setEnabled] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [lang, setLang] = useState({
        avatar: "",
        flip: "",
        take: ""
    });
    const styles = {
        camera: {
            height: 380,
            width: 300,
            marginLeft: "auto",
            marginRight: "auto"
        },
        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
        },
        button: {
            width: "49%",
            backgroundColor: "grey",
            paddingVertical: 20
        },
        text: {
            textAlign: "center"
        }
    }

    useEffect(() => {
        setEnabled(false)
    }, [isFocused])

    useEffect(() => {
        setLang ({
            avatar: (props.lang === 'pl') ? 'Dodaj avatar' : 'Add avatar',
            flip: (props.lang === 'pl') ? 'Zmień kamerę' : 'Flip camera',
            take: (props.lang === 'pl') ? 'Zrób zdjęcie' : 'Take picture',
        })
    }, [props])


    async function takePicture () {
        console.log('xaxa')
        if (camera) {
            console.log('xaxa2')
            let photoData = await camera.takePictureAsync({
                base64: true,
            });
            setPhoto(photoData.uri)
        }
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    useEffect(() => {
        if (photo && photo.length > 100) {
            addPhotoToUser(photo)
        }
    }, [photo])

    async function addPhotoToUser(photo) {
        let user = await AsyncStorage.getItem('@User')
        let users = await AsyncStorage.getItem('@Users')
        user = JSON.parse(user)
        users = JSON.parse(users)
        const index = users.findIndex(item => item.id === user.id)
        users[index].avatar = photo
        setPhoto(null)
        setEnabled(false)
        await AsyncStorage.setItem(
            '@User',
            JSON.stringify(users[index])
        )
        await AsyncStorage.setItem(
            '@Users',
                JSON.stringify(users)
            )

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                { !enabled &&
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <TouchableOpacity style={styles.button} onPress={() => setEnabled(true)}>
                            <Text style={styles.text}>
                                {lang.avatar}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                { enabled &&
                    <View>
                        <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                        </Camera>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                <Text style={styles.text}>
                                    {lang.flip}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <Text style={styles.text}>
                                    {lang.take}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    );
}
