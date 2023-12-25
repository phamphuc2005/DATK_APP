import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

// const Stack = createStackNavigator();

const Home = ({navigation}) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize:40, fontWeight: 800, marginTop:-100}}>Trang chủ</Text>
        <TouchableOpacity style={styles.home_box} onPress={()=>navigation.navigate('UserInfo')}>
          <View style={{borderBottomColor: 'black', borderBottomWidth:1, width: '90%', alignItems: 'center', paddingBottom: 10}}>
            <AntDesign name="user" size={30} color="black" style={styles.icon} />
          </View>
          <View><Text style={{fontSize: 24, paddingTop:5, fontWeight: 500}}>Quản lý tài khoản</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.home_box} onPress={()=>navigation.navigate('ListLocation')}>
          <View style={{borderBottomColor: 'black', borderBottomWidth:1, width: '90%', alignItems: 'center', paddingBottom: 10}}>
            <AntDesign name="enviromento" size={30} color="black" style={styles.icon}/>
          </View>
          <View><Text style={{fontSize: 24, paddingTop:5, fontWeight: 500}}>Quản lý khu vực</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.home_box} onPress={()=>navigation.navigate('ListDevice')}>
          <View style={{borderBottomColor: 'black', borderBottomWidth:1, width: '90%', alignItems: 'center', paddingBottom: 10}}>
            <AntDesign name="linechart" size={30} color="black" />
          </View>
          <View><Text style={{fontSize: 24, paddingTop:5, fontWeight: 500}}>Thông số thiết bị</Text></View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.home_box} onPress={()=>navigation.navigate('ListStatistic')}>
          <View style={{borderBottomColor: 'black', borderBottomWidth:1, width: '90%', alignItems: 'center', paddingBottom: 10}}>
            <AntDesign name="barschart" size={30} color="black" />
          </View>
          <View><Text style={{fontSize: 24, paddingTop:5, fontWeight: 500}}>Thống kê số liệu</Text></View>
        </TouchableOpacity>

      </View>
        {/* <Button 
          color="error"
          title={'Đăng xuất'} 
          style={styles.btn} 
          containerStyle={{marginTop:20, width: 350}} 
          titleStyle={{fontSize: 20, padding:10}}
          buttonStyle={{ backgroundColor: 'red' }}
          onPress={handleLogout}
        >
        </Button> */}
        <Footer navigation={navigation} page={'Home'}/>
    </View>
  );
}

// const Header = ({ navigation }) => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: 'Trang chủ',
//           headerStyle: {
//             backgroundColor: 'dodgerblue',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           headerRight: () => (
//             <AntDesign name="bells" size={20} color="#fff" style={{marginRight: 20}}/>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  home_box: {
    backgroundColor: '#eee',
    height: 120,
    width: '90%',
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    padding: 20
  },
  icon: {
    // marginRight: 10,
  },
});

export default Home;
