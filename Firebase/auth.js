import auth from '@react-native-firebase/auth';

export const authenticate = async (userEmail, userPassword) => {
    const uid = await auth().signInWithEmailAndPassword(userEmail, userPassword).catch(error => {
        alert("Wrong username / Password (user doesn't exists), Try again.")
    }) ;
    return uid;
};

export const signUp = async (userEmail, userPassword) => {
    const uid = await auth().signInWithEmailAndPassword(userEmail, userPassword).catch(error => {
        alert("Wrong username / Password (user doesn't exists), Try again.")
    }) ;
    return uid;
};
