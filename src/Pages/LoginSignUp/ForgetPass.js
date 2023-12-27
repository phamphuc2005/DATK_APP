import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Input } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { postRequest } from '../../Services/api';

export default function ForgetPass({navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [ data, setData ] = useState({});
  const [visible, setVisible] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var passwordPattern = /^[a-zA-Z0-9]{6,}$/;

  const forgetPass = async () => {
    if(email === '' || password === '' || confirmPass === '') {
      Toast.show({
        type: 'error',
        text1: 'Nhập thiếu dữ liệu!',
        text1Style:{
          fontSize: 20,
        },
      })
    } else {
      if (!emailPattern.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Sai định dạng email!',
          text1Style:{
            fontSize: 20,
          },
        })
      } else if (!passwordPattern.test(password)) {
        Toast.show({
          type: 'error',
          text1: 'Mật khẩu cần có ít nhất 6 kí tự, không chứa kí tự đặc biệt và dấu cách !',
          text1Style:{
            fontSize: 20,
          },
        })
      } else if (password !== confirmPass) {
        Toast.show({
          type: 'error',
          text1: 'Mật khẩu xác nhận khác mật khẩu mới !',
          text1Style:{
            fontSize: 20,
          },
        })
      } else {
        let data = await postRequest('/forget-password', {
          newPassword: password,
          email,
        });
    
        const error = await data.message;
        if (error) {
          Toast.show({
            type: 'error',
            text1: error,
            text1Style:{
              fontSize: 20,
            },
          })
        }
        else {
          setData(data);
          setVisible(true);
        }
      }
    }
  }

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const ConfirmCode = async () => {
    if (confirmCode === '') {
      Toast.show({
        type: 'error',
        text1: 'Cần nhập mã xác nhận !',
        text1Style:{
          fontSize: 20,
        },
      })
    } else {
      let value = await postRequest('/confirm-code', {
        code: confirmCode,
        email: data.email,
        newPassword: data.newPassword
      })
      const error = await value.message;
      if (error) {
        Toast.show({
          type: 'error',
          text1: error,
          text1Style:{
            fontSize: 20,
          },
        })
      }
      else {
        navigation.navigate('Login')
        Toast.show({
          type: 'success',
          text1: 'Thành công !',
          text1Style:{
            fontSize: 20,
          },
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, marginBottom: 50, fontWeight: 800}}>FIRE ALARM SYSTEM</Text>
      {/* <View style={styles.form}> */}
        {/* <Text style={{fontSize:30, marginBottom:20}}>Đăng nhập</Text> */}
        <Input  placeholder="Email" keyboardType='email-address' inputMode='email' onChangeText={(value)=>setEmail(value)}/>
        <Input placeholder="Mật khẩu mới" secureTextEntry={true} onChangeText={(value)=>setPass(value)}/>
        <Input placeholder="Xác nhận mật khẩu mới" secureTextEntry={true} onChangeText={(value)=>setConfirmPass(value)}/>

        <Button 
            title={'Gửi'} 
            style={styles.btn} 
            containerStyle={{marginTop:20, width: 350}} 
            titleStyle={{fontSize: 20, padding:10}}
            onPress={()=>forgetPass()}>
        </Button>

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
      >
        <Dialog.Title title="Mã xác nhận"/>
        <Text style={{fontStyle:'italic'}}>*Vui lòng truy cập email để lấy mã xác nhận!</Text>
        <Input placeholder="Nhập mã xác nhận" keyboardType="numeric" onChangeText={(value)=>setConfirmCode(value)}/>
        <View>
          <Button title={'Gửi'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>ConfirmCode()}></Button>
          <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDialog()}></Button>
        </View>
      </Dialog>
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
    paddingTop: 80,
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
