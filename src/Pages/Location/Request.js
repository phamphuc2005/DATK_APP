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
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const Request = ({navigation}) => {
    const navigations  = useNavigation();
    const [ requests, setRequests ] = useState([]);
    const [ userId, setUserId ] = useState('');
    const [ request, setRequest ] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userID = await AsyncStorage.getItem('user_id');
            setUserId(userID);
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

      const toggleDialog = () => {
        setVisible(!visible);
      };

      const chooseRequest = (e) => {
        setRequest(e);
        setVisible(true);
      }

      const cancelRequest = async () => {
        const data = await postRequest('/cancel-request', {
          locationID: request,
          userID: userId
        });
        const error = await data.message;
        if (error) {
          setVisible(false);
          Toast.show({
            type: 'error',
            text1: error,
            text1Style:{
              fontSize: 20,
            },
          })
        }
        else {
          setVisible(false);
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text1Style:{
              fontSize: 20,
            },
          })
          GetRequests();
        }
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
                                        onPress={()=>chooseRequest(e._id)}
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

            <Dialog
              isVisible={visible}
              onBackdropPress={toggleDialog}
            >
              <Dialog.Title title="Hủy yêu cầu"/>
              <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn hủy không ?</Text>
              <View>
                <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>cancelRequest()}></Button>
                <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDialog()}></Button>
              </View>
            </Dialog>
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
