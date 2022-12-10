import React, {useState, Fragment, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import moment from 'moment';
import {newOrder, getCustomerOrders, getAvailableAppointments, getBarberList} from '../../Firebase/FirebaseOperations';
import user from '../../Firebase/User'
import { useFocusEffect } from '@react-navigation/native';

export default function CalendarPage({navigation}) {

  const _today = moment(new Date()).format('YYYY-MM-DD');
  const _lastDay = moment(new Date()).add(14, 'day').format('YYYY-MM-DD');
  const [_hour, setHour] = useState('Choose time');
  const [_selectedDate, setSelectedDate] = useState('');
  const [_chosenBarber, setChosenBarber] = useState('Choose barber');
  const [_barberData, SetBarberData] = useState([]);
  const [_barber_id, setBarberID] = useState('');
  const [_workHours, setWorkHours] = useState([]);
  const [_findBarbers, setFindBarbers] = useState(false);
  useEffect(()=>{
    const getWorkDays = async () =>{
      if(_barber_id){
        const workHoursArr = await getAvailableAppointments(_selectedDate,_barber_id).catch(err=>alert(err));
        const workHours = [];
        let counter = 1;
        workHoursArr.forEach(hour=>workHours.push({label: hour, value:counter++}))
        setWorkHours(workHours); 
        if(workHours.length===0){
          setHour('Choose Date');
          alert('No available appointments on selected date')
        }
      }
    }
    getWorkDays().catch(err => alert(err));
  },[_barber_id])

  useFocusEffect(React.useCallback(() => {
    const getBarbers = async () => {
      const Barbers = await getBarberList();
      SetBarberData(Barbers);
    }
    getBarbers().catch((err)=>alert(err));
  },[]));

  const removeBlueStyle = () => {
    const day = _today.split('-')[2];
    const year = _today.split('-')[0];
    let dates = {};
    for (let i = 1; i < 13; i++) {
      const month = parseInt(i / 10) === 0 ? `0${i}` : i;
      const currDate =
        `${year}-${i}-${day}` === _selectedDate
          ? ''
          : `${year}-${month}-${day}`;
      const currDateNext = `2023-${month}-${day}`;
      dates[[currDateNext]] = {
        selectedColor: 'white',
        selectedTextColor: 'lightgrey',
      };
      if (currDate === '') continue;
      if (currDate > _lastDay) {
        dates[[currDate]] = {
          selectedColor: 'white',
          selectedTextColor: 'lightgrey',
        };
      } else {
        dates[[currDate]] = {
          selectedColor: 'white',
          selectedTextColor: 'black',
        };
      }
    }
    return dates;
  };

  const dates = removeBlueStyle();
  const changeOnDropDownBarber = item => {
    console.log('label',item.label);
    setChosenBarber(item.label);
    setBarberID(item.value);
    console.log(item.label);
  };

  const changeOnDropDownHour = item => {
    setHour(item.label);
    console.log(item.label);
  };

  const dayPress = day => {
    setSelectedDate(day.dateString);
    console.log('selected day: ', _selectedDate);
  };

  const OnBtnPress = async () => {
    if (_chosenBarber != 'Choose barber' && _selectedDate != '' && _hour != 'Choose time') {
      await newOrder(_barber_id, _selectedDate, _hour);
      alert('Your chosen appointment is scheduled');
      console.log(
        'Your chosen appointment is: ',
        _barber_id,
        _selectedDate,
        _hour,
      );
    } else {
      alert("Check the requirements")
      console.log('try again...');
    }
    user.userAppointments(await getCustomerOrders(user.userID()));
  };

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
  
  const disabled = getDaysInMonth(moment().month(), moment().year(),  DISABLED_DAYS);
    
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/choosedate.png')}
        style={styles.chooseDateContainer}
      />

      <View style={styles.CalContainer}>
        <Fragment>
          <Calendar
            hideExtraDays={true}
            initialDate={_today}
            minDate={_today}
            maxDate={_lastDay}
            style={{borderRadius: 10}}
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              [_selectedDate]: {
                selected: true,
                selectedColor: '#E5C492',
                selectedTextColor: 'black',
              },
              ...dates,
              ...disabled
            }}
          />
        </Fragment>
      </View>
      <View>
        <Dropdown
          style={styles.dropdown}
          data={_barberData}
          itemTextStyle={styles.downDropText}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          onChange={changeOnDropDownBarber}
          placeholder={_chosenBarber}
        />
      </View>
      <View>
        <Dropdown
          style={styles.dropdown}
          data={_workHours}
          itemTextStyle={styles.downDropText}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          onChange={changeOnDropDownHour}
          placeholder={_hour}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={async ()=>{await OnBtnPress()}}>
        <Text style={styles.text}>Make an appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5C492',
    alignItems: 'center',
  },

  dropdown: {
    width: 250,
    margin: 10,
    height: 40,
    marginBottom: 0,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 3.0,
    borderColor: '#8D5238',
  },

  placeholderStyle: {
    fontSize: 15,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black',
    bold: 'true',
  },

  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    bold: 'true',
    backgroundColor: 'white',
    flex: 2,
    marginLeft:95
  },

  SecContainer: {
    flex: 1,
    paddingTop: 10,
  },

  header: {
    fontSize: 10,
    backgroundColor: '#fff',
    color: 'black',
  },

  btn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#000000',
  },

  text: {
    color: 'white',
  },

  CalContainer: {
    borderWidth: 3.0,
    borderColor: '#8D5238',
    borderRadius: 10,
  },

  logoContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 50,
  },

  chooseDateContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 50,
    marginRight: 120,
  },

  downDropText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
