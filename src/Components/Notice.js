import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';

// const Stack = createStackNavigator();

const Notice = ({navigation}) => {
  const navigations = useNavigation();
  const [ name, setName ] = useState('');

  useEffect(() => {
    const checkAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const name = await  AsyncStorage.getItem('name');
        setName(name)
        if (!accessToken) {
            navigation.navigate('Login');
        } else {
            // GetAllSystems();
        }
    };
    checkAccessToken();
  }, [navigations]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="user-circle" size={24} color="black" />
        <Text style={{fontSize: 24, fontWeight: 700}}>{name} !</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  header: {
    backgroundColor:'#eee',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10
  },

});

export default Notice;
