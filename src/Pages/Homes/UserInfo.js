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

const UserInfo = ({navigation }) => {
  const [ userInfo, setUserInfo ] = useState({});
  const navigations  = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    GetUserInfo();
  }, [navigations]);

  const GetUserInfo = async () => {
    const data = await getRequest('/user');
    setUserInfo(await data);
    setEmail(data.email);
    setName(data.name);
    setPhone(data.phone);
    // localStorage.setItem('username', await data.username);
    await AsyncStorage.setItem('name',  data.name);
    await AsyncStorage.setItem('email',  data.email);
    await AsyncStorage.setItem('phone',  data.phone);
    await AsyncStorage.setItem('user_id',  data._id);
  }

  const updateInfo = async () => {
    const data = await postRequest('/update-profile', {
      name: name,
      email: email,
      phone: phone
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
      GetUserInfo();
      setVisible(!visible);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text1Style:{
          fontSize: 20,
        },
      })
    }
  }

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <Text style={{fontSize:40, fontWeight: 800}}>Thông tin tài khoản</Text>
      <View style={styles.form}>
        {/* <Text style={{fontSize:30, marginBottom:20}}>Đăng nhập</Text> */}
        <Text style={styles.label}>Email:</Text>
        <Input placeholder="Email" keyboardType='email-address' inputMode='email' value={email} onChangeText={(value)=>setEmail(value)}/>
        <Text style={styles.label}>Họ tên:</Text>
        <Input placeholder="Họ tên" value={name} onChangeText={(value)=>setName(value)}/>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Input placeholder="Số điện thoại" keyboardType="numeric" value={phone} onChangeText={(value)=>setPhone(value)}/>

      </View>
        <Button 
            title={'Chỉnh sửa'} 
            style={styles.btn} 
            containerStyle={{ width: 350}} 
            titleStyle={{fontSize: 20, padding:10}}
            onPress={()=>toggleDialog()}>
        </Button>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={{fontSize:20}}>Bạn muốn đổi mật khẩu?</Text>
          <TouchableOpacity >
            <Text
              style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 20 }}
              onPress={()=>navigation.navigate('ChangePass')}
            >Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
        >
          <Dialog.Title title="Chỉnh sửa thông tin tài khoản"/>
          <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn chỉnh sửa không ?</Text>
          <View>
            <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>updateInfo()}></Button>
            <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDialog()}></Button>
          </View>
        </Dialog>
      <Footer navigation={navigation} page={'UserInfo'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 10
  },
});

export default UserInfo;
