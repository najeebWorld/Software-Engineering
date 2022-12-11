import React, { useState, Fragment } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import {StatusBar} from 'expo-status-bar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import AppoinmentContainer from '../components/AppoinmentContainer';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import moment from "moment";
import { getOrder } from "../../Firebase/FirebaseOperations";

export default function CalendarPage({navigation}) {
  
  const _barberData = [
    { label: 'Yossi 09:30', value: '1' },
    { label: 'Yaron 10:00', value: '2' },
    { label: 'Sapir 10:30', value: '3' },
    { label: 'Bar 11:00', value: '4' },
    { label: 'Tal 11:30', value: '5' },
    { label: 'Tamar 12:00', value: '6' },
    { label: 'Yoni 12:30', value: '7' },
    { label: 'Ravid 13:00', value: '8' },
  ];

  const _today = moment(new Date()).format("YYYY-MM-DD")
  const _lastDay = moment(new Date()).add(14, 'day').format("YYYY-MM-DD");
  const [_selectedDate, setSelectedDate] = useState(_today);
  const [_chosenQueue, setChosenBarber] = useState("Scheduled Queue...")
  

  const removeBlueStyle = () =>{
    const day = _today.split('-')[2];
    const year = _today.split('-')[0];
    let dates = {}
    for(let i = 1 ;i < 13 ; i++){
      const currDate = `${year}-${i}-${day}` === _selectedDate ? "" : `${year}-${i}-${day}`
      const currDateNext = `2023-${i}-${day}`;
      if(currDate === "")
        continue;
      if(currDate>_lastDay){
        dates[[currDate]] = {
          selectedColor: "white",
          selectedTextColor: "lightgrey"
        }
        dates[[currDateNext]] = {
          selectedColor: "white",
          selectedTextColor: "lightgrey"
        }
      }else{
        dates[[currDate]] = {
          selectedColor: "white",
          selectedTextColor: 'black'
        }
      }
    }
    return dates
  }
  

  const dates = removeBlueStyle();
  const changeOnDropDown = (item) => {
    setChosenBarber(item.label);
    console.log(item.label);
  }


  


  const OnBtnPress = () => {
    navigation.navigate('WorkingDays');
}

const DISABLED_DAYS = ['Saturday']

const getDaysInMonth =  (month, year, days) => {
  let pivot = moment().month(month).year(year).startOf('month')
  const end = moment().month(month).year(year).endOf('month')

  let dates = {}
  const disabled = { disabled: true }
  while(pivot.isBefore(end)) {
    days.forEach((day) => {
      dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
    })
    pivot.add(7, 'days')
  }

  return dates
}

var bool = true;

const disabled = getDaysInMonth(moment().month(), moment().year(),  DISABLED_DAYS);

  var appointments = {
    '2022-12-07': [{details: "Men's haircut, 09:30"} 
    ,{details: "Men's haircut, 10:30"}
    ,{details: "Men's haircut, 11:00"}
    ,{details: "Men's haircut, 12:30"}
    ,{details: "Men's haircut, 13:00"}
    ,{details: "Men's haircut, 14:00"}
    ,{details: "Men's haircut, 15:30"}
    ,{details: "Men's haircut, 16:30"}
    ],
    '2022-12-08': [{details: "Men's haircut, 12:30"}],
    
  }

    const onDayPress = async () => {
        if(bool) { 
            appointments = await getOrder();
            console.log(appointments);
            bool = false;
        }
    }
  

  return (
    <View style={styles.container}>   


    <SafeAreaView style={styles.container_Agenda}>
      <Fragment>
      <Agenda
        minDate={_today}
        maxDate={_lastDay}
        hideExtraDays={true}
        initialDate={_today}
        items={appointments}
        pastScrollRange={0}
        futureScrollRange={1}
        time_proportional={true}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item_Agenda}>
            <Text style={styles.itemText_Agenda}>{item.details} </Text>
          </TouchableOpacity>
        )}
        style={{borderRadius: 10}}
        renderEmptyData={ () => {
            return <Text></Text>;
          }}
        
        theme={{
            agendaDayTextColor: '#888',
            agendaDayNumColor: '#E5C492',
            agendaTodayColor: '#E5C492',
            agendaKnobColor: '#E5C492',
          }}
      />
      </Fragment>
    </SafeAreaView>
    
    <TouchableOpacity style={styles.btn} 
        onPress={OnBtnPress}>
        <Text style={styles.text}>Change Activity Time</Text>
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
    width: 250,
    margin: 10,
    height: 40,
    marginBottom: 0,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 3.0,
    borderColor: "#8D5238"
  },

  placeholderStyle: {
    fontSize: 15,
    textAlign: "center",
    color: "black",
    bold: "true",
  },

  selectedTextStyle: {
    fontSize: 15,
    color: "black",
    bold: "true",
    backgroundColor: "black"
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
    marginTop: 50,
    borderWidth: 3.0,
    borderColor: "#8D5238",
    borderRadius: 10

  },

  logoContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 50
  },

  chooseDateContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 50,
    marginRight:120
  },


  downDropText: {
    color: "black",
    fontSize: 15,
    textAlign: "center"
  },

  container_Agenda: {
    marginTop: 50,
    borderWidth: 4,
    borderColor: "#8D5238",
    borderRadius:10,
    flex: 1,
    maxHeight: 350,
    width: 300,
    justifyContent: 'center'
  },
  item_Agenda: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText_Agenda: {
    color: '#888',
    fontSize: 16,
  }

});