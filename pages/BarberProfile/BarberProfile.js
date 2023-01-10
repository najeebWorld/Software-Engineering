// import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
// import { View, Image, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { getBarbersData } from '../../Firebase/BarberOperations';
import { useFocusEffect } from "@react-navigation/native";

export default function BarberProfile({ navigation, route }) {
    const item = route.params.barber;  

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

    const callClient = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
      };
    
    return (

        
        <View style={styles.container}>
            <View style={styles.phoneContainer}>
            <TouchableOpacity
            onPress={() => {
              callClient(item.userPhone);
            }}
          >
            <Image
              source={require("../assets/UserPhoneLogo.png")}
              
            />
          </TouchableOpacity>
          </View>
          <View style={styles.header}>

            <Image
              style={styles.avatar}
              source={require("../assets/user.png")}
            />
            <Text style={styles.name}>{item.userName}</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            
              <Text style={styles.info}>Adress: {item.BarberAddress}</Text>
              <Text style={styles.info}>Working Days: {'\n'} {Object.keys(item.availableWorkHours).map((key, index) => (
                    
                <Text key={index}>{key}  {Object.values(item.availableWorkHours)[0][0]}-{Object.values(item.availableWorkHours)[0][Object.values(item.availableWorkHours)[0].length-1]} {'\n'}</Text>
        
                  
            ))}</Text>
              
              <Text style={styles.info}>
                {item.BarberInfo}
              </Text>
                <View>
              <Text style={styles.recom}>
                Recomendation
              </Text>
              </View>

              <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {barberData.map((barber) => (
              <Card key={barber.userId} style={{ borderWidth: 0 }}>
                <Card.Title>{barber.userName}</Card.Title>
                <Card.Divider />
                <Text>Adress: </Text>
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
            </View>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 0,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E5C492',
        maxHeight: "100%",
      },
      header: {
        alignItems: 'center',
        marginTop: 20,
      },

      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        // borderWidth: 4,
        // borderColor: 'black',        
      },
      name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
      },
      body: {
        marginTop: 10,
      },
      phoneContainer: {
        position: 'absolute',
        top: 130,
        right: 260,
      },
      bodyContent: {
        alignItems: 'center',
      },
      dayText: {
        alignContent: 'center',
        color: 'black',
        backgroundColor: "#E5C492",
        borderRadius: 25,
        fontSize: 12,
      },
      info: {
        maxWidth:'70%',
        fontSize: 16,
      },

      recom: {
        fontSize: 16,
        backgroundColor: "grey",
        width: 500,
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
      },
    });
  