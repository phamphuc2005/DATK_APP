import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest } from '../../Services/api';
import Chart from './Chart';

const Stack = createStackNavigator();

const DeviceDetail = ({navigation}) => {
    const navigations  = useNavigation();
    const route = useRoute();
    const [ allSystems, setAllSystems ] = useState([]);
    const [ deviceID, setDeviceID ] = useState('');
    const [ system, setSystem ] = useState({});
    const [ sysState, setSysState ] = useState();
    const [ val, setVal ] = useState({});
    const [ state, setState ] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#eee');

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const deviceID = await  AsyncStorage.getItem('deviceID');
            setDeviceID(deviceID);
            if (!accessToken) {
                navigation.navigate('Login');
            } else {
                // GetAllSystems();
            }
        };
        checkAccessToken();
      }, [navigations]);

      const GetSystem = async () => {
        const data = await getRequest(`/system/${deviceID}`);
        // console.log('...', data);
        if (data) {
          setSystem(data);
          const { state } = data
          if (state) {
            setSysState(true);
          } else setSysState(false);
        //   if(data.message) navigate('*')
        }
      }

      useEffect(() => {
        GetSystem();
      }, [navigations, deviceID]);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRequest(`/system-params/${deviceID}`);
                if (data) {
                  setVal(data);
                  if (data.message && data.message === 'disconnect') {
                    setState('Mất kết nối !!!');
                    setBackgroundColor('#ffff00');
                  } else {
                    if (data.warning === true) {
                      setState('!!! Nguy hiểm !!!');
                      setBackgroundColor('red');
                    } else {
                      setState('An toàn !');
                      setBackgroundColor('#49dd49');
                    }
                  }
                }
            } catch (error) {
                console.log(error);
            }
        }
        const interval = setInterval(fetchData, 5000);
    
        return () => {
          clearInterval(interval);
        //   clearInterval(interval2);
        }
      }, [deviceID, getRequest, setVal]);

      const toggleSwitch = async () => {
        var state;
        if (sysState) {
          state = 0;
        } else {
          state = 1;
        }
        const data = await getRequest(`/system-state/${deviceID}?state=${state}`);
        setSysState(!sysState);
      };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 50}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Chi tiết thiết bị</Text>
                <View style={[styles.list_box, {backgroundColor}]}>
                  <Text style={{fontSize: 20, fontWeight: 500}}>Trạng thái:</Text>
                  <Text style={{fontSize: 20, fontStyle: 'italic'}}>{state}</Text>
                </View>
                <View style={styles.list_box}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 500}}>ID: {deviceID}</Text>
                        <Text style={{fontSize: 20, fontWeight: 500}}>Tên thiết bị: {system&&system.name ? system.name : ' '}</Text>
                        <Text style={{fontSize: 20, fontWeight: 500}}>
                            Khu vực: {system&&system.locationID&&system.locationID.name ? system.locationID.name : ' '} - {system&&system.locationID&&system.locationID.locationID ? system.locationID.locationID : ' '}
                        </Text>
                    </View>
                    <View>
                      <Switch
                        onValueChange={toggleSwitch}
                        value={sysState}
                        thumbColor={sysState ? "#009fff" : "#ff0000"}
                      ></Switch>
                    </View>
                </View>
                <View style={styles.param}>
                    <View><Text style={{fontSize: 18}}>Nhiệt độ: {val.temp}°C</Text></View>
                    <View><Text style={{fontSize: 18}}>Độ ẩm: {val.humid ? val.humid : ' '}%</Text></View>
                    <View><Text style={{fontSize: 18}}>Lửa: {val.fire}</Text></View>
                    <View><Text style={{fontSize: 18}}>Ga: {val.gas ? val.gas : ' '}</Text></View>
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ nhiệt độ</Text>
                    <Chart 
                        val={val?.temp ? Math.round(val?.temp) : 0}
                        name='Nhiệt độ' 
                        color='#ffff00'   
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ độ ẩm</Text>
                    <Chart 
                        val={val?.humid ? Math.round(val?.humid) : 0} 
                        name='Độ ẩm' 
                        color='#00ffff'
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ gas</Text>
                    <Chart 
                        val={val?.gas ? Math.round(val?.gas) : 0} 
                        name='Gas'
                        color='#00ff00'
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ lửa</Text>
                    <Chart 
                        val={val?.fire ? Math.round(val?.fire) : 0} 
                        name='Lửa'
                        color='#ff0000'
                    />
                </View>
            </View>
        </ScrollView>
        <Footer navigation={navigation} page={'DeviceDetail'}/>
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
  param: {
    backgroundColor: '#eee',
    marginTop: 10,
    width: '90%',
    padding: 15,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
  chart: {
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
  }
});

export default DeviceDetail;
