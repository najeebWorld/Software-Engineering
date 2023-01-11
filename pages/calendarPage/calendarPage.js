import React, { useState, Fragment, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Popup from '../components/Popup';
import moment from "moment";

import {
  getBarberList,
  getBarberWorkingDays,
} from "../../Firebase/BarberOperations";
import {
  newOrder,
  getCustomerOrders,
  getAvailableAppointments,
  addOrderToWaitlist,
} from "../../Firebase/OrderOperations";
import user from "../../Firebase/User";
import { useFocusEffect } from "@react-navigation/native";

export default function CalendarPage({  navigation, route }) {
  const _today = moment(new Date()).format("YYYY-MM-DD");
  let _now = moment(new Date()).add(2, "hours").format("HH:mm"); // Add 2 hour, gor the current time in Israel (GMT+2).
  const _lastDay = moment(new Date()).add(14, "day").format("YYYY-MM-DD");
  const [_hour, setHour] = useState("Choose time");
  const [_selectedDate, setSelectedDate] = useState(_today);
  const [_chosenBarber, setChosenBarber] = useState(
    route.params ? route.params.name : "Choose barber"
  );
  const [_barberData, SetBarberData] = useState([]);
  const [_barber_id, setBarberID] = useState(route.params ? route.params.id : "");
  const [_workHours, setWorkHours] = useState([]);
  const [_findBarbers, setFindBarbers] = useState(false);
  const [DISABLED_DAYS, setDISABLED_DAYS] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const getWorkDays = async () => {
      if (_barber_id) {
        const workHoursArr = await getAvailableAppointments(
          _selectedDate,
          _barber_id
        ).catch((err) => alert(err));

        const workHours = [];
        let counter = 1;
        workHoursArr.forEach((hour) => {
          if (_selectedDate == _today) {
            if (hour > _now) {
              workHours.push({ label: hour, value: counter++ });
            }
          } else {
            workHours.push({ label: hour, value: counter++ });
          }
        });

        setWorkHours(workHours);
        if (workHours.length === 0 && _barber_id) {
          setHour("Choose Time");
          alert("No available appointments on selected date");
        }
      }
    };
    getWorkDays().catch((err) => alert(err));
  }, [_barber_id, _selectedDate]);

  useFocusEffect(
    React.useCallback(() => {
      const getBarbers = async () => {
        const Barbers = await getBarberList();
        SetBarberData(Barbers);
      };
      getBarbers().catch((err) => alert(err));
    }, [])
  );

  const removeBlueStyle = () => {
    const day = _today.split("-")[2];
    const year = _today.split("-")[0];
    let dates = {};
    for (let i = 1; i < 13; i++) {
      const month = parseInt(i / 10) === 0 ? `0${i}` : i;
      const currDate =
        `${year}-${i}-${day}` === _selectedDate
          ? ""
          : `${year}-${month}-${day}`;
      const currDateNext = `2023-${month}-${day}`;
      dates[[currDateNext]] = {
        selectedColor: "white",
        selectedTextColor: "lightgrey",
      };
      if (currDate === "") continue;
      if (currDate > _lastDay) {
        dates[[currDate]] = {
          selectedColor: "white",
          selectedTextColor: "lightgrey",
        };
      } else {
        dates[[currDate]] = {
          selectedColor: "white",
          selectedTextColor: "black",
        };
      }
    }
    return dates;
  };

  const dates = removeBlueStyle();

  const changeOnDropDownBarber = async (item) => {
    setChosenBarber(item.label);
    setBarberID(item.value);
    const workingDays = await getBarberWorkingDays(item.value);
    setDisabled(getDaysInMonth(moment().month(), moment().year(), workingDays));
  };

  const getDaysInMonth = (month, year, days) => {
    let pivot = moment().month(month).year(year).startOf("month");
    const end = moment().month(month).year(year).endOf("month");

    let dates = {};
    const disabled = { disabled: true };
    while (pivot.isBefore(end)) {
      if (days) {
        days.forEach((day) => {
          dates[pivot.day(day).format("YYYY-MM-DD")] = disabled;
        });
        pivot.add(7, "days");
      }
    }

    return dates;
  };

  const changeOnDropDownHour = (item) => {
    setHour(item.label);
    console.log(item.label);
  };

  const dayPress = (day) => {
    if (day.dateString == _today) {
      let workHours = [];
      let counter = 1;
      _workHours.forEach((hour) => {
        if (hour.label > _now) {
          workHours.push({ label: hour.label, value: counter++ });
        }
      });
      setWorkHours(workHours);
    }
    setSelectedDate(day.dateString);
  };

  const OnBtnPress = async () => {
    if (
      _chosenBarber != "Choose barber" &&
      _selectedDate != "" &&
      _hour != "Choose time"
    ) {
      const id = await newOrder(_barber_id, _selectedDate, _hour);
      setOrderId(id);
      if (id) {
        setDisplayPopup(true);
      }
      console.log(
        "Your chosen appointment is: ",
        id,
        _barber_id,
        _selectedDate,
        _hour
      );
    } else {
      alert("please fill all fields");
    }
    user.userAppointments(await getCustomerOrders(user.userID()));
  };
  return (
    <View style={styles.container}>
      <Popup
        transparent={true}
        visible={displayPopup}
        headerText="Appointment Saved!"
        bodyText="Would you like us to notify you if an earlier appointment is
            canceled?"
        firstButtonText="Sure!"
        secondButtonText="No thanks."
        firstButtonOnClick={async () => {
          await addOrderToWaitlist(orderId);
          setDisplayPopup(false);
          navigation.navigate("MyAppointments");
        }}
        secondButtonOnClick={() => {
          setDisplayPopup(false);
          navigation.navigate("MyAppointments");
        }}
      />
      <Image
        source={require("../assets/choosedate.png")}
        style={styles.chooseDateContainer}
      />

      <View style={styles.CalContainer}>
        <Fragment>
          <Calendar
            hideExtraDays={true}
            initialDate={_today}
            minDate={_today}
            maxDate={_lastDay}
            disableAllTouchEventsForDisabledDays={true}
            style={{ borderRadius: 10 }}
            onDayPress={dayPress} //setSelectedDate(day.dateString)}
            markedDates={{
              ...dates,
              ...disabled,
              [_selectedDate]: {
                selected: true,
                selectedColor: "#E5C492",
                selectedTextColor: "black",
              },
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
        onPress={async () => {
          await OnBtnPress();
        }}
      >
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
    width: 250,
    margin: 10,
    height: 40,
    marginBottom: 0,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 3.0,
    borderColor: "#8D5238",
  },

  placeholderStyle: {
    fontSize: 15,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    color: "black",
    bold: "true",
  },

  selectedTextStyle: {
    fontSize: 15,
    color: "black",
    bold: "true",
    backgroundColor: "white",
    flex: 2,
    marginLeft: 95,
  },

  SecContainer: {
    flex: 1,
    paddingTop: 10,
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
    marginTop: 20,
    backgroundColor: "#000000",
  },

  text: {
    color: "white",
  },

  CalContainer: {
    borderWidth: 3.0,
    borderColor: "#8D5238",
    borderRadius: 10,
  },

  logoContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 50,
  },

  chooseDateContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 50,
    marginRight: 120,
  },

  downDropText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
