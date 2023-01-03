import firestore from "@react-native-firebase/firestore";
import { getMessage, postMessage } from "./Utils";
/**
 * Function to add new Client (user) to the User collection on firebase.
 *          this function is called from 'auth/customerSignUp' function.
 * @param {*} uId - user ID that firebase authentication retrevies.
 * @param {*} uName - user name (as the user inputs in the signup page).
 * @param {*} uEmail - user email (as the user inputs in the signup page).
 * @param {*} uPassword - user password (as the user inputs in the signup page).
 * @param {*} uPhone -user phone number (as the user inputs in the signup page).
 */
export const newCustomer = async (uId, uName, uEmail, uPhone) => {
  const body = {
    userId: uId,
    userName: uName,
    userEmail: uEmail,
    userPhone: uPhone,
  };

  await postMessage("user", body);
};

/**
 * function for retreiveing user from the DB, by the user ID.
 * @param {*} uid
 * @returns
 */
export const getCustomer = async (uid) => {
  const user = await getMessage(`user/${uid}`);
  return user;
};
