import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const ConnexionScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://snapchat.epidoc.eu/user', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcmJhcmEtcm9zYS5zYW50YW1icm9naW9AZXBpdGVjaC5ldSIsImlhdCI6MTcxNzc2MjcyMn0.PM-B30KTS920UK-mZfJX3car8yqwFTTrFyvAppz9WY0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
 
      if (!response.ok) {
        throw new Error('Login failed');
      }
 
      const userInfo = await response.json();
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false);
      console.log(userInfo);
      navigation.navigate('Home', {
        userInfo
      });
    } catch (e) {
      console.log(`erreur conneeeee ${e}`);
      setIsLoading(false);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder='Votre Email'
          onChangeText={(text) => setEmail(text)}
        />
 
        <TextInput
          style={styles.input}
          value={password}
          placeholder='Votre Password'
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title='Connexion' onPress={() => login(email, password)} />
 
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Vous n'avez pas un Account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "purple",
    fontSize: 18,
  },
  link: {
    color: 'purple',
  },
});
 
export default ConnexionScreen;