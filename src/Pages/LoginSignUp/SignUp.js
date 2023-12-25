import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default function SignUp({navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, marginBottom: 50, fontWeight: 800}}>FIRE ALARM SYSTEM</Text>
      {/* <View style={styles.form}> */}
        {/* <Text style={{fontSize:30, marginBottom:20}}>Đăng nhập</Text> */}
        <Input  placeholder="Email" keyboardType='email-address' inputMode='email'/>
        <Input placeholder="Mật khẩu" secureTextEntry={true} />
        <Input placeholder="Xác nhận mật khẩu" secureTextEntry={true} />
        <Input placeholder="Họ tên" />
        <Input placeholder="Số điện thoại" keyboardType="numeric"/>

        <Button 
            title={'Đăng ký'} 
            style={styles.btn} 
            containerStyle={{marginTop:20, width: 350}} 
            titleStyle={{fontSize: 20, padding:10}}>
        </Button>
        <View style={{flexDirection: 'row', marginTop: 40, gap: 10}}>
          <Text Text style={{fontSize:20}}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 20 }}>Đăng nhập ngay</Text></TouchableOpacity>
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
