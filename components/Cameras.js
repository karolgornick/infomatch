import { Camera, CameraType } from 'expo-camera';
import {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';

export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const styles = {
        camera: {
            height: 500
        }
    }

    async function takePicture () {
        if (camera) {
            let photoData = await camera.takePictureAsync({
                base64: true,
            });
            setPhoto(photoData.base64)
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
        console.log(photo)
        users[index].avatar = null
        setPhoto(null)
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
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
            </Camera>
            <View style={styles.buttonContainer}>
                {/*<TouchableOpacity style={styles.button} onPress={toggleCameraType}>*/}
                {/*    <Text style={styles.text}>Flip Camera</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
            </View>
            { photo &&
                <Image
                    source={{
                        uri: `data:image/jpeg;base64,${photo}`
                    }}
                    style={{
                        width: 100,
                        height: 100,
                    }}
                />
            }
        </View>
    );
}
