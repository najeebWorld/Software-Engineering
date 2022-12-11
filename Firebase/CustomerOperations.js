import firestore from '@react-native-firebase/firestore';

/**
 * Function to add new Client (user) to the User collection on firebase.
 *          this function is called from 'auth/customerSignUp' function.
 * @param {*} uId - user ID that firebase authentication retrevies.
 * @param {*} uName - user name (as the user inputs in the signup page).
 * @param {*} uEmail - user email (as the user inputs in the signup page).
 * @param {*} uPassword - user password (as the user inputs in the signup page).
 * @param {*} uPhone -user phone number (as the user inputs in the signup page).
 */
 export const newUser = async (uId, uName, uEmail, uPassword, uPhone) => {
    try{
      await firestore()
        .collection('Users').doc(uId).set({
          userId: uId,
          userName: uName,
          userEmail: uEmail,
          userPhone: uPhone
        }).then(() => {
          console.log("Client ", uId, " added successfully.")
        })
    }catch(error){
      alert(`Adding Client failed, Error message: ${error}`)
    }
  }

  /**
 * function for retreiveing user from the DB, by the user ID.
 * @param {*} uid 
 * @returns 
 */
export const getUser = async (uid) => {
    const user = (await firestore().collection('Users').doc(uid).get().catch(err => alert(err)));
    return user._data;
}


  