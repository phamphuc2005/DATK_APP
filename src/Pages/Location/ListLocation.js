import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, Button, Dialog, Input } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest, postRequest } from '../../Services/api';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const ListLocation = ({navigation}) => {
    const navigations  = useNavigation();
    const [ locations, setLocations ] = useState([]);
    const [ userId, setUserId ] = useState('');
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleJoin, setVisibleJoin] = useState(false);
    const [locationName, setLocationName] = useState('');
    const [locationID, setLocationID] = useState('');

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userID = await AsyncStorage.getItem('user_id');
            setUserId(userID);
            if (!accessToken) {
                navigation.navigate('Login');
            } else {
                GetLocations();
            }
        };
        checkAccessToken();
      }, [navigations, navigation]);

      const GetLocations = async () => {
        const data = await getRequest(`/list-location/All`);
        setLocations(await data);
        // console.log(await data);
      }

//   console.log(allSystems);

  const viewDetail = async (value) => {
    await AsyncStorage.setItem('locationID',  value._id);
    navigation.navigate('LocationDetail', {locationID: value._id});
  }

  const toggleCreate = () => {
    setVisibleCreate(!visibleCreate);
  };

  const toggleJoin = () => {
    setVisibleJoin(!visibleJoin);
  };

  const createLocation = async () => {
    const data = await postRequest('/add-location', {
      name: locationName,
      userID: userId
    });
    const error = await data.message;
    if (error) {
      setVisibleCreate(false);
      Toast.show({
        type: 'error',
        text1: error,
        text1Style:{
          fontSize: 20,
        },
      })
    }
    else {
      setVisibleCreate(false);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text1Style:{
          fontSize: 20,
        },
      })
      GetLocations();
    }
  }

  const joinLocation = async () => {
    const data = await postRequest('/join-location', {
      locationID: locationID,
      userID: userId
    });

    const error = await data.message;
    if (error) {
      setVisibleJoin(false);
      Toast.show({
        type: 'error',
        text1: error,
        text1Style:{
          fontSize: 20,
        },
      })
    }
    else {
      setVisibleJoin(false);
      Toast.show({
        type: 'success',
        text1: 'Thành công. Vui lòng chờ admin duyệt!',
        text1Style:{
          fontSize: 20,
        },
      })
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 50}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Danh sách khu vực</Text>
                <View style={styles.buttons}>
                    <Button
                        title={'Tạo mới'}
                        buttonStyle={{ backgroundColor: 'green' }}
                        onPress={()=>toggleCreate()}
                    ></Button>
                    <Button
                        title={'Xin gia nhập'}
                        buttonStyle={{}}
                        onPress={()=>toggleJoin()}
                    ></Button>
                    <Button
                        title={'Đã yêu cầu'}
                        buttonStyle={{backgroundColor: 'orange'}}
                        onPress={()=>navigation.navigate('Request')}
                    ></Button>
                </View>

                {locations.length > 0 ?
                    <View style={{width: '100%', alignItems: 'center', marginTop: 10}} >
                        {locations.map((e, index)=>(
                            <TouchableOpacity style={styles.list_box} key={index} onPress={()=>viewDetail(e)}>
                                <View>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>Khu vực: {e.name}</Text>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>ID: {e.locationID}</Text>
                                    <Text style={{fontSize: 20, fontWeight: 500}}>Vai trò: {e.role}</Text>
                                </View>
                                <AntDesign name="right" size={24} color="black" />
                            </TouchableOpacity>

                        ))}
                    </View> :
                    <View><Text>Danh sách trống</Text></View>
                }
            </View>

            <Dialog
              isVisible={visibleCreate}
              onBackdropPress={toggleCreate}
            >
              <Dialog.Title title="Tạo mới khu vực"/>
              <Input placeholder="Nhập tên khu vực" onChangeText={(value)=>setLocationName(value)}/>
              <View>
                <Button title={'Tạo'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>createLocation()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleCreate()}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleJoin}
              onBackdropPress={toggleJoin}
            >
              <Dialog.Title title="Gia nhập khu vực"/>
              <Input placeholder="Nhập mã khu vực" onChangeText={(value)=>setLocationID(value)}/>
              <View>
                <Button title={'Gửi'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>joinLocation()}></Button>
                <Button title={'Hủy'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleJoin()}></Button>
              </View>
            </Dialog>
        </ScrollView>
        <Footer navigation={navigation} page={'ListLocation'}/>
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
    marginTop: 10,
    alignItems: 'center',
    padding: 15,
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

export default ListLocation;
