import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet, Button } from 'react-native-elements';
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getRequest } from '../../Services/api';

const Stack = createStackNavigator();

const ListLocation = ({navigation}) => {
    const navigations  = useNavigation();
    const [ locations, setLocations ] = useState([]);

    useEffect(() => {
        const checkAccessToken = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
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
                    ></Button>
                    <Button
                        title={'Xin gia nhập'}
                        buttonStyle={{}}
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
