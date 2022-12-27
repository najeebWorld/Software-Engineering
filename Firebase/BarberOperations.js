/**
 * This file conains all the Firebase operations functions,
 * See setup documention in: https://rnfirebase.io/
 * Auth documentation in: https://rnfirebase.io/auth/usage
 * Functions documentation: https://rnfirebase.io/firestore/usage
 */
import firestore from "@react-native-firebase/firestore";
import user from "./User";

/**
 * Function to add new Client (user) to the User collection on firebase.
 *          this function is called from 'auth/customerSignUp' function.
 * @param {*} uId - user ID that firebase authentication retrevies.
 * @param {*} uName - user name (as the user inputs in the signup page).
 * @param {*} uEmail - user email (as the user inputs in the signup page).
 * @param {*} uPassword - user password (as the user inputs in the signup page).
 * @param {*} uPhone -user phone number (as the user inputs in the signup page).
 */
 export const newBarber = async (uId, uName, uEmail, uPassword, uPhone) => {
  await fetch("http://10.0.2.2:8080/api/barber",{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: uId,
      userName: uName,
      userEmail: uEmail,
      userPhone: uPhone,
      firstEntry: true,
    }),
  });
};

export const updateBarberWorkingDays = async (WorkingDays) => {
  try {
    const uid = user.userID();
    await firestore()
      .collection("Barbers")
      .doc(uid)
      .update({
        availableWorkHours: WorkingDays,
      })
      .then(() => {
        console.log("Barber N.", uid, " appointments updated!");
      });
  } catch (error) {
    alert(`updating barber workingDays failed, Error message:${error}`);
  }
};

export const getBarberWorkingDays = async (uid) => {
  var ans = [];
  try {
    await firestore()
      .collection("Barbers")
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnapshot) => {
          if (docSnapshot.data().userId === uid) {
            ans = Object.keys(docSnapshot.data().availableWorkHours);
          }
        });
      });
  } catch (error) {
    alert(`get barber workingDays failed, Error message:${error}`);
  }

  let list = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
  let difference = list.filter((x) => !ans.includes(x));

  return difference;
};

export const getBarber = async (uid) => {
  const userData = await firestore()
    .collection("Barbers")
    .doc(uid)
    .get()
    .catch((err) => {
      throw Error(err);
    });
  return userData._data;
};

export const isFirstEntry = async (uid) => {
  const user = await getBarber(uid);
  return user.firstEntry;
};

export const updateFirstEntry = async (uid) => {
  await firestore()
    .collection("Barbers")
    .doc(uid)
    .update({
      firstEntry: false,
    })
    .then(() => {
      console.log("Barber N.", uid, " First entry updated!");
    });
};

export const getBarberList = async () => {
  let barbers = [];
  await firestore()
    .collection("Barbers")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        const uid = documentSnapshot.data().userId;
        const name = documentSnapshot.data().userName;
        barbers.push({ label: name, value: uid });
      });
    })
    .catch((err) => {
      alert(`error while getting barbers list ${err}`);
    });
  return barbers;
};
