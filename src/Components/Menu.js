import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import { getRequest } from '../Services/api';

// const Stack = createStackNavigator();

const Menu = ({navigation}) => {
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

      const handleLogout = async () => {
        await AsyncStorage.removeItem("accessToken");
        navigation.navigate('Login');
      };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <FontAwesome5 name="user-circle" size={24} color="black" />
            <Text style={{fontSize: 24, fontWeight: 700}}>{name} !</Text>
        </View>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Home')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="home" size={20} color="black" />
                <Text style={{fontSize: 20}}>Trang chủ</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Notice')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="bells" size={20} color="black" />
                <Text style={{fontSize: 20}}>Thông báo</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('UserInfo')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="user" size={20} color="black" />
                <Text style={{fontSize: 20}}>Thông tin tài khoản</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ChangePass')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="sync" size={20} color="black" />
                <Text style={{fontSize: 20}}>Đổi mật khẩu</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ListLocation')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="enviromento" size={20} color="black" />
                <Text style={{fontSize: 20}}>Quản lý khu vực</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ListDevice')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="linechart" size={20} color="black" />
                <Text style={{fontSize: 20}}>Thông số thiết bị</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ListStatistic')}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="barschart" size={20} color="black" />
                <Text style={{fontSize: 20}}>Thống kê số liệu</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={()=>handleLogout()}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <AntDesign name="logout" size={20} color="black" />
                <Text style={{fontSize: 20}}>Đăng xuất</Text>
            </View>
            <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
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
  item: {
    borderColor: '#eee',
    borderWidth: 2,
    width: '95%',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'

  }
});

export default Menu;
