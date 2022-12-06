import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import DaySelector from '../components/daySelector';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles';
import { updateBarberWorkingDays } from '../../Firebase/FirebaseOperations';

export default function WorkingDays({navigation}) {
  const _hoursData = [
    {label: '00:00', value: '1'},
    {label: '00:30', value: '2'},
    {label: '01:00', value: '3'},
    {label: '01:30', value: '4'},
    {label: '02:00', value: '5'},
    {label: '02:30', value: '6'},
    {label: '03:00', value: '7'},
    {label: '03:30', value: '8'},
    {label: '04:00', value: '9'},
    {label: '04:30', value: '10'},
    {label: '05:00', value: '11'},
    {label: '05:30', value: '12'},
    {label: '06:00', value: '13'},
    {label: '06:30', value: '14'},
    {label: '07:00', value: '15'},
    {label: '07:30', value: '16'},
    {label: '08:00', value: '17'},
    {label: '08:30', value: '18'},
    {label: '09:00', value: '19'},
    {label: '09:30', value: '20'},
    {label: '10:00', value: '21'},
    {label: '10:30', value: '22'},
    {label: '11:00', value: '23'},
    {label: '11:30', value: '24'},
    {label: '12:00', value: '25'},
    {label: '12:30', value: '26'},
    {label: '13:00', value: '27'},
    {label: '13:30', value: '28'},
    {label: '14:00', value: '29'},
    {label: '14:30', value: '30'},
    {label: '15:00', value: '31'},
    {label: '15:30', value: '32'},
    {label: '16:00', value: '33'},
    {label: '16:30', value: '34'},
    {label: '17:00', value: '35'},
    {label: '17:30', value: '36'},
    {label: '18:00', value: '37'},
    {label: '18:30', value: '38'},
    {label: '19:00', value: '39'},
    {label: '19:30', value: '40'},
    {label: '20:00', value: '41'},
    {label: '20:30', value: '42'},
    {label: '21:00', value: '43'},
    {label: '21:30', value: '44'},
    {label: '22:00', value: '45'},
    {label: '22:30', value: '46'},
    {label: '23:00', value: '47'},
    {label: '23:30', value: '48'},
  ];

  const _intervalData = [
    {label: '5 min', value: '1'},
    {label: '10 min', value: '2'},
    {label: '15 min', value: '3'},
    {label: '20 min', value: '4'},
    {label: '25 min', value: '5'},
    {label: '30 min', value: '6'},
    {label: '35 min', value: '7'},
    {label: '40 min', value: '8'},
    {label: '45 min', value: '9'},
    {label: '50 min', value: '10'},
    {label: '55 min', value: '11'},
    {label: '60 min', value: '12'},
    {label: '65 min', value: '13'},
    {label: '70 min', value: '14'},
    {label: '75 min', value: '15'},
    {label: '85 min', value: '16'},
    {label: '90 min', value: '17'},
    {label: '95 min', value: '18'},
    {label: '100 min', value: '19'},
    {label: '105 min', value: '20'},
    {label: '110 min', value: '21'},
    {label: '115 min', value: '22'},
    {label: '120 min', value: '23'},
  ];

  const weekDays = {
    Sun: false,
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
  };

  const [_startTime, setStartTime] = useState('09:00');
  const [_endTime, setEndTime] = useState('17:00');
  const [_duration, setDuration] = useState('20 min');
  const [_weekDays, setWeekDays] = useState(weekDays);

  const generateAppointments = (days, startTime, endTime, duration) => {
    const appointments = {};
    for (day of days) {
      appointments[day] = generateHours(startTime, endTime, duration);
    }
    return appointments;
  };

  const generateHours = (startTime, endTime, duration) => {
    date = new Date();
    date.setHours(startTime.split(':')[0]);
    date.setMinutes(startTime.split(':')[1]);
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    const interval = parseInt(duration.split(' ')[0]);
    return fillHours(date, start, end, interval);
  };
  /**
   * This function fills an array full of hours according to an interval lets say
   * start = 12:00 end = 13:00 and interval = 20
   * we woulf return [13:00, 13:20, 13:40]
   * @param {*} date
   * @param {*} start
   * @param {*} end
   * @param {*} interval
   * @returns
   */
  const fillHours = (date, start, end, interval) => {
    const appointmentHours = [];
    let minutes;
    let hours;
    const iterations = (end - start) * (60 / interval);
    for (let i = 0; i < iterations; i++) {
      hours =
        parseInt(date.getHours() / 10) === 0
          ? `0${date.getHours()}`
          : date.getHours();
      minutes =
        parseInt(date.getMinutes() / 10) === 0
          ? `0${date.getMinutes()}`
          : date.getMinutes();
      appointmentHours.push(`${hours}:${minutes}`);
      date.setMinutes(date.getMinutes() + interval);
    }
    return appointmentHours;
  };

  const changeOnDropDownStart = item => {
    setStartTime(item.label);
  };

  const changeOnDropDownEnd = item => {
    setEndTime(item.label);
  };

  const changeOnDropDownDuration = item => {
    setDuration(item.label);
  };

  const OnBtnPress = async () => {
    const workingDays = [];
    for (i of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) {
      if (_weekDays[i]) {
        workingDays.push(i);
      }
    }
    const appointments = generateAppointments(
      workingDays,
      _startTime,
      _endTime,
      _duration,
    );
    console.log(appointments);
    await updateBarberWorkingDays(appointments)
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/chooseworkingdays.png')}
        style={styles.chooseDateContainer}
      />
      <DaySelector setWeekDays={setWeekDays} />
      <Image
        source={require('../assets/chooseworkinghours.png')}
        style={styles.chooseDateContainer}
      />
      <View style={{flexDirection: 'row', marginRight: 10, marginTop: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black', marginRight: 125}}>
          FROM
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>TO</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
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
      <View style={{marginRight: '38.5%'}}>
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
      <TouchableOpacity style={styles.btn} onPress={OnBtnPress}>
        <Text style={styles.text}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
