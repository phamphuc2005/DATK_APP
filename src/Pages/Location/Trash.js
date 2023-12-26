import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, Button, Dialog, Tab, TabView } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest, postRequest } from '../../Services/api';

const Stack = createStackNavigator();

const Trash = ({navigation}) => {
    const navigations  = useNavigation();
    const [ location, setLocation ] = useState([]);
    const [ location_id, setLocationId ] = useState();
    const [ userId, setUserId ] = useState('');
    const [ allSystems, setAllSystems ] = useState([]);

    const [ trashId, setTrashId ] = useState('');
    const [visibleRestore, setVisibleRestore] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

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
                GetTrash();
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

      const GetTrash = async () => {
        const data = await getRequest(`/get-trash/${location_id}`);
        setAllSystems(await data);
        // console.log(await data);
      }

      const toggleDialogRestore = (e) => {
        setTrashId(e._id)
        setVisibleRestore(!visibleRestore);
      };

      const toggleDialogDelete = (e) => {
        setTrashId(e._id)
        setVisibleDelete(!visibleDelete);
      };

      const restoreDevice = async () => {
        const data = await postRequest('/restore-device', {
          _id: trashId,
          userID: userId
        });
        const error = await data.message;
        if (error) {
          setVisibleRestore(false);
          Toast.show({
            type: 'error',
            text1: error,
            text1Style:{
              fontSize: 20,
            },
          })
        }
        else {
          setVisibleRestore(false);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text1Style:{
              fontSize: 20,
            },
          })
          GetTrash();
        }
      }

      const deleteDevice = async () => {
        const data = await postRequest('/delete-device', {
          _id: trashId,
          userID: userId
        });
        const error = await data.message;
        if (error) {
          setVisibleDelete(false);
          Toast.show({
            type: 'error',
            text1: error,
            text1Style:{
              fontSize: 20,
            },
          })
        }
        else {
          setVisibleDelete(false);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text1Style:{
              fontSize: 20,
            },
          })
          GetTrash();
        }
      }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
        <ScrollView style={{paddingTop: 20}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize:40, fontWeight: 800, marginBottom: 10}}>Thùng rác</Text>
                
                <View style={styles.list_box}>
                    <Text style={{fontSize: 20, fontWeight: 500}}>Mã khu vực: {location.locationID}</Text>
                    <Text style={{fontSize: 20, fontWeight: 500}}>Tên khu vực: {location.name}</Text>
                </View>

                {allSystems.length > 0 ?
                    <View style={{width: '100%', marginLeft:'10%'}}>
                        {allSystems.map((e, index)=>(
                            <View key={index} style={{borderColor:'#eee', borderWidth: 2, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10, alignItems: 'center'}}>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: 500}}>ID:  {e.deviceID}</Text>
                                    <Text style={{fontSize: 16, fontWeight: 500}}>Tên thiết bị:  {e.name}</Text>
                                </View>
                                <View style={{gap: 5}}>
                                    <Button
                                        title={'Khôi phục'}
                                        buttonStyle={{borderColor: 'orange', borderWidth: 1, backgroundColor: 'white'}}
                                        titleStyle={{color: 'orange'}}
                                        onPress={()=>toggleDialogRestore(e)}
                                    ></Button>
                                    <Button
                                        title={'Xóa vĩnh viễn'}
                                        buttonStyle={{borderColor: 'red', borderWidth: 1, backgroundColor: 'white'}}
                                        titleStyle={{color: 'red'}}
                                        onPress={()=>toggleDialogDelete(e)}
                                    ></Button>
                                </View>
                            </View>
                        ))}
                    </View> :
                    <View style={{borderColor:'#eee', borderWidth: 2, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, width: '90%', marginTop: 10, alignItems: 'center'}}>
                        <Text>Thùng rác trống</Text>
                    </View>
                }

            </View>

            <Dialog
              isVisible={visibleRestore}
              onBackdropPress={toggleDialogRestore}
            >
              <Dialog.Title title="Khôi phục thiết bị"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn khôi phục không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>restoreDevice()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleRestore(false)}></Button>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleDelete}
              onBackdropPress={toggleDialogDelete}
            >
              <Dialog.Title title="Xóa thiết bị"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn xóa không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>deleteDevice()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>setVisibleDelete(false)}></Button>
              </View>
            </Dialog>
        </ScrollView>
        <Footer navigation={navigation} page={'Trash'}/>
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

export default Trash;
