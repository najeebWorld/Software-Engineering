import firestore from "@react-native-firebase/firestore";
import user from "./User";
import moment from "moment";
import { getBarber } from "./BarberOperations";
import { getUser } from "./CustomerOperations";
import { getMessage,postMessage } from "./Utils";

/**
 * Creates a new order in the Orders collection.
 * @param {*} _chosenBarber
 * @param {*} _selectedDate
 * @param {*} _hour
 */
export const newOrder = async (_chosenBarber, _selectedDate, _hour) => {
  await fetch("http://10.0.2.2:8080/api/order",{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: user.userID(),
      barberId: _chosenBarber,
      orderDate: _selectedDate,
      orderHour: _hour,
      costumerName: (await getUser(user.userID())).userName,
      barberName:(await getBarber(_chosenBarber)).userName
    }),
  });
};

export const getBarberOrders = async (uid) => {
  const res = await getMessage(`/orderByBarber/${uid}`);
  return res;
};

/**
 * Returns all customer orders that are valid
 * @param {} uid
 * @returns
 */
export const getCustomerOrders = async (uid) => {
  const res = await getMessage(`/orderCustomer/${uid}`);
  return res;
};

export const getAvailableAppointments = async (date, barberId) => {
  const res = await getMessage(`/availableAppointments/${barberId}/${date}`);
  return res;
  // const unAvailableOrders = [];
  // await firestore()
  //   .collection("Orders")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((documentSnapshot) => {
  //       const onDate = documentSnapshot.data().date === date;
  //       const isBarbers = documentSnapshot.data().Barber_id === barberId;
  //       if (onDate && isBarbers) {
  //         unAvailableOrders.push(documentSnapshot.data().time);
  //       }
  //     });
  //   })
  //   .catch((err) => alert(err));
  // const availableHours = [];
  // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const day = days[new Date(date).getDay()];
  // const barber = await getBarber(barberId).catch((err) => {
  //   alert(err);
  // });
  // const workingHours = barber.availableWorkHours[day];
  // if (workingHours) {
  //   for (let i = 0; i < workingHours.length; i++) {
  //     if (!unAvailableOrders.includes(workingHours[i])) {
  //       availableHours.push(workingHours[i]);
  //     }
  //   }
  //   return availableHours;
  // } else {
  //   return [];
  // }
};

export const deleteOrder = async (barberId, date, time, key) => {
  const body = {
    barberId: barberId,
    date: date,
    time: time,
    key: key 
  };
  const res = postMessage('/deleteOrder/',body);
};

