import auth from '@react-native-firebase/auth';
import { newClient } from './FirebaseOperations';
import user from './User';

export const authenticate = async (userEmail, userPassword) => {
    const uid = (await auth().signInWithEmailAndPassword(userEmail, userPassword).catch(error => {
        alert("Wrong username / Password (user doesn't exists), Try again.")
    })).user.uid ;
    user.userID(uid);
    await auth().signOut();
};

export const customerSignUp = async (uName, uEmail, uPassword, uPhone) => {
    await auth().createUserWithEmailAndPassword(uEmail, uPassword).catch(error => {
        throw Error("Sign up failed, error:" ,error)
    }).then(async (authData) => {
        await newClient(authData.user.uid, uName, uEmail, uPassword, uPhone)});
};

export const barberSignUp = async (uName, uEmail, uPassword, uPhone) => {
    await auth().createUserWithEmailAndPassword(uEmail, uPassword).catch(error => {
        throw Error("Sign up failed, error:" ,error)
    }).then(async (authData) => {
        await newClient(authData.user.uid, uName, uEmail, uPassword, uPhone)});
};

