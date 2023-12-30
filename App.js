import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Pages/LoginSignUp/Login';
import SignUp from './src/Pages/LoginSignUp/SignUp';
import ForgetPass from './src/Pages/LoginSignUp/ForgetPass';
import Home from './src/Pages/Homes/Home';
import UserInfo from './src/Pages/Homes/UserInfo';
import ChangePass from './src/Pages/Homes/ChangePass';
import ListDevice from './src/Pages/Devices/ListDevice';
import DeviceDetail from './src/Pages/Devices/DeviceDetail';
import ListStatistic from './src/Pages/Statistics/ListStatistic';
import Statistic from './src/Pages/Statistics/Statistic';
import ListLocation from './src/Pages/Location/ListLocation';
import LocationDetail from './src/Pages/Location/LocationDetail';
import Trash from './src/Pages/Location/Trash';
import Request from './src/Pages/Location/Request';
import Menu from './src/Components/Menu';
import Notice from './src/Components/Notice';
import Toast from 'react-native-toast-message';
// import registerNNPushToken from 'native-notify';

const Stack = createStackNavigator();

export default function App(props) {
  // registerNNPushToken(17007, 'HijsBh8EjeFAfyis39f9tG');
  return (
    <NavigationContainer>
      <StatusBar style='auto' backgroundColor='#fff'></StatusBar>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: true, title: 'ĐĂNG KÝ', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="ForgetPass" component={ForgetPass} options={{headerShown: true, title: 'LẤY LẠI MẬT KHẨU', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="UserInfo" component={UserInfo} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePass" component={ChangePass} options={{headerShown: false}}/>
        <Stack.Screen name="ListDevice" component={ListDevice} options={{headerShown: false}}/>
        <Stack.Screen name="DeviceDetail" component={DeviceDetail} options={{headerShown: false}}/>
        <Stack.Screen name="ListStatistic" component={ListStatistic} options={{headerShown: false}}/>
        <Stack.Screen name="Statistic" component={Statistic} options={{headerShown: false}}/>
        <Stack.Screen name="ListLocation" component={ListLocation} options={{headerShown: false}}/>
        <Stack.Screen name="LocationDetail" component={LocationDetail} options={{headerShown: false}}/>
        <Stack.Screen name="Trash" component={Trash} options={{headerShown: false}}/>
        <Stack.Screen name="Request" component={Request} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component={Menu} options={{headerShown: true, title: 'MENU', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="Notice" component={Notice} options={{headerShown: true, title: 'THÔNG BÁO', headerTitleAlign: 'center'}}/>
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
