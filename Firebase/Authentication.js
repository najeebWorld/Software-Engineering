/**
 * This file conains all the Firebase authenticate Operations,
 * See setup documention in: https://rnfirebase.io/
 * Auth documentation in: https://rnfirebase.io/auth/usage
 * */

import auth from "@react-native-firebase/auth";
import { getCustomer, newCustomer } from "./CustomerOperations";
import { newBarber } from "./BarberOperations";
import user from "./User";
import { getCustomerOrders } from "./OrderOperations";

/**
 *
 * @param {*} userEmail
 * @param {*} userPassword
 */
export const authenticate = async (userEmail, userPassword) => {
  const uid = (
    await auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .catch((error) => {
        alert(
          `Wrong username / Password (user doesn't exists), Try again. ${error}`
        );
      })
  ).user.uid;
  user.userID(uid);
  const customer = await getCustomer(uid).catch(()=>{return null});
  if (customer) {
    user.setCustomer("Customer");
    user.userAppointments(await getCustomerOrders(uid));
  } else {
    user.setCustomer("Barber");
  }
};

export const customerSignUp = async (uName, uEmail, uPassword, uPhone) => {
  await auth()
    .createUserWithEmailAndPassword(uEmail, uPassword)
    .catch((error) => {
      throw Error(`Sign up failed, error: ${error}`);
    })
    .then(async (authData) => {
      await newCustomer(authData.user.uid, uName, uEmail, uPassword, uPhone);
    });
};

export const barberSignUp = async (uName, uEmail, uPassword, uPhone) => {
  await auth()
    .createUserWithEmailAndPassword(uEmail, uPassword)
    .catch((error) => {
      throw Error(`Sign up failed, error: ${error}`);
    })
    .then(async (authData) => {
      await newBarber(authData.user.uid, uName, uEmail, uPhone);
    });
};

export const signOut = async () => {
  if (user.userID()) {
    await auth.signOut().catch((err) => console.log(err));
  }
};
