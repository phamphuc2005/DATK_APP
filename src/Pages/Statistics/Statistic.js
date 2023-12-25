import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest, postRequest } from '../../Services/api';
import moment from 'moment/moment';
import ChartStatistic from './ChartStatistic';

const Stack = createStackNavigator();

const Statistic = ({navigation}) => {
    const navigations  = useNavigation();
    const route = useRoute();
    const [ allSystems, setAllSystems ] = useState([]);
    const [ deviceID, setDeviceID ] = useState('');
    const [ system, setSystem ] = useState({});
    const [ sysState, setSysState ] = useState();
    // const days = [];
    const [day, setDay] = useState(-7);
    const [ param, setParam ] = useState([]);
    const [ arr, setArr ] = useState([]);
    const [time, setTime] = useState([])
    const [temp, setTemp] = useState([])
    const [humid, setHumid] = useState([])
    const [fire, setFire] = useState([])
    const [gas, setGas] = useState([])

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


      useLayoutEffect(() => {
        const GetParam = async () => {
          let days = [];
          for (let i = 0; i < 7; i++) {
            const nextDate = new Date().setDate(new Date().getDate()+i+day)
            days.push(new Date(nextDate).toDateString());
            setArr(days);
          }
          const data = await postRequest(`/statistic/${deviceID}`, {
            time: days,
          });
          if (data) {
            setParam(data.data);
            data.data.map(data => {
              time.push(moment(data.day).format('DD/MM/YYYY'))
              temp.push(data.temp)
              humid.push(data.humid)
              fire.push(data.fire)
              gas.push(data.gas)
            })
            setTime(time.slice(-7));
            setTemp(temp.slice(-7));
            setHumid(humid.slice(-7));
            setFire(fire.slice(-7));
            setGas(gas.slice(-7));
          }
        }
        GetParam();
      },[day, deviceID])

      // console.log(param);

      const dateStrings = arr.map((date) => {
        const day = moment(date).format('DD/MM/YYYY')
        return `${day}`;
      });

      const prevWeek = () => {
        setDay(day - 7);
      }

      const nextWeek = () => {
        setDay(day + 7);    
      }
      
      // console.log(temp);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 50}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Số liệu trung bình</Text>
                <View style={styles.select_time}>
                    <Button
                        onPress={()=>prevWeek()}
                        icon={{
                            type:'ant-design',
                            name: 'caretleft',
                            color: 'white',
                            size: 15
                        }}
                    ></Button>
                    <View style={styles.time}><Text style={{fontSize: 18}}>{dateStrings[0]} - {dateStrings[6]}</Text></View>
                    {day === -7 ?
                        <Button
                            disabled
                            onPress={()=>nextWeek()}
                            icon={{
                                type:'ant-design',
                                name: 'caretright',
                                color: 'white',
                                size: 15
                            }}
                        ></Button> :
                        <Button
                            onPress={()=>nextWeek()}
                            icon={{
                                type:'ant-design',
                                name: 'caretright',
                                color: 'white',
                                size: 15
                            }}
                        ></Button>
                    }
                </View>
                <View style={styles.list_box}>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 500}}>Mã thiết bị: {deviceID}</Text>
                        <Text style={{fontSize: 20, fontWeight: 500}}>Tên thiết bị: {system&&system.name ? system.name : ' '}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: 500}}>
                            Khu vực: {system&&system.locationID&&system.locationID.name ? system.locationID.name : ' '}
                        </Text>
                        <Text style={{fontSize: 20, fontWeight: 500}}>
                            ID: {system&&system.locationID&&system.locationID.locationID ? system.locationID.locationID : ' '}
                        </Text>
                    </View>
                </View>
                {/* <View style={styles.param}>
                    <View><Text style={{fontSize: 18}}>Nhiệt độ: {val.temp}°C</Text></View>
                    <View><Text style={{fontSize: 18}}>Độ ẩm: {val.humid ? val.humid : ' '}%</Text></View>
                    <View><Text style={{fontSize: 18}}>Lửa: {val.fire}</Text></View>
                    <View><Text style={{fontSize: 18}}>Ga: {val.gas ? val.gas : ' '}</Text></View>
                </View> */}
                <View style={styles.table}>
                  <View style={styles.table_header}>
                      <Text style={{fontWeight: 700}}>Thời gian</Text>
                      <Text style={{fontWeight: 700}}>Nhiệt độ</Text>
                      <Text style={{fontWeight: 700}}>Độ ẩm</Text>
                      <Text style={{fontWeight: 700}}>Lửa</Text>
                      <Text style={{fontWeight: 700}}>Gas</Text>

                  </View>
                  {param.length>0 && param.map((e, index)=>(
                      <View style={styles.table_item} key={index}>
                          <Text>{moment(e.day).format('DD/MM/YYYY')}</Text>
                          <Text>{e.temp}°C</Text>
                          <Text>{e.humid}%</Text>
                          <Text>{e.fire}</Text>
                          <Text>{e.gas}</Text>
                      </View>             
                  ))}
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ nhiệt độ</Text>
                    <ChartStatistic
                        time={time} 
                        val={temp}
                        name='Nhiệt độ' 
                        color='#ffff00'   
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ độ ẩm</Text>
                    <ChartStatistic
                        time={time} 
                        val={humid} 
                        name='Độ ẩm' 
                        color='#00ffff'
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ gas</Text>
                    <ChartStatistic
                        time={time} 
                        val={gas} 
                        name='Gas'
                        color='#00ff00'
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={{marginBottom:5, fontSize: 20, fontWeight: '700'}}>Biểu đồ lửa</Text>
                    <ChartStatistic
                        time={time} 
                        val={fire} 
                        name='Lửa'
                        color='#ff0000'
                    />
                </View>

            </View>
        </ScrollView>
        <Footer navigation={navigation} page={'Statistic'}/>
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
  }, 
  select_time: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  },
  time: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5
  },
  table: {
    marginTop: 10,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%'
  },
  table_header: {
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table_item: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Statistic;
