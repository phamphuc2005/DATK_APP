import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest } from '../../Services/api';

const Stack = createStackNavigator();

const ListDevice = ({navigation}) => {
    const navigations  = useNavigation();
    const [ allSystems, setAllSystems ] = useState([]);
    const [ sysState, setSysState ] = useState(false);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                navigation.navigate('Login');
            } else {
                GetAllSystems();
            }
        };
        checkAccessToken();
      }, [navigations, navigation]);

  const GetAllSystems = async () => {
    const data = await getRequest(`/list-devices/All`);
    setAllSystems(await data);
    // console.log(await data);
  }

//   console.log(allSystems);

  const viewDetail = async (value) => {
    await AsyncStorage.setItem('deviceID',  value.deviceID);
    navigation.navigate('DeviceDetail', {deviceID: value.deviceID});
    // console.log(value.deviceID);
  }

  const toggleSwitch = async (val) => {
    var state;
    if (val.state)
      state = 0;
    else state = 1;
    const data = await getRequest(`/system-state/${val.deviceID}?state=${state}`);
    GetAllSystems();
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 50}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Danh sách thiết bị</Text>
                {allSystems.length > 0 ?
                    <View style={{width: '100%', alignItems: 'center'}} >
                        {allSystems.map((e, index)=>(
                            <TouchableOpacity style={styles.list_box} key={index} onPress={()=>viewDetail(e)}>
                                <View>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>ID: {e.deviceID}</Text>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>Tên thiết bị: {e.name}</Text>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>Khu vực: {e.locationID.name} - {e.locationID.locationID}</Text>
                                </View>
                                <View>
                                  <Switch
                                    onValueChange={()=>toggleSwitch(e)}
                                    value={e.state === 1 ? true : false}
                                    thumbColor={e.state ? "#009fff" : "#ff0000"}
                                  ></Switch>
                                </View>
                            </TouchableOpacity>

                        ))}
                    </View> :
                    <View><Text>Danh sách trống</Text></View>
                }
            </View>
        </ScrollView>
        <Footer navigation={navigation} page={'ListDevice'}/>
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
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListDevice;
