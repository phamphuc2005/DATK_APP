// Footer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Footer = ({ navigation, page }) => {
  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  const handleReloadPress = () => {
    navigation.replace(page);
  };

  return (
    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={()=>handleReloadPress()}>
            <Ionicons name="reload" size={24} color="#000" />
            {/* <Text style={styles.footerText}></Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleGoToHome}>
            <AntDesign name="home" size={25} color="#000" />
            {/* <Text style={styles.footerText}></Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={()=>navigation.goBack()}>
            <AntDesign name="left" size={25} color="#000" />
            {/* <Text style={styles.footerText}></Text> */}
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#000',
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25
  },
  footerItem: {
    alignItems: 'center',
    // marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  footerText: {
    color: '#fff',
  },
});

export default Footer;
