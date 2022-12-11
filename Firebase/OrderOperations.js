import firestore from '@react-native-firebase/firestore';
import user from './User'
import moment from 'moment';
import { getBarber } from './BarberOperations';
import { getUser } from './CustomerOperations'

/**
 * Creates a new order in the Orders collection.
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
          extra_info: "",
          cus_name: (await getUser(user.userID())).userName,
        })
        .then(() => {
          console.log('Success!');
        });
    } catch (e) {
      console.error(`Error adding document: ${e}`);
    }
  };
  
  export const getBarberOrders = async (uid) =>{
    let orders = {};
    await firestore()
          .collection('Orders')
          .get().
          then( querySnapshot => {
                  querySnapshot.forEach( documentSnapshot => {
                    const isActive = documentSnapshot.data().date >= moment(new Date()).format('YYYY-MM-DD');
                    const isUsersOrder = documentSnapshot.data().Barber_id === uid;
                    if(isActive && isUsersOrder){
                        orders[documentSnapshot.id]=documentSnapshot.data();
                    }
                   })})
                    .catch(err => {alert(`error while retriving from database: ${err}`)});
    return orders;
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

  export const deleteOrder = async (barberId,date,time,key) => {
    if(barberId&&date&&time&&key){
      await firestore()
            .collection('Orders')
            .doc(key)
            .delete()
            .then(()=>{
              console.log('Order deleted!')
            }).catch(err=>alert(err))
    }
  }