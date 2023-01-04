import user from "./User";
import { getBarber } from "./BarberOperations";
import { getCustomer } from "./CustomerOperations";
import { getMessage,postMessage } from "./Utils";

/**
 * Creates a new order in the Orders collection.
 * @param {*} _chosenBarber
 * @param {*} _selectedDate
 * @param {*} _hour
 */
export const newOrder = async (_chosenBarber, _selectedDate, _hour) => {
  const body = {
    customerId: user.userID(),
    barberId: _chosenBarber,
    orderDate: _selectedDate,
    orderHour: _hour,
    customerName: (await getCustomer(user.userID())).userName,
    barberName: (await getBarber(_chosenBarber)).userName,
  };
  postMessage('order',body)
  return true;
};

export const getBarberOrders = async (uid) => {
  const res = await getMessage(`orderByBarber/${uid}`);
  return res;
};

/**
 * Returns all customer orders that are valid
 * @param {} uid
 * @returns
 */
export const getCustomerOrders = async (uid) => {
  const res = await getMessage(`orderCustomer/${uid}`);
  return res;
};

export const getAvailableAppointments = async (date, barberId) => {
  const res = await getMessage(`availableAppointments/${barberId}/${date}`);
  return res;
};

export const deleteOrder = async (barberId, date, time, key) => {
  const body = {
    barberId: barberId,
    date: date,
    time: time,
    key: key 
  };
  await postMessage('deleteOrder',body);
};

