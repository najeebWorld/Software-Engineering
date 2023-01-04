/**
 * This file conains all the Firebase authenticate Operations,
 * See setup documention in: https://rnfirebase.io/
 * Auth documentation in: https://rnfirebase.io/auth/usage
 * */

import { getCustomer, newCustomer } from "./CustomerOperations";
import { newBarber } from "./BarberOperations";
import user from "./User";
import { getCustomerOrders } from "./OrderOperations";
import { postMessage } from "./Utils";

/**
 *
 * @param {*} userEmail
 * @param {*} userPassword
 */

const setUserType = async (uid) => {
  const customer = await getCustomer(uid);
  if (customer) {
    user.setCustomer("Customer");
    user.userAppointments(await getCustomerOrders(uid));
  } else {
    user.setCustomer("Barber");
  }
};

export const authenticate = async (userEmail, userPassword) => {
  const uid = await postMessage("auth", {
    userEmail: userEmail,
    userPassword: userPassword,
  });
  user.userID(uid);
  await setUserType(uid);
};

export const signUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await postMessage("signup", {
    uName: uName,
    uEmail: uEmail,
    uPassword: uPassword,
    uPhone: uPhone,
  });
  return uid;
};

export const customerSignUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await signUp(uName, uEmail, uPassword, uPhone);
  await newCustomer(uid, uName, uEmail, uPassword, uPhone);
};

export const barberSignUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await signUp(uName, uEmail, uPassword, uPhone);
  await newBarber(uid, uName, uEmail, uPassword, uPhone);
};
