import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {styles} from '../styles';
import AppoinmentContainer from '../components/AppoinmentContainer';
import {StatusBar} from 'expo-status-bar';
import { getCustomerOrders } from '../../Firebase/FirebaseOperations';
import user from '../../Firebase/User'
import { get } from 'https';

const MyAppointments = ({navigation}) => {
  const [appointments,setAppointments] = useState({});
  useEffect(() => {
    const getOrders = async () => {
      const app = await getCustomerOrders(user.userID());
      setAppointments(app);
    }
    getOrders().catch((err)=>alert(err))
  });
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require('../assets/myappointments.png')}
        style={{
          ...styles.logoContainerSuccess,
          marginBottom: 150,
          marginRight: 100,
        }}
      />
      <AppoinmentContainer appointments={appointments} />
      <TouchableOpacity
        style={{...styles.loginBtn, marginTop: 300}}
        onPress={() => {
          navigation.navigate('AppointmentMaker');
        }}>
        <Text style={styles.loginText}>Make new appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAppointments;
