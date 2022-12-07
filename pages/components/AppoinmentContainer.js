import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {styles} from '../styles';
import Appointment from './Appointment';
import user from '../../Firebase/User'

const AppoinmentContainer = props => {
  return (
    <View style={styles.appointmentContainer}>
      <ScrollView contentContainerStyle={styles.appointmentContainerContent}>
        {Object.values(props.appointments).map(appointment => {
          return(
          <Appointment
            user={appointment["Barber_id"]}
            type={appointment["extra_info"]}
            date={appointment["date"]}
            time={appointment["time"]}
            key={Math.random()}
          />)
      })}
      </ScrollView>
    </View>
  );
};

export default AppoinmentContainer;
