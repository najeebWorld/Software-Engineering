import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { getBarber, getBarbersData } from '../../Firebase/BarberOperations';
import { useFocusEffect } from "@react-navigation/native";
import user from "../../Firebase/User";
import { styles } from '../styles';


export default function CustomerMenu({ navigation }) {

    const [barberData, SetBarberData] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const getBarbers = async () => {
                const Barbers = await getBarbersData();
                SetBarberData(Barbers);
            };
            getBarbers().catch((err) => alert(err));
        }, [])
    );

    // const onPressProfile = async () => {

    //     var barber = await getBarber(user.userID());
    //     navigation.navigate("BarberProfile", { barber });
    // }

    const onPressCal = async () => {

        navigation.navigate("BarberCollection");
    }

    const onOvverallPress = () => {
        navigation.navigate("Reviews");
    };

    // const onTimePress = () => {
    //     navigation.navigate("calendarPage");
    // };

    const onAddressPress = () => {
        navigation.navigate("MyAppointments");
    };
    const onlogoutPress = () => {
        navigation.navigate("Login");

    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/logowithname.png")}
                style={styles.logoContainer}
            />
            <StatusBar style="auto" />
                <TouchableOpacity style={styles.btn} onPress={onPressCal}>
                    <Text style={styles.text}> All barbers </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={onOvverallPress}>
                    <Text style={styles.text}>Barber reviews</Text>
                </TouchableOpacity>

              

                <TouchableOpacity style={styles.btn} onPress={onAddressPress}>
                    <Text style={styles.text}>My appointments</Text>
                </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={onlogoutPress}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>

            </View>
        
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: StatusBar.currentHeight,

//     },
//     scrollView: {
//         backgroundColor: "#E5C492",
//         marginHorizontal: 20,
//         height: '100%',
//         color: "grey",
//     },


//     btn: {
//         width: '80%',
//         borderRadius: 25,
//         height: 50,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 80,
//         marginStart: 30,
//         backgroundColor: '#000000',
//     },
//     dayBtn: {
//         width: '80%',
//         borderRadius: 25,
//         height: 50,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//         marginStart: 30,
//         backgroundColor: '#000000',
//     },

//     little_btn: {
//         width: "80%",
//         borderRadius: 25,
//         maxHeight: 1,
//         alignItems: 'left',
//         justifyContent: 'center',
//         marginTop: 20,
//         backgroundColor: '#000000',
//     },

//     dayText: {
//         alignContent: 'center',
//         color: 'black',
//         backgroundColor: "#E5C492",
//         borderRadius: 25,
//         fontSize: 12,
//     },

//     text: {
//         alignContent: 'center',
//         color: 'white',
//     },
// });