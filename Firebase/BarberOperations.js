import user from "./User";
import {postMessage, getMessage} from "./Utils"


/**
 * Function to add new Client (user) to the User collection on firebase.
 *          this function is called from 'auth/customerSignUp' function.
 * @param {*} uId - user ID that firebase authentication retrevies.
 * @param {*} uName - user name (as the user inputs in the signup page).
 * @param {*} uEmail - user email (as the user inputs in the signup page).
 * @param {*} uPhone -user phone number (as the user inputs in the signup page).
 */

export const newBarber = async (uId, uName, uEmail, uPhone) => {
  const body = {
        userId: uId,
        userName: uName,
        userEmail: uEmail,
        userPhone: uPhone,
        firstEntry: true,
        reviews: [],
  }
  await postMessage(`barber`, body);
};

export const updateBarberWorkingDays = async (newWorkingDays) => {
  await postMessage(`barber/${user.userID()}/workdays`, newWorkingDays);
};

export const updateBarberAddress = async (address, info) => {
  const body = {
    BarberAddress: address,
    BarberInfo: info
  }
  await postMessage(`barber/${user.userID()}/address`, body);
};

export const getBarberWorkingDays = async (uid) => {

  const res = await getMessage(`barber/${uid}/workdays`);
  return res;

};

export const getBarber = async (uid) => {
  const res = await getMessage(`barber/${uid}`);
  return res;
};

export const isFirstEntry = async (uid) => {
  const user = await getBarber(uid);
  if(user){
    return user.firstEntry;
  }else{
    console.log('firstEntry is null');
    return null;
  }

};

export const updateFirstEntry = async (uid) => {
  await postMessage(`barber/${uid}/firstentry`, {});
};

export const getBarberList = async () => {
  
  const res = await getMessage(`barbers`);
  return res;
};

export const getBarbersData = async () => {
  
  const res = await getMessage(`barbersdata`);
  return res;
};
