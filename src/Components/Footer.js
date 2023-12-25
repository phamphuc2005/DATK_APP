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
            <Ionicons name="reload" size={24} color="#fff" />
            <Text style={styles.footerText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handleGoToHome}>
            <AntDesign name="home" size={25} color="#fff" />
            <Text style={styles.footerText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color="#fff" />
            <Text style={styles.footerText}></Text>
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
    backgroundColor: 'dodgerblue',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  footerItem: {
    alignItems: 'center',
    marginTop: 15
  },
  footerText: {
    color: '#fff',
  },
});

export default Footer;
