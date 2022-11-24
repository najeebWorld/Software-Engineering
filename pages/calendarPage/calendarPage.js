import React, { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";

export default function CalendarPage() {
  
  const _barberData = [
    { label: 'Eli', value: '1' },
    { label: 'Avi', value: '2' },
    { label: 'Rubi', value: '3' },
    { label: 'Anton', value: '4' },
    { label: 'Yaffa', value: '5' },
    { label: 'Bar', value: '6' },
    { label: 'Miki', value: '7' },
    { label: 'Shimon', value: '8' },
  ];
  
  const _hoursData = [
    { label: '09:30', value: '1' },
    { label: '10:00', value: '2' },
    { label: '10:30', value: '3' },
    { label: '11:00', value: '4' },
    { label: '11:30', value: '5' },
    { label: '12:00', value: '6' },
    { label: '12:30', value: '7' },
    { label: '13:00', value: '8' },
  ];

  const _today = moment(new Date()).format("YYYY-MM-DD")
  const _lastDay = moment(new Date()).add(14, 'day').format("YYYY-MM-DD");
  const [_hour, setHour] = useState(null);
  const [_selectedDate, setSelectedDate] = useState(null);

  
  const changeOnDropDown = (item) => {
    setHour(item.label);
    console.log(item.label);
  }

  const dayPress = (day) => {
    
    setSelectedDate(day.dateString);
    
    console.log('selected day: ', _selectedDate);
  }

  const OnBtnPress = () => {
    if (_selectedDate != null && _hour != null) {
      console.log("hello ", _selectedDate, _hour);
    } else {
      console.log("try again...");
    }
}
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logoContainer}
      />
  <View>
    <Dropdown
        style={styles.dropdown}
        data={_barberData}
        //iconStyle={styles.iconStyle}
        itemTextStyle={styles.downDropText}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={changeOnDropDown}
        placeholder="Choose Barber"
      />
    </View>

    
    <View style={styles.CalContainer}>
      <Calendar
      onDayPress={dayPress}
      hideExtraDays={true}
      minDate={_today}
      maxDate={_lastDay}  
      />
    </View>
    
    <View>
    <Dropdown
        style={styles.dropdown}
        data={_hoursData}
        //iconStyle={styles.iconStyle}
        itemTextStyle={styles.downDropText}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={changeOnDropDown}
        placeholder="Choose Time"
        
      />
    </View>

    <TouchableOpacity style={styles.btn} 
    onPress={OnBtnPress}>
        <Text style={styles.text}>Make an appointment</Text>
      </TouchableOpacity>
    
    

    </View>

    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5C492",
    alignItems: "center", 
  },
  
  dropdown: {
    width: 150,
    margin: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },

  placeholderStyle: {
    fontSize: 15,
    
  },

  selectedTextStyle: {
    fontSize: 15,
    color: "black",
  },

  SecContainer: {
    flex: 1,
    paddingTop: 10,
    //backgroundColor: "white",
    //width: 200
   },
   
  header: {
    fontSize: 10,
    backgroundColor: "#fff",
    color: "black", 
  },

  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#000000",
  },

  text: {
    color: "white"
  },
 
  CalContainer: {

      // borderWidth: 1,
      // borderColor: 'black',
      // height: 320,

  },

  logoContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
  },

  downDropText: {
    //color: "black",
    fontSize: 15,
  },
});