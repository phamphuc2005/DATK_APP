import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input } from 'react-native-elements';
import { postRequest } from '../../Services/api';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function Login({navigation}) {
  const navigations  = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect( () => {
      const checkAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          navigation.navigate('Home');
        }
      };
      checkAccessToken();
    }, [navigation, navigations]);

    const handleLogin = async () => {
        const data = await postRequest('/login', {
          email,
          password: pass
        });
        // console.log(email, pass);
        const error = await data.message;
        if (error) {
          // setErrorMesssage(error);
          console.log(error);
          Toast.show({
            type: 'error',
            text1: error,
            text1Style:{
              fontSize: 20,
            },
          })
        }
        else {
          await AsyncStorage.setItem('accessToken', data.accessToken);
          navigation.navigate('Home');
        }
      };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, marginBottom: 50, fontWeight: 800}}>FIRE ALARM SYSTEM</Text>
      {/* <View style={styles.form}> */}
        {/* <Text style={{fontSize:30, marginBottom:20}}>Đăng nhập</Text> */}
        <Input placeholder="Email" keyboardType='email-address' inputMode='email'  onChangeText={(value)=>setEmail(value)}/>
        <Input placeholder="Mật khẩu" secureTextEntry={true}  onChangeText={(value)=>setPass(value)}/>
        <Button 
            title={'Đăng nhập'} 
            style={styles.btn} 
            containerStyle={{marginTop:20, width: 350}} 
            titleStyle={{fontSize: 20, padding:10}}
            onPress={handleLogin}
        >
        </Button>
        <View style={{flexDirection: 'row', marginTop: 40, gap: 10}}>
          <Text style={{fontSize:20}}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 20 }}>Đăng ký ngay</Text></TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10, gap: 10}}>
          <Text style={{fontSize:20}}>Bạn quên mật khẩu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}><Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 20 }}>Lấy lại mật khẩu</Text></TouchableOpacity>
        </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 150,
    paddingLeft: 10,
    paddingRight: 10,
  },
  form: {
    // border: '1px solid black',
    height:'50%',
    width:'80%',
    backgroundColor:'#eee',
    alignItems: 'center',
    marginTop: 40,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
});
