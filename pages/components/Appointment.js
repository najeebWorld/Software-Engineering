import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {styles} from '../styles';
const Appointment = props => {
  return (
    <View style={styles.appoinment}>
      <View style={{flexDirection: 'column', marginLeft: 7, width: 180}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
          {props.user}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          Details:
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          {`${props.date}, ${props.time}`}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          {props.type}
        </Text>
      </View>
      <View style={{flexDirection: 'column', marginLeft: 7}}>
        <TouchableOpacity style={{marginBottom: 10, marginTop: 10}}>
          <Image source={require('../assets/trash.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/usersearch.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;
