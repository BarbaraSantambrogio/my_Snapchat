import React, {useContext, useState} from "react";
import {Text, 
        View,
        Button,
        TextInput,
        TouchableOpacity,
        StyleSheet} from "react-native";  
        
import AsyncStorage from "@react-native-async-storage/async-storage";        

const RegisterScreen = ({navigation}) => {

    const [username, setUserame] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const register = async (username,email, password) => {
        try {
          const response = await fetch('https://snapchat.epidoc.eu/user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGVuYS5tb3VnYW1tYWRhbHlAZXBpdGVjaC5ldSIsImlhdCI6MTcxODAwNjcxNH0.9BgVBsGx7eiQwmFJl4MNYDncdSD7CBey_YrdqVRm4QE',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
          });
     
          if (!response.ok) {
            throw new Error('Erreur inscription');
          }
     
          const userInfo = await response.json();
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          console.log(userInfo);
          navigation.navigate('ConnexionScreen');
        } catch (e) {
          console.log(`erreur ${e}`);
        }
      };

    return (

          <View style={styles.container}>
            <View style={styles.wrapper}>

            <TextInput
            style={styles.input}
            value={username}
            placeholder="Inserer votre username"
            onChangeText={text => setUserame(text)}
            />

            <TextInput
            style={styles.input}
            value={email}
            placeholder="Inserer votre mail"
            onChangeText={text => setEmail(text)}
            />


            <TextInput
            style={styles.input}
            value={password}
            placeholder="Mot de passe"
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />

            <Button title="Register" onPress={() => {
             register(username, email, password)
                } }/>

            <View style={{ flexDirection: 'row', marginTop : 20 }}>
                <Text>Déjà inscrit ? </Text>
               <TouchableOpacity onPress={() => navigation.navigate('ConnexionScreen')}>
                <Text style={styles.link}>Vous connecter</Text>
               </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'pink',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
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
    }
})

export default RegisterScreen;