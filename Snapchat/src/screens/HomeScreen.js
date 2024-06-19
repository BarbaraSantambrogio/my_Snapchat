import React from "react";
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faCheck, faDoorOpen, faRotate, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { CameraView, useCameraPermissions } from 'expo-camera';
 
export default function HomeScreen({ route }) {
 
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [image, setImage] = useState(null);
  const { userInfo } = route.params;
  const [camera, setCamera] = useState();


  useEffect(() => {
 
    (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === 'granted');
    })();

}, []);

 
  //pour la gallerie des photos
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
 
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const imageUri = result.assets[0];
      result.assets && navigation.navigate('ImagePreview',{
        imageFile: imageUri,
        userInfo
      } )
    }
  }
  
 

  //pour recuperer photo from appareil photo
  function prova(imageUri){
    console.log("IMAGE =>", imageUri)
    navigation.navigate('ImagePreview',{
      imageFile: imageUri,
      userInfo
    })
  }

 
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
 
  const takePicture = async () => {
    if (camera){
       const image = await camera.takePictureAsync()
       setImage(image.uri);
       console.log(image);
    }
  }


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.navigate('ConnexionScreen');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  if (hasCameraPermission) {
    if (image) {
        return (
            <View style={{ flex: 1 }}>
                <Image source={{ uri:image }}
                    style={{
                        flex: 1,
                        resizeMode: 'cover'
                    }}
                />
            <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faRightFromBracket} size={40} style={{position: 'fixed', bottom: 100, left: 100}}/>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => prova(image)}>
            <FontAwesomeIcon icon={faCheck} size={40} style={{position: 'absolute', bottom: 100, left: 280}} />
            </TouchableOpacity>
            </View>
        )
    }

   return (

  <View style={styles.buttonContainer}>

     <CameraView style={styles.container} ref={ref => setCamera(ref)} facing={facing}>

         <View style={styles.iconcontainer}> 

                <TouchableOpacity
                onPress={toggleCameraFacing}>
                <FontAwesomeIcon icon={faRotate} size={40}/> 
                </TouchableOpacity>

                <TouchableOpacity
                onPress={takePicture}>
                <FontAwesomeIcon icon={faCamera} size={40}/> 
                </TouchableOpacity>

                <TouchableOpacity
                onPress={pickImage}>
                <FontAwesomeIcon icon={faFolder} size={40}/> 
                </TouchableOpacity>        
                </View>  

                <TouchableOpacity
                onPress={logout}
                style={{
                bottom: 350, 
                left: 330, }}>
                <FontAwesomeIcon icon={faDoorOpen} size={40}/> 
                </TouchableOpacity>

                {image && <Image source={{ uri: image }} style={styles.image} />}

                </CameraView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    iconcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 350,
    },

  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {

      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',

  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
