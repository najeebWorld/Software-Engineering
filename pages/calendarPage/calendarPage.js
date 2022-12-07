import React, {useState, Fragment} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import auth from '@react-native-firebase/auth';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import moment from 'moment';
import {newOrder, getCustomerOrders} from '../../Firebase/FirebaseOperations';
import user from '../../Firebase/User'

export default function CalendarPage({navigation}) {
  const _barberData = [
    {label: 'Eli', value: '1'},
    {label: 'Avi', value: '2'},
    {label: 'Rubi', value: '3'},
    {label: 'Anton', value: '4'},
    {label: 'Yaffa', value: '5'},
    {label: 'Bar', value: '6'},
    {label: 'Miki', value: '7'},
    {label: 'Shimon', value: '8'},
  ];

  const _hoursData = [
    {label: '09:30', value: '1'},
    {label: '10:00', value: '2'},
    {label: '10:30', value: '3'},
    {label: '11:00', value: '4'},
    {label: '11:30', value: '5'},
    {label: '12:00', value: '6'},
    {label: '12:30', value: '7'},
    {label: '13:00', value: '8'},
  ];

  const _today = moment(new Date()).format('YYYY-MM-DD');
  const _lastDay = moment(new Date()).add(14, 'day').format('YYYY-MM-DD');
  const [_hour, setHour] = useState('Choose time');
  const [_selectedDate, setSelectedDate] = useState('');
  const [_chosenBarber, setChosenBarber] = useState('Choose barber');

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
    setChosenBarber(item.label);
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
      await newOrder(_chosenBarber, _selectedDate, _hour);
      alert('Your chosen appointment is scheduled');
      console.log(
        'Your chosen appointment is: ',
        _chosenBarber,
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
            onDayPress={dayPress}
            markedDates={{
              [_selectedDate]: {
                selected: true,
                selectedColor: '#E5C492',
                selectedTextColor: 'black',
              },
              ...dates,
              ...disabled,
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
          data={_hoursData}
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
        onPress={OnBtnPress}>
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
    color: 'black',
    bold: 'true',
  },

  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    bold: 'true',
    backgroundColor: 'black',
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
