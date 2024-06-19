import React from "react";
import {Text, View} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ConnexionScreen from "../screens/ConnexionScreen";
import ImagePreview from "../screens/ImagePreview";
import ListUser from "../screens/ListUser";
import ConfirmMessage from "../screens/ConfirmMessage"


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
      <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="ConnexionScreen" component={ConnexionScreen} options={{headerShown:false}} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} /> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />  
        <Stack.Screen name="ImagePreview" component={ImagePreview} options={{headerShown:false}} /> 
        <Stack.Screen name="ListUser" component={ListUser} options={{headerShown:false}} />
        <Stack.Screen name="ConfirmMessage" component={ConfirmMessage} options={{headerShown:false}} />  
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation;