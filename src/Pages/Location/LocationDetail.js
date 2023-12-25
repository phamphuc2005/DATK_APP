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

const LocationDetail = ({navigation}) => {
    const navigations  = useNavigation();
    const [ locations, setLocations ] = useState([]);
    const [ location, setLocation ] = useState([]);
    const [ location_id, setLocationId ] = useState();
    const [index, setIndex] = useState(0);
    const [ member, setMember ] = useState([]);
    const [ requests, setRequests ] = useState([]);
    const [ devicess, setDevicess ] = useState([]);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const location_id = await  AsyncStorage.getItem('locationID');
            setLocationId(location_id);
            if (!accessToken) {
                navigation.navigate('Login');
            } else {
                GetLocation();
            }
        };
        checkAccessToken();
      }, [navigations, navigation, location_id]);

      const GetLocation = async () => {
        const data = await getRequest(`/location/${location_id}`);
        if (data) {
          setLocation(data);
        }
      }

      useEffect(() => {
        GetMember();    
        GetRequests();
        GetDevices();
      }, [navigations, navigation, location_id]);
      
      const GetMember = async () => {
        const data = await getRequest(`/member_location/${location_id}`);
        if (data) {
          setMember(data);
        }
      }
      
      const GetRequests = async () => {
        const data = await getRequest(`/request_location/${location_id}`);
        if (data) {
          setRequests(data);
        }
      }

      const GetDevices = async () => {
        const data = await getRequest(`/get-devices/${location_id}`);
        if (data) {
          setDevicess(data);
        }
      }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <View style={{marginHorizontal:'5%', borderColor: '#eee', borderWidth: 1}}>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'green',
                    height: 2,
                }}
                // variant="primary"
                style={{}}
            >
                <Tab.Item
                    title="Thành viên"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    icon={{ name: 'users', type: 'feather', color: 'black' }}
                />
                <Tab.Item
                    title="Thiết bị"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    icon={{ name: 'hard-drive', type: 'feather', color: 'black' }}
                />
            </Tab>
        </View>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Chi tiết khu vực</Text>
                    {location && location.role && location.role === 'Admin' ?
                        <View style={styles.buttons}>
                            <Button
                                title={'Đổi tên'}
                                buttonStyle={{ backgroundColor: 'orange' }}
                            ></Button>
                            <Button
                                title={'Xóa khu vực'}
                                buttonStyle={{backgroundColor: 'red'}}
                            ></Button>
                        </View> :
                        <View style={[styles.buttons, {justifyContent:'flex-end'}]}>
                            <Button
                                title={'Rời khu vực'}
                                buttonStyle={{backgroundColor: 'red'}}
                            ></Button>
                        </View>
                    }
                
                <View style={styles.list_box}>
                    <Text style={{fontSize: 20, fontWeight: 500}}>Mã khu vực: {location.locationID}</Text>
                    <Text style={{fontSize: 20, fontWeight: 500}}>Tên khu vực: {location.name}</Text>
                </View>
            </View>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%', paddingLeft: '5%', paddingRight:'5%'}}>
                    <View>
                        {location && location.role && location.role === 'Admin' ?
                            <View style={{marginVertical: 10, flexDirection: 'row'}}>
                                <Button
                                    title={'Thêm thành viên'}
                                    buttonStyle={{ backgroundColor: 'green' }}
                                ></Button>
                            </View> :
                            <View></View>
                        }
                        <View style={{backgroundColor: '#eee', paddingVertical:5, paddingHorizontal: 10, borderRadius: 5}}>
                            <Text style={{fontWeight: 700, fontSize: 24}}>Danh sách thành viên</Text>
                        </View>
                        {member.length > 0 ?
                            <View>
                                {member.map((e, index)=>(
                                    <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical:5, paddingHorizontal: 10, borderColor:'#eee', borderWidth:1, alignItems: 'center', borderRadius: 5}}>
                                        <View>
                                            <Text style={{}}>Tên:  {e.name}</Text>
                                            <Text style={{}}>Email:  {e.email}</Text>
                                            <Text style={{}}>SĐT:  {e.phone}</Text>
                                            <Text style={{}}>Vai trò:  {e.role}</Text>
                                        </View>
                                        <View>
                                            {e.role !== 'Admin' ?
                                                <Button
                                                    title={'Xóa'}
                                                    buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                    titleStyle={{color: 'red'}}
                                                ></Button> :
                                                <View></View>
                                            }
                                        </View>
                                    </View>
                                ))}
                            </View> :
                            <View style={{alignItems: 'center'}}><Text>Danh sách trống</Text></View>
                        }

                        {location && location.role && location.role === 'Admin' ?
                            <View>
                                <View style={{backgroundColor: '#eee', paddingVertical:5, paddingHorizontal: 10, borderRadius: 5, marginTop: 10}}>
                                    <Text style={{fontWeight: 700, fontSize: 24}}>Danh sách xin gia nhập</Text>
                                </View>
                                {requests.length > 0 ?
                                    <View>
                                        {requests.map((e, index)=>(
                                            <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical:5, paddingHorizontal: 10, borderColor:'#eee', borderWidth:1, alignItems: 'center', borderRadius: 5}}>
                                                <View>
                                                    <Text style={{}}>Tên:  {e.name}</Text>
                                                    <Text style={{}}>Email:  {e.email}</Text>
                                                    <Text style={{}}>SĐT:  {e.phone}</Text>
                                                </View>
                                                <View>
                                                    <Button
                                                        title={'Chấp nhận'}
                                                        buttonStyle={{borderColor: 'green', borderWidth: 1, backgroundColor: 'white'}}
                                                        titleStyle={{color: 'green'}}
                                                    ></Button>
                                                    <Button
                                                        title={'Từ chối'}
                                                        buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                        titleStyle={{color: 'red'}}
                                                    ></Button>
                                                </View>
                                            </View>
                                        ))}
                                    </View> :
                                    <View style={{alignItems: 'center'}}><Text>Danh sách trống</Text></View>
                                } 
                            </View> :
                            <View></View>
                        }
                    </View> 
                </TabView.Item>

                <TabView.Item style={{ width: '100%', paddingLeft: '5%', paddingRight:'5%'}}>
                    <View>
                        {location && location.role && location.role === 'Admin' ?
                            <View style={{marginVertical: 10, flexDirection: 'row', justifyContent:'space-between'}}>
                                <Button
                                    title={'Thêm thiết bị'}
                                    buttonStyle={{ backgroundColor: 'green' }}
                                ></Button>
                                <Button
                                    title={'Thùng rác'}
                                    buttonStyle={{ backgroundColor: 'red' }}
                                    onPress={()=>navigation.navigate('Trash')}
                                ></Button>
                            </View> :
                            <View></View>
                        }
                        <View style={{backgroundColor: '#eee', paddingVertical:5, paddingHorizontal: 10, borderRadius: 5}}>
                            <Text style={{fontWeight: 700, fontSize: 24}}>Danh sách thiết bị</Text>
                        </View>
                        {devicess.length > 0 ?
                            <View>
                                {devicess.map((e, index)=>(
                                    <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical:5, paddingHorizontal: 10, borderColor:'#eee', borderWidth:1, alignItems: 'center', borderRadius: 5}}>
                                        <View>
                                            <Text style={{}}>Mã thiết bị:  {e.deviceID}</Text>
                                            <Text style={{}}>Tên thiết bị:  {e.name}</Text>
                                        </View>
                                        {location && location.role && location.role === 'Admin' ?
                                            <View style={{flexDirection: 'row', justifyContent:'space-between', gap: 5}}>
                                                <Button
                                                    title={'Đổi tên'}
                                                    buttonStyle={{borderColor: 'orange', borderWidth: 1, backgroundColor: 'white'}}
                                                    titleStyle={{color: 'orange'}}
                                                ></Button> 
                                                <Button
                                                    title={'Xóa'}
                                                    buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                    titleStyle={{color: 'red'}}
                                                ></Button> 

                                            </View> :
                                            <View></View>
                                        }
                                    </View>
                                ))}
                            </View> :
                            <View style={{alignItems: 'center'}}><Text>Danh sách trống</Text></View>
                        }
                    </View>
                </TabView.Item>
            </TabView>
        </ScrollView>
        <Footer navigation={navigation} page={'LocationDetail'}/>
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

export default LocationDetail;
