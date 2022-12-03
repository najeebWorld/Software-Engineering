import React from 'react';
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

const MyAppointments = ({navigation}) => {
  const appointments = {
    first: {
      barber: 'Barber: Avi',
      type: "Men's haircut",
      time: '3/12/22, 15:30',
    },
    second: {
      barber: 'Barber: Tamar',
      type: "Women's haircut with fan",
      time: '7/12/22, 12:30',
    },
    third: {
      barber: 'Barber: Lior',
      type: "Men's haircut with beard trim",
      time: '01/01/23, 22:30',
    },
    fourth: {
      barber: 'Dan',
      type: "Men's haircut",
      time: '06/01/23, 21:30',
    },
    fifth: {
      barber: 'Barber: Ran',
      time: '01/01/24, 22:30',
    },
  };
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
        style={{...styles.btn, marginTop: 200}}
        onPress={() => {
          navigation.navigate('AppointmentMaker');
        }}>
        <Text style={styles.loginText}>Make new appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAppointments;
