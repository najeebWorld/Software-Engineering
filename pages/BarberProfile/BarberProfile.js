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
import { getBarber } from '../../Firebase/BarberOperations';
import { useFocusEffect } from "@react-navigation/native";
import { Rating, AirbnbRating } from 'react-native-elements';


export default function BarberProfile({ navigation, route }) {
    const item = route.params.barber;
    // console.log(item);

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
                    
                <Text key={index}>{key}  {Object.values(item.availableWorkHours)[index][0]}-{Object.values(item.availableWorkHours)[index][Object.values(item.availableWorkHours)[index].length-1]} {'\n'}</Text>
        
                  
            ))}</Text>
              
              <Text style={styles.info}>
                {item.BarberInfo}
              </Text>
                <View>
              <Text style={styles.recom}>
              Recommendation
              </Text>
              </View>

              <SafeAreaView style={styles.containerScroll}>
          <ScrollView style={styles.scrollView}>
            {item.reviews.map((review, index) => (
              <Card key={index}>
                <Card.Title>{review.userName}</Card.Title>
                <Card.Divider />
                <View>                
                <Rating readonly
                  type='star'
                  startingValue={review.rate}
                  ratingCount={5}
                  imageSize={20}
                  
                />
                </View>
                <Text> </Text>
                
                <Text>Review: {review.review}</Text>
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

      containerScroll: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        width: "80%",
        maxHeight: "100%"
      },

      scrollView: {
        backgroundColor: "#E5C492",
        flex: 1,
        marginHorizontal: 20,
        maxHeight: '60%',
        color: "grey",
      },
      header: {
        alignItems: 'center',
        
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
  