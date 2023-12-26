import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, Button, Dialog, Input, Tab, TabView } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest, postRequest } from '../../Services/api';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const LocationDetail = ({navigation}) => {
    const navigations  = useNavigation();
    const [ locations, setLocations ] = useState([]);
    const [ location, setLocation ] = useState([]);
    const [ location_id, setLocationId ] = useState();
    const [index, setIndex] = useState(0);
    const [ members, setMembers ] = useState([]);
    const [ requests, setRequests ] = useState([]);
    const [ devicess, setDevicess ] = useState([]);
    const [ nameLocation, setLocationName ] = useState('');

    const [ userId, setUserId ] = useState('');
    const [visibleChange, setVisibleChange] = useState(false);
    const [visibleDeleteLocation, setVisibleDeleteLocation] = useState(false);
    const [visibleOutLocation, setVisibleOutLocation] = useState(false);

    const [ memberEmail, setMemberEmail ] = useState('');
    const [visibleAddMember, setVisibleAddMember] = useState(false);
    const [ memberId, setMemberId ] = useState('');
    const [visibleDeleteMember, setVisibleDeleteMember] = useState(false);
    const [ requestId, setRequestId ] = useState('');
    const [visibleAcceptRequest, setVisibleAcceptRequest] = useState(false);
    const [visibleDenyRequest, setVisibleDenyRequest] = useState(false);

    const [ deviceName, setDeviceName ] = useState('');
    const [ deviceID, setDeviceID ] = useState('');
    const [visibleAddDevice, setVisibleAddDevice] = useState(false);
    const [visibleChangeDevice, setVisibleChangeDevice] = useState(false);
    const [visibleRemoveDevice, setVisibleRemoveDevice] = useState(false);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const location_id = await  AsyncStorage.getItem('locationID');
            setLocationId(location_id);
            const userID = await AsyncStorage.getItem('user_id');
            setUserId(userID);
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
          setMembers(data);
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

      const toggleChange = () => {
        setVisibleChange(!visibleChange);
      };

      const toggleDeleteLocation = () => {
        setVisibleDeleteLocation(!visibleDeleteLocation);
      };

      const toggleOutLocation = () => {
        setVisibleOutLocation(!visibleOutLocation);
      };

      const toggleAddMember = () => {
        setVisibleAddMember(!visibleAddMember);
      };

      const toggleDeleteMember = (e) => {
        setMemberId(e.member_id);
        setVisibleDeleteMember(!visibleDeleteMember);
      };

      const toggleAcceptRequest = (e) => {
        setRequestId(e.request_id);
        setVisibleAcceptRequest(!visibleAcceptRequest);
      };

      const toggleDenyRequest = (e) => {
        setRequestId(e.request_id);
        setVisibleDenyRequest(!visibleDenyRequest);
      };

      const toggleAddDevice = () => {
        setVisibleAddDevice(!visibleAddDevice);
      };

      const toggleChangeDevice = (e) => {
        setDeviceID(e._id);
        setVisibleChangeDevice(!visibleChangeDevice);
      };

      const toggleRemoveDevice = (e) => {
        setDeviceID(e._id);
        setVisibleRemoveDevice(!visibleRemoveDevice);
      };

      const changeLocation = async () => {
        const data = await postRequest('/update-location', {
            name: nameLocation,
            userID: userId,
            _id: location_id
          });
    
          const error = await data.message;
          if (error) {
            setVisibleChange(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
              })
          }
          else {
            setVisibleChange(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
              })
            GetLocation();
          }
      }

      const deleteLocation = async () => {
        const data = await postRequest('/delete-location', {
            _id: location_id,
            userID: userId
          });
          const error = await data.message;
          if (error) {
            setVisibleDeleteLocation(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleDeleteLocation(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            navigation.navigate('ListLocation');
          }
      }

      const outLocation = async () => {
        const data = await postRequest('/out-location', {
            _id: location_id,
            userID: userId 
          });
          const error = await data.message;
          if (error) {
            setVisibleOutLocation(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleOutLocation(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            navigation.navigate('ListLocation');
          }
      }

      const addMember = async () => {
        const data = await await postRequest('/add-member', {
            email: memberEmail,
            userID: userId,
            locationID: location_id
          });
    
          const error = await data.message;
          if (error) {
            setVisibleAddMember(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
              })
          }
          else {
            setVisibleAddMember(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
              })
            GetMember();
          }
      }

      const deleteMember = async () => {
        const data = await postRequest('/delete-member', {
            _id: memberId,
            userID: userId
          });
          const error = await data.message;
          if (error) {
            setVisibleDeleteMember(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleDeleteMember(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            GetMember();
          }
      }

      const acceptRequest = async () => {
        const data = await postRequest('/accept-request', {
            _id: requestId,
            userID: userId
          });
          const error = await data.message;
          if (error) {
            setVisibleAcceptRequest(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleAcceptRequest(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            GetRequests();
            GetMember();
          }
      }

      const denyRequest = async () => {
        const data = await postRequest('/deny-request', {
            _id: requestId,
            userID: userId
          });
          const error = await data.message;
          if (error) {
            setVisibleDenyRequest(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleDenyRequest(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            GetRequests();
            GetMember();
          }
      }

      const addDevice = async () => {
        const data = await postRequest('/add-device', {
            name: deviceName,
            deviceID: deviceID,
            userID: userId,
            locationID: location_id
          });
          const error = await data.message;
          if (error) {
            setVisibleAddDevice(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleAddDevice(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            GetDevices();
          }
      }

      const changeDevice = async () => {
        if (deviceName === '') {
            Toast.show({
                type: 'error',
                text1: 'Cần nhập ít nhất 1 kí tự !',
                text1Style:{
                  fontSize: 20,
                },
            })
        } else {
            const data = await getRequest(`/system-name/${deviceID}?name=${deviceName}`);
            const error = await data.message;
            if (error) {
                setVisibleChangeDevice(false);
                Toast.show({
                    type: 'error',
                    text1: error,
                    text1Style:{
                        fontSize: 20,
                    },
                })
            }
            else {
                setVisibleChangeDevice(false);
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text1Style:{
                        fontSize: 20,
                    },
                })
                GetDevices();
            }
        }
      }

      const removeDevice = async () => {
        const data = await postRequest('/remove-device', {
            _id: deviceID,
            userID: userId
          });
          const error = await data.message;
          if (error) {
            setVisibleRemoveDevice(false);
            Toast.show({
                type: 'error',
                text1: error,
                text1Style:{
                  fontSize: 20,
                },
            })
          }
          else {
            setVisibleRemoveDevice(false);
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text1Style:{
                  fontSize: 20,
                },
            })
            GetDevices();
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
                                onPress={()=>toggleChange()}
                            ></Button>
                            <Button
                                title={'Xóa khu vực'}
                                buttonStyle={{backgroundColor: 'red'}}
                                onPress={()=>toggleDeleteLocation()}
                            ></Button>
                        </View> :
                        <View style={[styles.buttons, {justifyContent:'flex-end'}]}>
                            <Button
                                title={'Rời khu vực'}
                                buttonStyle={{backgroundColor: 'red'}}
                                onPress={()=>toggleOutLocation()}
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
                                    onPress={()=>toggleAddMember()}
                                ></Button>
                            </View> :
                            <View></View>
                        }
                        <View style={{backgroundColor: '#eee', paddingVertical:5, paddingHorizontal: 10, borderRadius: 5}}>
                            <Text style={{fontWeight: 700, fontSize: 24}}>Danh sách thành viên</Text>
                        </View>
                        {members.length > 0 ?
                            <View>
                                {members.map((e, index)=>(
                                    <View key={index} style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical:5, paddingHorizontal: 10, borderColor:'#eee', borderWidth:1, alignItems: 'center', borderRadius: 5}}>
                                        <View>
                                            <Text style={{}}>Tên:  {e.name}</Text>
                                            <Text style={{}}>Email:  {e.email}</Text>
                                            <Text style={{}}>SĐT:  {e.phone}</Text>
                                            <Text style={{}}>Vai trò:  {e.role}</Text>
                                        </View>
                                        <View>
                                            {e.role !== 'Admin' && location && location.role && location.role === 'Admin'  ?
                                                <Button
                                                    title={'Xóa'}
                                                    buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                    titleStyle={{color: 'red'}}
                                                    onPress={()=>toggleDeleteMember(e)}
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
                                                        onPress={()=>toggleAcceptRequest(e)}
                                                    ></Button>
                                                    <Button
                                                        title={'Từ chối'}
                                                        buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                        titleStyle={{color: 'red'}}
                                                        onPress={()=>toggleDenyRequest(e)}
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
                                    onPress={()=>toggleAddDevice()}
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
                                                    onPress={()=>toggleChangeDevice(e)}
                                                ></Button> 
                                                <Button
                                                    title={'Xóa'}
                                                    buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                                    titleStyle={{color: 'red'}}
                                                    onPress={()=>toggleRemoveDevice(e)}
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

            <Dialog
              isVisible={visibleChange}
              onBackdropPress={toggleChange}
            >
              <Dialog.Title title="Đổi tên khu vực"/>
              <Input placeholder="Nhập tên khu vực" onChangeText={(value)=>setLocationName(value)}/>
              <View>
                <Button title={'Đổi'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>changeLocation()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleChange()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleDeleteLocation}
              onBackdropPress={toggleDeleteLocation}
            >
              <Dialog.Title title="Xóa khu vực"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn xóa khu vực không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>deleteLocation()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDeleteLocation()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleOutLocation}
              onBackdropPress={toggleOutLocation}
            >
              <Dialog.Title title="Rời khu vực"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn rời khu vực không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>outLocation()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleOutLocation()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleAddMember}
              onBackdropPress={toggleAddMember}
            >
              <Dialog.Title title="Thêm thành viên"/>
              <Input placeholder="Nhập email thành viên" onChangeText={(value)=>setMemberEmail(value)}/>
              <View>
                <Button title={'Tạo'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>addMember()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleAddMember()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleDeleteMember}
              onBackdropPress={toggleDeleteMember}
            >
              <Dialog.Title title="Xóa thành viên"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn xóa thành viên này không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>deleteMember()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleDeleteMember(false)}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleAcceptRequest}
              onBackdropPress={toggleAcceptRequest}
            >
              <Dialog.Title title="Chấp nhận yêu cầu"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn chấp nhận yêu cầu này không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>acceptRequest()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleAcceptRequest(false)}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleDenyRequest}
              onBackdropPress={toggleDenyRequest}
            >
              <Dialog.Title title="Từ chối yêu cầu"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn từ chối yêu cầu này không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>denyRequest()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleDenyRequest(false)}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleAddDevice}
              onBackdropPress={toggleAddDevice}
            >
              <Dialog.Title title="Thêm thiết bị"/>
              <Input placeholder="Nhập mã thiết bị" onChangeText={(value)=>setDeviceID(value)}/>
              <Input placeholder="Nhập tên thiết bị" onChangeText={(value)=>setDeviceName(value)}/>
              <View>
                <Button title={'Thêm'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>addDevice()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleAddDevice()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleChangeDevice}
              onBackdropPress={toggleChangeDevice}
            >
              <Dialog.Title title="Đổi tên thiết bị"/>
              <Input placeholder="Nhập tên mới" onChangeText={(value)=>setDeviceName(value)}/>
              <View>
                <Button title={'Đổi'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>changeDevice()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleChangeDevice()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleRemoveDevice}
              onBackdropPress={toggleRemoveDevice}
            >
              <Dialog.Title title="Xóa thiết bị"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn xóa thiết bị này không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>removeDevice()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleRemoveDevice(false)}></Button>
              </View>
            </Dialog>
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
