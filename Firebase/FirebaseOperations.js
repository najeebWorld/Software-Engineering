/**
 * This file conains all the Firebase operations functions, 
 * See setup documention in: https://rnfirebase.io/
 * Auth documentation in: https://rnfirebase.io/auth/usage
 * Functions documentation: https://rnfirebase.io/firestore/usage
 */
import { getOuterBindingIdentifiers } from '@babel/types';
import firestore from '@react-native-firebase/firestore';
import { signUp } from './auth';
import user from './User'
import moment from 'moment';


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
      }).then(()=>{
        console.log("Client ", uId, " added successfully.")
      })
  }catch(error){
    alert(`Adding Client failed, Error message: ${error}`)
  }
}

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
  try{
    await firestore()
      .collection('Barbers').doc(uId).set({
        userId: uId,
        userName: uName,
        userEmail: uEmail,
        userPhone: uPhone,
        firstEntry: true
      }).then(()=>{
        console.log("Client ", uId, " added successfully.")
      })
  }catch(error){
    alert(`Adding Client failed, Error message: ${error}`)
  }
}

export const updateBarberWorkingDays = async (WorkingDays) =>{
  try{
    const uid = user.userID();
    await firestore().collection('Barbers').doc(uid).update({
      availableWorkHours: WorkingDays,
    }).then(()=>{console.log('Barber N.',uid,' appointments updated!');})
  }catch(error){
    alert(`updating barber workingDays failed, Error message:${error}`)
  }
}

/**
 * ---- Uncomplete ----
 * ---- ToDo: change the parameters to the right ones:
 *                a. barberID.
 *                B. clientID.
 *                c. Date (as the date argument of firebase / defined string that we chose).
 *                d. Extra Info (haircut style). 
 * @param {*} _chosenBarber 
 * @param {*} _selectedDate 
 * @param {*} _hour 
 */
export const newOrder = async (_chosenBarber, _selectedDate, _hour) => {
  try {
    console.log('Order Details: ',_chosenBarber,', ',_selectedDate,_hour)
    await firestore()
      .collection('Orders')
      .add({
        Barber_id: _chosenBarber,
        Customer_id: user.userID(),
        date: _selectedDate,
        time: _hour,
        extra_info: ""
      })
      .then(() => {
        console.log('Success!');
      });
  } catch (e) {
    console.error(`Error adding document: ${e}`);
  }
};

/**
 * function for retreiveing user from the DB, by the user ID.
 * @param {*} uid 
 * @returns 
 */
export const getUser = async (uid) => {
    const userData =  (await firestore().collection('Users').doc(uid).get().catch((err)=>{throw Error(err)}))
    return userData._data;
}

export const getBarber = async (uid) => {
  const userData =  (await firestore().collection('Barbers').doc(uid).get().catch((err)=>{throw Error(err)}))
  return userData._data;
}


export const findAllExpieredOrders = async ()=>{
  const expOrders = await firestore().collection('Orders').where("Order_Date", "<=", firestore.Timestamp);
  for(order in expOrders){
    console.log('--- --- --- ---')
    console.log(order.toString())
  }
}

export const isFirstEntry = async (uid) =>{
  const user = await getBarber(uid);
  return (user.firstEntry)
}

export const updateFirstEntry = async (uid) =>{
  await firestore().collection('Barbers').doc(uid).update({
    firstEntry: false,
  }).then(()=>{console.log('Barber N.',uid,' First entry updated!');})
}

/**
 * Returns all customer orders that are valid
 * @param {} uid 
 * @returns 
 */
export const getCustomerOrders = async (uid) =>{
  let orders = {};
  await firestore()
        .collection('Orders')
        .get().
        then( querySnapshot => {
                querySnapshot.forEach( documentSnapshot => {
                  const isActive = documentSnapshot.data().date >= moment(new Date()).format('YYYY-MM-DD');
                  const isUsersOrder = documentSnapshot.data().Customer_id === uid;
                  if(isActive && isUsersOrder){
                      orders[documentSnapshot.id]=documentSnapshot.data()
                  }
                 })})
                  .catch(err => {alert(`error while retriving from database: ${err}`)});
  return orders;
}

export const getAvailableAppointments = async (date, barberId) => {
  const unAvailableOrders = [];
  await firestore().collection('Orders').get()
  .then( querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      const onDate = documentSnapshot.data().date === date;
      const isBarbers = documentSnapshot.data().Barber_id === barberId;
      if(onDate && isBarbers){
        unAvailableOrders.push(documentSnapshot.data().time);
      }
    } )
  }).catch(err => alert(err))
  const availableHours = [];
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const day =  days[new Date(date).getDay()];
  const barber = await getBarber(barberId).catch(err=>{alert(err)});
  const workingHours = barber.availableWorkHours[day];
  if(workingHours){
    for(let i = 0;i<workingHours.length; i++){
      if(!unAvailableOrders.includes(workingHours[i])){
        availableHours.push(workingHours[i]);
      }
    }
    console.log('id',barberId,'available', availableHours);
    return availableHours;
  }else{
    return [];
  }
}
