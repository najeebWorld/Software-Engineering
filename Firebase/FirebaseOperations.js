import firestore from '@react-native-firebase/firestore';
import { signUp } from './auth';



export const newClient = async (uId, uName, uEmail, uPassword, uPhone) => {
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


export const newOrder = async (_chosenBarber, _selectedDate, _hour) => {
  try {
    await firestore()
      .collection('Orders')
      .add({
        Barber_id: _chosenBarber,
        day: _selectedDate,
        hour: _hour,
      })
      .then(() => {
        console.log('Success!');
      });
    console.log(x);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getUser = async (uid) => {
    const userData =  (await firestore().collection('Users').doc(uid).get().catch((err)=>{alert(err)}))
    return userData._data;
}
