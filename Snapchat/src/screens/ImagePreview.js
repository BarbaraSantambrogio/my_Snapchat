import { ImageBackground, Text, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { CurrentRenderContext } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


export default function ImagePreview({ route, navigation }) {

    let { imageFile } = route.params;
    const { userInfo } = route.params;
    const closePreview = () => {
        navigation.navigate('Home');
    }

    const sendFunc = async () => {
        navigation.navigate('ListUser', {
            imageFile,
            userInfo
        })
    }

    if (imageFile?.uri != undefined) {
        imageFile = imageFile.uri
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home', {userInfo})}>
               <FontAwesomeIcon icon={faHome} size={40} />
            </TouchableOpacity>

            <View style={styles.Imagewrapper}>
                <ImageBackground
                    source={{ uri: imageFile }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }} />
            </View>
            <TouchableOpacity
                onPress={sendFunc}
                style={styles.sendBtn}
                activeOpacity={0.7}>
                <Text style={styles.sendText}>Choisir un destinataire</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Imagewrapper: {
        width: 400,
        height: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,

    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    sendBtn: {
        width: 200,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        marginTop: 20,
    },
    sendText: {
        fontSize: 18,
        color: '#fff',
        padding: 10,
    }
})