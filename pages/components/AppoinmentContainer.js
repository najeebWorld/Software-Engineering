import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {styles} from '../styles';
import Appointment from './Appointment';

const AppoinmentContainer = props => {
  return (
    <View style={styles.appointmentContainer}>
      <ScrollView contentContainerStyle={styles.appointmentContainerContent}>
        {Object.values(props.appointments).map(appointment => (
          <Appointment
            user={appointment.user ? appoinment.user : appointment.barber}
            type={appointment.type}
            time={appointment.time}
            key={Math.random()}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppoinmentContainer;
