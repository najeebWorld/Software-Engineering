import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { View, Image, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { getBarbersData } from '../../Firebase/BarberOperations';
import { useFocusEffect } from "@react-navigation/native";


export default function BreberCollection({ navigation }) {

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


    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {barberData.map((barber) => (
              <Card key={barber.userId} style={{ borderWidth: 0 }}>
                <Card.Title>{barber.userName}</Card.Title>
                <Card.Divider />
                <Text>Adress: {barber.BarberAddress}</Text>
                <Text>Working Days: {Object.keys(barber.availableWorkHours).map((key, index) => (
                    <TouchableOpacity key={index} >
                    <Text style={styles.dayText}> {key} </Text>
                  </TouchableOpacity>
            ))}</Text>
                <Text style={{ marginBottom: 10 }}>Phone Number: {barber.userPhone}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    navigation.navigate("AppointmentMaker");
                  }}>
                  <Text style={styles.text}>Make an appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    navigation.navigate("BarberProfile", { barber });
                  }}>
                  <Text style={styles.text}>Profile</Text>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#E5C492",
      },
      scrollView: {
        backgroundColor: "#E5C492",
        marginHorizontal: 20,
        height: '100%',
        color: "grey",
      },
      
    
      btn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginStart: 30,
        backgroundColor: '#000000',
      },
      dayBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginStart: 30,
        backgroundColor: '#000000',
      },

      little_btn: {
        width: "80%",
        borderRadius: 25,
        maxHeight: 1,
        alignItems: 'left',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#000000',
      },
    
      dayText: {
        alignContent: 'center',
        color: 'black',
        backgroundColor: "#E5C492",
        borderRadius: 25,
        fontSize: 12,
      },

      text: {
        alignContent: 'center',
        color: 'white',
      },
    });