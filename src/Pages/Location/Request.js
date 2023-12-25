import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, Button, Tab, TabView } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest } from '../../Services/api';

const Stack = createStackNavigator();

const Request = ({navigation}) => {
    const navigations  = useNavigation();
    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                navigation.navigate('Login');
            } else {
                GetRequests();
            }
        };
        checkAccessToken();
      }, [navigations, navigation]);

      const GetRequests = async () => {
        const data = await getRequest('/list-request');
        setRequests(await data);
        // console.log(await data);
      }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Danh sách yêu cầu</Text>

                {requests.length > 0 ?
                    <View style={{width: '100%', marginLeft:'10%'}}>
                        {requests.map((e, index)=>(
                            <View key={index} style={{borderColor:'#eee', borderWidth: 2, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10, alignItems: 'center'}}>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 500}}>Khu vực:  {e.name}</Text>
                                    <Text style={{fontSize: 16, fontWeight: 500}}>ID:  {e.locationID}</Text>
                                    <Text style={{fontSize: 16, fontWeight: 500}}>Vai trò:  {e.role}</Text>
                                </View>
                                <View style={{gap: 5}}>
                                    <Button
                                        title={'Hủy'}
                                        buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                        titleStyle={{color: 'red'}}
                                    ></Button>
                                </View>
                            </View>
                        ))}
                    </View> :
                    <View style={{borderColor:'#eee', borderWidth: 2, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, width: '90%', marginTop: 10, alignItems: 'center'}}>
                        <Text>Danh sách trống</Text>
                    </View>
                }

            </View>
        </ScrollView>
        <Footer navigation={navigation} page={'Request'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  list_box: {
    backgroundColor: '#eee',
    // height: 120,
    width: '90%',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 50,
    width: '90%',
    marginTop: 20
  }
});

export default Request;
