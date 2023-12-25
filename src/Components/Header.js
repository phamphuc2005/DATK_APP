// Header.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRequest } from '../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ navigation }) => {
  const handleGoToHome = () => {
    navigation.navigate('Menu');
  };

  const [ userInfo, setUserInfo ] = useState({});
  const navigations  = useNavigation();
  // const deviceID =  AsyncStorage.getItem('deviceID');
  useEffect(() => {
      GetUserInfo();
    }, [navigations]);
  
    const GetUserInfo = async () => {
      const data = await getRequest('/user');
      setUserInfo(await data);
      // localStorage.setItem('username', await data.username);
      await AsyncStorage.setItem('name',  data.name);
      await AsyncStorage.setItem('email',  data.email);
      await AsyncStorage.setItem('phone',  data.phone);
      await AsyncStorage.setItem('user_id',  data._id);
    }

  return (
    <View style={styles.footer}>
        <TouchableOpacity style={styles.headerItem} onPress={() => handleGoToHome()}>
            <Feather name="menu" size={22} color="#fff" />
            <Text style={styles.headerText}></Text>
        </TouchableOpacity>
        <Text style={{fontSize:26, fontWeight: 900, color:'#fff', marginTop:30}}>FIRE ALARM SYSTEM</Text>
        <TouchableOpacity style={styles.headerItem} onPress={() => navigation.navigate('Notice')}>
            <AntDesign name="bells" size={22} color="#fff" />
            <Text style={styles.headerText}></Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 20,
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    height: 85,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%',
    paddingLeft:20,
    paddingRight: 20
  },
  headerItem: {
    alignItems: 'center',
    marginTop: 50
  },
  headerText: {
    color: '#fff',
  },
});

export default Header;
