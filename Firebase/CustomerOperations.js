import firestore from "@react-native-firebase/firestore";

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
    await fetch("http://10.0.2.2:8080/api/user", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: uId,
        userName: uName,
        userEmail: uEmail,
        userPhone: uPhone,
      }),  
    });
  }catch(error){
    alert(error.message);
  }
    
};

/**
 * function for retreiveing user from the DB, by the user ID.
 * @param {*} uid
 * @returns
 */
export const getUser = async (uid) => {
  try{
  const user = await fetch("http://10.0.2.2:8080/api/user/"+ uid+ {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }})
    return user.json();
  }catch(error){
    alert(error.message)
  }
  };


