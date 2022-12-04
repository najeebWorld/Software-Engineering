import firestore from '@react-native-firebase/firestore';

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
    // console.log(x);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
