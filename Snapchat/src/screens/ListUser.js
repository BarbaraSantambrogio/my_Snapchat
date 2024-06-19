import { ImageBackground, Text, Button, Item, StatusBar, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, ImageBackgroundBase} from "react-native";
import React,  { useEffect, useState } from "react";
import { CurrentRenderContext } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';



export default function ListUser({ navigation, route }) {

    const { imageFile } = route.params;
    const [ users , setUsers] = useState([]); 
    const { userInfo } = route.params;
     console.log(imageFile);
     console.log('vaffa', userInfo.data.token);
    
    useEffect(() =>{
        fetch("https://snapchat.epidoc.eu/user", {
           method: 'GET',
           headers: {
           Accept: 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcmJhcmEtcm9zYS5zYW50YW1icm9naW9AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjcyMn0.PM-B30KTS920UK-mZfJX3car8yqwFTTrFyvAppz9WY0',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.data.token}` 
           }
    }).then((response) => response.json())
    .then((data)=> {
      setUsers(data.data)
     
    })
    }, []);

    const renderItem = ({item}) => {
      return (
      <TouchableOpacity onPress={()=>handlePress(item._id)}><Text style={styles.text}>{item.username}</Text>
      </TouchableOpacity>
      )
    }

    const handlePress = async (userToSendTo) => {
      if (imageFile) {
          try {
            const imageFormat = imageFile.toLowerCase().endsWith('.png') ? 'png' : imageFile.toLowerCase().endsWith('.jpeg') ? 'jpeg' : 'jpg';
            console.log('formato', imageFormat)
              const manipulatedImage = await ImageManipulator.manipulateAsync(
                  imageFile,
                  [{ resize: { width: 360, height: 640 } }],
                  { compress: 0.7, format: imageFormat === 'png' ? ImageManipulator.SaveFormat.PNG : ImageManipulator.SaveFormat.JPEG }
              );
              
              
              const base64 = await FileSystem.readAsStringAsync(manipulatedImage.uri, { encoding: 'base64' });
              const base64WithPrefix = `data:image/${imageFormat};base64,${base64}`;
              const requestBody = {
                  to: userToSendTo,
                  image: base64WithPrefix,
                  duration: 5
              };

              console.log('img', base64WithPrefix);
              fetch("https://snapchat.epidoc.eu/snap", {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcmJhcmEtcm9zYS5zYW50YW1icm9naW9AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjcyMn0.PM-B30KTS920UK-mZfJX3car8yqwFTTrFyvAppz9WY0',
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userInfo.data.token}`
                  },
                  body: JSON.stringify(requestBody)
              })
              .then((response) => response.json())
              .then((data) => {
                  console.log('Image sent successfully', data);
                  navigation.navigate('ConfirmMessage', {
                      userToSendTo
                  });
              })
              .catch((error) => {
                  console.error('Error sending image', error);
              });
          } catch (error) {
              console.error('Error processing', error); 
          }
      } else {
          console.error('No image found');
      }
  };
  
    return (
      <View style={styles.container}>
      <FlatList
        data={users}
        renderItem = {renderItem}
        keyExtractor={(item) => item._id}
      />

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  text: {
    backgroundColor: 'pink',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});