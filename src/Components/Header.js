// Header.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRequest } from '../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge, Header as Head } from 'react-native-elements';

const Header = ({ navigation }) => {
  const handleGoToHome = () => {
    navigation.navigate('Menu');
  };

  const [ userInfo, setUserInfo ] = useState({});
  const navigations  = useNavigation();
  const [ counts, setCount ] = useState(0);
  // const deviceID =  AsyncStorage.getItem('deviceID');

  useEffect((navigation) => {
      GetUserInfo();
      allNotice();
    }, [navigations, navigation]);
  
    const GetUserInfo = async () => {
      const data = await getRequest('/user');
      setUserInfo(await data);
      // localStorage.setItem('username', await data.username);
      await AsyncStorage.setItem('name',  data.name);
      await AsyncStorage.setItem('email',  data.email);
      await AsyncStorage.setItem('phone',  data.phone);
      await AsyncStorage.setItem('user_id',  data._id);
    }

    const allNotice = async () => {
      const data = await getRequest('/list-notice');
      if (data.error) {
        Toast.show({
          type: 'error',
          text1: data.error,
          text1Style:{
            fontSize: 20,
          },
      })
      } else {
        let i = 0;
        data.length > 0 && data.forEach(data => {
          if (data.state === 0) {
            i++;
          }
        });
        setCount(i);
      }
    }

  return (
    <View style={{width: '100%'}}>
        {/* <TouchableOpacity style={styles.headerItem} onPress={() => handleGoToHome()}>
            <Feather name="menu" size={22} color="#fff" />
            <Text style={styles.headerText}></Text>
        </TouchableOpacity>
        <Text style={{fontSize:26, fontWeight: 900, color:'#fff', marginTop:30}}>FIRE ALARM SYSTEM</Text>
        <TouchableOpacity style={styles.headerItem} onPress={() => navigation.navigate('Notice')}>
          <AntDesign name="bells" size={22} color="#fff" />
          <Badge
            status="error"
            value={counts}
            containerStyle={{ position: 'absolute', top: -7.5, left: 10 }}
          />
          <Text style={styles.headerText}></Text>
        </TouchableOpacity> */}
        <Head
          backgroundColor='dodgerblue'
          barStyle='default'
          leftComponent={
            <TouchableOpacity style={{paddingLeft:15, paddingTop: 5}} onPress={() => handleGoToHome()}>
              <Feather name="menu" size={22} color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={{fontSize:26, fontWeight: 700, color:'#fff'}}>FIRE ALARM SYSTEM</Text>
          }
          rightComponent={
            <TouchableOpacity style={{paddingRight:15, paddingTop: 5}} onPress={() => navigation.navigate('Notice')}>
              <AntDesign name="bells" size={22} color="#fff" />
              <Badge
                status="error"
                value={counts}
                containerStyle={{ position: 'absolute', top: -5, left: 10 }}
              />
            </TouchableOpacity>
          }
        >
        </Head>
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
    paddingLeft: 10
    // alignItems: 'center',
    // marginTop: 50
  },
  headerText: {
    color: '#fff',
  },
});

export default Header;
