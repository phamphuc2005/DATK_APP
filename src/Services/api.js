import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function postRequest(url, body) {
    try {
      const generateRequest = await  generateRequestHeader();
      let response = await axios.post('http://192.168.1.98:9999' + url, body, generateRequest);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function getRequest(url) {
    try {
      const generateRequest = await  generateRequestHeader();
      // console.log(generateRequest);
      let response = await axios.get(
        'http://192.168.1.98:9999' + url,
        generateRequest
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function generateRequestHeader() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken)
      return {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      };
    else return {
      headers: {
        "Content-Type": "application/json"
      },
    }
  }