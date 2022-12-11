import React, { useState, Fragment } from "react";
import { Agenda } from "react-native-calendars";
import * as _React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import { getBarberOrders } from "../../Firebase/OrderOperations";
import user from "../../Firebase/User";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

/*
TODO: 1.sort the hours on the calendar
*/

export default function CalendarPage({ navigation }) {
  const _today = moment(new Date()).format("YYYY-MM-DD");
  const _lastDay = moment(new Date()).add(14, "day").format("YYYY-MM-DD");
  const [_selectedDate, setSelectedDate] = useState(_today);
  const [_chosenQueue, setChosenBarber] = useState("false");
  const [_days, setDays] = useState([]);

  const removeBlueStyle = () => {
    const day = _today.split("-")[2];
    const year = _today.split("-")[0];
    let dates = {};
    for (let i = 1; i < 13; i++) {
      const currDate =
        `${year}-${i}-${day}` === _selectedDate ? "" : `${year}-${i}-${day}`;
      const currDateNext = `2023-${i}-${day}`;
      if (currDate === "") continue;
      if (currDate > _lastDay) {
        dates[[currDate]] = {
          selectedColor: "white",
          selectedTextColor: "lightgrey",
        };
        dates[[currDateNext]] = {
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

  const OnBtnPress = () => {
    navigation.navigate("WorkingDays");
  };

  let DISABLED_DAYS = ["Saturday"];

  const getDaysInMonth = (month, year, days) => {
    let pivot = moment().month(month).year(year).startOf("month");
    const end = moment().month(month).year(year).endOf("month");

    let dates = {};
    const disabled = { disabled: true };
    while (pivot.isBefore(end)) {
      days.forEach((day) => {
        dates[pivot.day(day).format("YYYY-MM-DD")] = disabled;
      });
      pivot.add(7, "days");
    }

    return dates;
  };

  const disabled = getDaysInMonth(
    moment().month(),
    moment().year(),
    DISABLED_DAYS
  );

  const [appointments, setAppointments] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      let days = [];
      const getBarberOrders_ = async () => {
        const app = await getBarberOrders(user.userID());

        Object.values(app).forEach((appint) => {
          if (!days.includes(appint.date)) {
            days.push(appint.date);
          }
        });
        setDays(days);
        let parseAppointment = {};
        _days.forEach((date) => {
          const currApp = generateApointments(date, app);
          parseAppointment = { ...parseAppointment, ...currApp };
        });
        console.log("parseAppointment:", parseAppointment);
        setAppointments(parseAppointment);
      };
      getBarberOrders_().catch((err) => alert(err));
    }, [_chosenQueue])
  );

  useFocusEffect(
    React.useCallback(() => {
      let days = [];
      const getBarberOrders_ = async () => {
        const app = await getBarberOrders(user.userID());

        Object.values(app).forEach((appint) => {
          if (!days.includes(appint.date)) {
            days.push(appint.date);
          }
        });
        setDays(days);
        let parseAppointment = {};
        _days.forEach((date) => {
          const currApp = generateApointments(date, app);
          parseAppointment = { ...parseAppointment, ...currApp };
        });
        console.log("parseAppointment:", parseAppointment);
        setAppointments(parseAppointment);
      };
      getBarberOrders_().catch((err) => alert(err));
    }, [])
  );
  function generateApointments(date, appointments) {
    if (appointments.date === date) {
      appointments[appointment.date].push(appointment);
    }
    return {
      [date]: Object.keys(appointments)
        .filter((app) => appointments[app].date === date)
        .map((appointment) => ({
          info: appointments[appointment].extra_info,
          time: appointments[appointment].time,
          cus_id: appointments[appointment].Customer_id,
          name: appointments[appointment].cus_name,
          orderKey: appointment,
          date: appointments[appointment].date,
        })),
    };
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
            renderItem={(item) => {
              console.log("name", item.name);
              if (item.name) {
                var l = item.name.toString().toUpperCase().charAt(0);
              }
              return (
                <TouchableOpacity
                  style={styles.item_Agenda}
                  onPress={() => {
                    navigation.navigate("OrderDetails", { item });
                  }}
                >
                  <Text style={styles.itemText_Agenda}>
                    Scheduled appointment at: {item.time}, {item.name}
                  </Text>
                  <Avatar.Text label={l} style={styles.avatar} size={32} />
                </TouchableOpacity>
              );
            }}
            style={{ borderRadius: 10 }}
            renderEmptyData={() => {
              return <Text></Text>;
            }}
            theme={{
              agendaDayTextColor: "#888",
              agendaDayNumColor: "#E5C492",
              agendaTodayColor: "#E5C492",
              agendaKnobColor: "#E5C492",
            }}
            onDayPress={() => {
              setChosenBarber(!_chosenQueue);
            }}
          />
        </Fragment>
      </SafeAreaView>

      <TouchableOpacity style={styles.btn} onPress={OnBtnPress}>
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
    borderColor: "#8D5238",
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
    backgroundColor: "black",
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
    marginTop: 40,
    backgroundColor: "#000000",
  },

  text: {
    color: "white",
  },

  CalContainer: {
    marginTop: 50,
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
  },

  container_Agenda: {
    marginTop: 50,
    borderWidth: 4,
    borderColor: "#8D5238",
    borderRadius: 10,
    flex: 1,
    maxHeight: 350,
    width: 300,
    justifyContent: "center",
  },
  item_Agenda: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText_Agenda: {
    color: "#888",
    fontSize: 16,
  },
  avatar: {
    color: "#E5C492",
  },
});
