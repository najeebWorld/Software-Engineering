import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {styles} from '../styles';
import Appointment from './Appointment';
import user from '../../Firebase/User'

const AppoinmentContainer = props => {
  return (
    <View style={styles.appointmentContainer}>
      <ScrollView contentContainerStyle={styles.appointmentContainerContent}>
        {
          Object.keys(props.appointments).map(key=>{
            return(
              <Appointment
                user={props.appointments[key]["Barber_id"]}
                type={props.appointments[key]["extra_info"]}
                date={props.appointments[key]["date"]}
                time={props.appointments[key]["time"]}
                docID={key}
                key={Math.random()}
                render={props.render}
                renderVal={props.renderVal}
              />
            )
          })
        }
      </ScrollView>
    </View>
  );
};

export default AppoinmentContainer;
