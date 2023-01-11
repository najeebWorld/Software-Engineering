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
  try{
     const user = await getMessage(`user/${uid}`);
     return user;
  }catch{
    return null;
  }
};

export const newReview = async (uId, _chosenBarber, _barberId, _review, rate, bool) => {
  var body = {};
  console.log("await getCustomer(uId)", await getCustomer(uId));

  var name = await getCustomer(uId)
  
  
  if (bool) { 
    body = {
      userId: uId,
      userName: name.userName,
      barberId: _barberId,
      review: _review,
      rate: rate,
    };
  } else {
    body = {
      userId: uId,
      userName: "",
      barberId: _barberId,
      review: _review,
      rate: rate,
    };
  }

  await postMessage(`barber/${_barberId}/reviews`, body);
};
