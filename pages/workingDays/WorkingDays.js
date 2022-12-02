import React, { useState} from "react";
import { Dropdown } from 'react-native-element-dropdown';
import DaySelector from "../components/daySelector";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {styles} from '../styles'

export default function WorkingDays({navigation}) {
  
  const _hoursData = [
    { label: '00:00', value: '1' },
    { label: '00:30', value: '2' },
    { label: '01:00', value: '3' },
    { label: '01:30', value: '4' },
    { label: '02:00', value: '5' },
    { label: '02:30', value: '6' },
    { label: '03:00', value: '7' },
    { label: '03:30', value: '8' },
    { label: '04:00', value: '9' },
    { label: '04:30', value: '10' },
    { label: '05:00', value: '11' },
    { label: '05:30', value: '12' },
    { label: '06:00', value: '13' },
    { label: '06:30', value: '14' },
    { label: '07:00', value: '15' },
    { label: '07:30', value: '16' },
    { label: '08:00', value: '17' },
    { label: '08:30', value: '18' },
    { label: '09:00', value: '19' },
    { label: '09:30', value: '20' },
    { label: '10:00', value: '21' },
    { label: '10:30', value: '22' },
    { label: '11:00', value: '23' },
    { label: '11:30', value: '24' },
    { label: '12:00', value: '25' },
    { label: '12:30', value: '26' },
    { label: '13:00', value: '27' },
    { label: '13:30', value: '28' },
    { label: '14:00', value: '29' },
    { label: '14:30', value: '30' },
    { label: '15:00', value: '31' },
    { label: '15:30', value: '32' },
    { label: '16:00', value: '33' },
    { label: '16:30', value: '34' },
    { label: '17:00', value: '35' },
    { label: '17:30', value: '36' },
    { label: '18:00', value: '37' },
    { label: '18:30', value: '38' },
    { label: '19:00', value: '39' },
    { label: '19:30', value: '40' },
    { label: '20:00', value: '41' },
    { label: '20:30', value: '42' },
    { label: '21:00', value: '43' },
    { label: '21:30', value: '44' },
    { label: '22:00', value: '45' },
    { label: '22:30', value: '46' },
    { label: '23:00', value: '47' },
    { label: '23:30', value: '48' },
  ];

  const _intervalData = [
    { label: '5 min', value: '1' },
    { label: '10 min', value: '2' },
    { label: '15 min', value: '3' },
    { label: '20 min', value: '4' },
    { label: '25 min', value: '5' },
    { label: '30 min', value: '6' },
    { label: '35 min', value: '7' },
    { label: '40 min', value: '8' },
    { label: '45 min', value: '9' },
    { label: '50 min', value: '10' },
    { label: '55 min', value: '11' },
    { label: '1 hour', value: '12' },
    { label: '1.5 hour', value: '13' },
    { label: '2 hour', value: '14' },
    { label: '2.5 hour', value: '15' },
    { label: '3 hour', value: '16' },
  ];

  const weekDays = {
    "Sun": false,
    "Mon": false,
    "Tue": false,
    "Wed": false,
    "Thu": false,
    "Fri": false,
    "Sat": false
  }

  const [_startTime, setStartTime] = useState('09:00');
  const [_endTime, setEndTime] = useState('17:00');
  const [_duration, setDuration] = useState('20 min');
  const [_weekDays, setWeekDays] = useState(weekDays);
  
  const changeOnDropDownStart = (item) => {
    setStartTime(item.label);
  }

  const changeOnDropDownEnd = (item) => {
    setEndTime(item.label);
  }

  const changeOnDropDownDuration = (item) =>{
    setDuration(item.label);
  }
  const OnBtnPress = () => {
    const workingDays=[]
    for(i of ["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"]){
        if(_weekDays[i]){
            workingDays.push(i);
        }
    }
    console.log(`You work on ${workingDays} from ${_startTime} to ${_endTime} each haircut takes ${_duration}`)
  }
  const foo = () => {
    setWeekDays(prevState =>({...prevState, "Sun": true}))
    console.log(_weekDays)
  }
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/chooseworkingdays.png')}
        style={styles.chooseDateContainer}
      />
    <DaySelector setWeekDays = {setWeekDays} />
    <Image 
        source={require('../assets/chooseworkinghours.png')}
        style={styles.chooseDateContainer}
      />
    <View style={{flexDirection: "row", marginRight: 10, marginTop: 10}}>
        <Text style={{fontWeight: "bold", color: "black", marginRight:125}}>FROM</Text>
        <Text style={{fontWeight: "bold", color: "black"}}>TO</Text>
    </View>
    <View style={{flexDirection: "row"}}>
    <Dropdown
        style={styles.dropdown}
        data={_hoursData}
        itemTextStyle={styles.downDropText}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={changeOnDropDownStart}
        placeholder={_startTime}
      />
    <Dropdown
        style={styles.dropdown}
        data={_hoursData}
        itemTextStyle={styles.downDropText}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={changeOnDropDownEnd}
        placeholder={_endTime}
        
      />
    </View>
    <Image 
        source={require('../assets/choosehaircutduration.png')}
        style={styles.chooseDateContainer}
      />
    <View style={{marginRight: "38.5%"}}>
    <Dropdown
        style={styles.dropdown}
        data={_intervalData}
        itemTextStyle={styles.downDropText}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={changeOnDropDownDuration}
        placeholder={_duration}
        
      />
    </View>
    <TouchableOpacity style={styles.btn} 
        onPress={OnBtnPress}>
        <Text style={styles.text}>Done</Text>
      </TouchableOpacity>
    
    

    </View>

    
  );
}
 