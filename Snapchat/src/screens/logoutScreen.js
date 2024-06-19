import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';

const logoutScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
        try{
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        console.log(storedUserInfo);
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
        console.log('Error for user info: fetch', error);
      }
    };
    fetchUserInfo();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      navigation.navigate('ConnexionScreen');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };



  if (!userInfo) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {userInfo.email}!</Text>
      <Button title="Logout" onPress={logout} />
      <Text> Envoye une photo a qui tu veux!</Text>
      {/*<TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}></TouchableOpacity>*/}

    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 18,
      marginBottom: 20,
    },
  });
  


export default HomeScreen;