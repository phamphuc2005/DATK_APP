import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Input } from 'react-native-elements';
import { getRequest, postRequest } from '../../Services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const ChangePass = ({navigation }) => {
  const [ userInfo, setUserInfo ] = useState({});
  const navigations  = useNavigation();
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [visible, setVisible] = useState(false);

  var passwordPattern = /^[a-zA-Z0-9]{6,}$/;

  const changePass = async () => {
    if (pass === '' || newPass === '' || confirmPass === '') {
      Toast.show({
        type: 'error',
        text1: 'Nhập thiếu dữ liệu !',
        text1Style:{
            fontSize: 20,
        },
        })
    } else if (!passwordPattern.test(pass) || !passwordPattern.test(newPass)) {
      Toast.show({
        type: 'error',
        text1: 'Mật khẩu cần có ít nhất 6 kí tự, không chứa kí tự đặc biệt và dấu cách !',
        text1Style:{
          fontSize: 20,
        },
      })
    } else {
      if (newPass === confirmPass) {
          const data = await postRequest('/change-password', {
              oldPassword: pass,
              newPassword: newPass
          });
          const error = await data.message;
          if (error) {
              setVisible(!visible);
              Toast.show({
              type: 'error',
              text1: error,
              text1Style:{
                  fontSize: 20,
              },
              })
          }
          else {
              setVisible(!visible);
              navigation.replace('ChangePass');
              Toast.show({
              type: 'success',
              text1: 'Thành công',
              text1Style:{
                  fontSize: 20,
              },
              })
          }
      } else {
          setVisible(!visible);
          Toast.show({
              type: 'error',
              text1: 'Mật khẩu xác nhận khác mật khẩu mới !',
              text1Style:{
                  fontSize: 18,
              },
          })
      }

    }
  }

  const toggleDialog = () => {
    if (pass === '' || newPass === '' || confirmPass === '') {
        Toast.show({
            type: 'error',
            text1: 'Nhập thiếu dữ liệu !',
            text1Style:{
              fontSize: 20,
            },
        })
    } else {
        setVisible(!visible);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Header navigation={navigation}/>
        <Text style={{fontSize:40, fontWeight: 800, marginTop: 20}}>Đổi mật khẩu</Text>
        <View style={styles.form}>
          {/* <Text style={{fontSize:30, marginBottom:20}}>Đăng nhập</Text> */}
          <Text style={styles.label}>Mật khẩu cũ:</Text>
          <Input placeholder="Mật khẩu cũ" onChangeText={(value)=>setPass(value)}/>
          <Text style={styles.label}>Mật khẩu mới:</Text>
          <Input placeholder="Mật khẩu mới" onChangeText={(value)=>setNewPass(value)}/>
          <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
          <Input placeholder="Xác nhận mật khẩu mới" onChangeText={(value)=>setConfirmPass(value)}/>

        </View>
        <Button 
            title={'Xác nhận'} 
            style={styles.btn} 
            containerStyle={{ width: '90%'}} 
            titleStyle={{fontSize: 20, padding:10}}
            onPress={()=>toggleDialog()}>
        </Button>

      </View>

        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
        >
          <Dialog.Title title="Đổi mật khẩu"/>
          <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn đổi mật khẩu không ?</Text>
          <View>
            <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>changePass()}></Button>
            <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDialog()}></Button>
          </View>
        </Dialog>
      <Footer navigation={navigation} page={'ChangePass'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // paddingTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  form: {
    width:'100%',
    // alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 30
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 10
  },
});

export default ChangePass;
