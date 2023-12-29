import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge, Button, Dialog } from 'react-native-elements';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';
import { getRequest, postRequest } from '../Services/api';
import Toast from 'react-native-toast-message';
import moment from 'moment';

// const Stack = createStackNavigator();

const Notice = ({navigation}) => {
  const navigations = useNavigation();
  const [ name, setName ] = useState('');
  const [ userId, setUserId ] = useState('');

  const [ notices, setNotices ] = useState([]);
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect((navigation) => {
    const checkAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const name = await  AsyncStorage.getItem('name');
        setName(name);
        const userID = await AsyncStorage.getItem('user_id');
        setUserId(userID);
        if (!accessToken) {
            navigation.navigate('Login');
        } else {
            allNotice();
        }
    };
    checkAccessToken();
  }, [navigations, navigation]);

  const allNotice = async () => {
    const data = await getRequest('/list-notice');
    if (data.error) {
      Toast.show({
        type: 'error',
        text1: data.error,
        text1Style:{
          fontSize: 20,
        },
    })
    } else {
      setNotices(data)
    }
  }

  const formattedTime = (e) => {
    return moment(e).format("HH:mm:ss, DD/MM/YYYY");
  }

  const showNotice = async (e) => {
    Alert.alert('Thông báo', e.content);
    const data = await postRequest('/read-notice', {
      _id: e._id,
      userID: userId
    });
    const error = await data.message;
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text1Style:{
          fontSize: 20,
        },
      })
      allNotice();
    }
    else {
      allNotice();
    }
  }

  const toggleDialog = (e) => {
    setNotice(e);
    setVisible(!visible);
  };

  const deleteNotice = async () => {
    const data = await postRequest('/delete-notice', {
      _id: notice,
      userID: userId
    });
    const error = await data.message;
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text1Style:{
          fontSize: 20,
        },
      })
      allNotice();
    }
    else {
      allNotice();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="user-circle" size={24} color="black" />
        <Text style={{fontSize: 24, fontWeight: 700}}>{name} !</Text>
      </View>
      <ScrollView style={{paddingTop: 10, marginBottom: 20}}>
        {notices.length > 0 && notices.map((e, index)=>(
          <View key={index} style={{width: '100%', alignItems:'center'}}>
            {e.state === 0 ?
              <TouchableOpacity 
                style={{width:'95%', flexDirection:'row', justifyContent:'space-between', borderColor:'#eee', borderWidth: 2, borderRadius:5, padding: 10, marginBottom: 10, alignItems: 'center'}}
                onPress={()=>showNotice(e)}
              >
                <View style={{maxWidth:'85%'}}>
                  <Text style={{borderBottomColor: '#eee', borderBottomWidth: 1, fontWeight: 700, fontSize: 16, paddingBottom: 5}}>
                    {e.content}
                  </Text>
                  <Text style={{fontWeight: 700, paddingTop: 5}}>{formattedTime(e.createdAt)}</Text>
                </View>
                <TouchableOpacity
                  style={{ paddingLeft:10, paddingVertical:10, paddingRight:5}}
                  onPress={()=>toggleDialog(e._id)}
                >
                  <AntDesign name="delete" size={22} color="red" />
                </TouchableOpacity>
                <Badge status="error" containerStyle={{ position: 'absolute', left: '104.5%', top: -4 }}/>
              </TouchableOpacity> :
              <TouchableOpacity
                style={{width:'95%', flexDirection:'row', justifyContent:'space-between', borderColor:'#eee', borderWidth: 2, borderRadius:5, padding: 10, marginBottom: 10, alignItems: 'center'}}
                onPress={()=>showNotice(e)}
              >
                <View style={{maxWidth:'85%'}}>
                  <Text style={{borderBottomColor: '#eee', borderBottomWidth: 1, fontSize: 16, paddingBottom: 5}}>
                    {e.content}
                  </Text>
                  <Text style={{paddingTop: 5}}>{formattedTime(e.createdAt)}</Text>
                </View>
                <TouchableOpacity
                  style={{ paddingLeft:10, paddingVertical:10, paddingRight:5}}
                  onPress={()=>toggleDialog(e._id)}
                >
                  <AntDesign name="delete" size={22} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            }
          </View>
        ))}
        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}
        >
          <Dialog.Title title="Xóa thông báo"/>
          <Text style={{fontSize: 16}}>Bạn có chắc chắn muốn xóa không ?</Text>
          <View>
            <Button title={'Có'} buttonStyle={{marginBottom: 10, marginTop: 20}} onPress={()=>deleteNotice()}></Button>
            <Button title={'Không'} buttonStyle={{backgroundColor:'red'}} onPress={()=>toggleDialog()}></Button>
          </View>
        </Dialog>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  header: {
    backgroundColor:'#eee',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10
  },

});

export default Notice;
