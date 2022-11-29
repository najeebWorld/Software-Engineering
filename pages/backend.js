
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

// let conformation

// export const signupSendPhoneAuth = async (phone) => {
//     conformation = await auth().signInWithPhoneNumber(`+972${phone}`)
//     console.log('backend', conformation);

// }


// export const signupAndVerify = async (fullName, phone, email, password, code) => {
//     // confirm phone
//     const result = await conformation.confirm('12345')
//     // save user data in the firestore 
//     const data = await firestore().collection('users').add({ fullName, phone, gender, email, code, password })
// }


export const signup = async (fullName, phone, email, password, gender) => {
    console.log('backend', email, password);
    // check if email exists
    await auth().createUserWithEmailAndPassword(email, password)
    await firestore().collection('users').add({ fullName, phone, gender, email, password, type: 'customer' })
}


export const login = async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password)
}















