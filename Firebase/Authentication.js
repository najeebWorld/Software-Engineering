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
  console.log("Customer", customer);
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
  }).catch((err) => {});
  if (uid.error) {
    alert(uid.error);
    return uid.error;
  } else {
    user.userID(uid);
    await setUserType(uid).catch((err) => {
      alert(err);
    });
  }
};

export const signUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await postMessage("signup", {
    uName: uName,
    uEmail: uEmail,
    uPassword: uPassword,
    uPhone: uPhone,
  });
  if (uid.error) {
    throw new Error("Email is already in use...");
  }
  return uid;
};

export const customerSignUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await signUp(uName, uEmail, uPassword, uPhone);
  await newCustomer(uid, uName, uEmail, uPhone);
};

export const barberSignUp = async (uName, uEmail, uPassword, uPhone) => {
  const uid = await signUp(uName, uEmail, uPassword, uPhone);
  await newBarber(uid, uName, uEmail, uPhone);
};
