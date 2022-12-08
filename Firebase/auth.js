/**
 * This file conains all the Firebase authenticate Operations, 
 * See setup documention in: https://rnfirebase.io/
 * Auth documentation in: https://rnfirebase.io/auth/usage
 * */

import auth from '@react-native-firebase/auth';
import { getUser, newBarber, newUser } from './FirebaseOperations';
import user from './User';
import { getCustomerOrders } from './FirebaseOperations';

/**
 * 
 * @param {*} userEmail 
 * @param {*} userPassword 
 */

export const authenticate = async (userEmail, userPassword) => {
    await auth().signOut();
    const uid = (await auth().signInWithEmailAndPassword(userEmail, userPassword).catch(error => {
        alert(`Wrong username / Password (user doesn't exists), Try again. ${error}`)
    })).user.uid ;
    user.userID(uid);
    const customer = await getUser(uid).catch(err=>alert(err));
    if(customer){
        user.setCustomer(true);
        user.userAppointments(await getCustomerOrders(uid));
    }else{
        user.setCustomer(false);
    }
};

export const customerSignUp = async (uName, uEmail, uPassword, uPhone) => {
    await auth().createUserWithEmailAndPassword(uEmail, uPassword).catch(error => {
        throw Error("Sign up failed, error:" ,error)
    }).then(async (authData) => {
        await newUser(authData.user.uid, uName, uEmail, uPassword, uPhone)});
};

export const barberSignUp = async (uName, uEmail, uPassword, uPhone) => {
    await auth().createUserWithEmailAndPassword(uEmail, uPassword).catch(error => {
        throw Error("Sign up failed, error:" ,error)
    }).then(async (authData) => {
        await newBarber(authData.user.uid, uName, uEmail, uPassword, uPhone)});
};

