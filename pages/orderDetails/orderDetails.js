import React from 'react'
import { View, Image, Text, Button, Linking, TouchableOpacity} from 'react-native'
import {styles}from '../styles'



export default function OrderDetails ({navigation})  {
  const orderData = {
    clientName: 'userName',
    clientPhone: '050-000-0000',
    orderDate: '12/10/2022, 16:00-16:45',
    orderExtraInfo: 'fade',
  }
  
  const CancelAppointment= ()=> {
    alert('This appointment will be canceled.')
  };
  
  const navigateBack= ()=> {
    navigation.navigate('MyAppointments');
    alert('Return to all appointments.')
  };

  const callClient = (phoneNumber)=>{
    Linking.openURL(`tel:${phoneNumber}`)
  };
  

  return (
    <View style={styles.containerForOrderDetails}>
      {/**
       * Layout header - contains the app's logo and user Img & name (name is the 
       *    client name  in order Data).
       */}
      <View style={{flex:3,justifyContent: 'center', alignItems: 'center',}}>
        <Image
          source={require('../assets/logowithname.png')}
          style={styles.logoContainerOederDetail}
        />
        <Image
          source={require('../assets/user.png')}
          style={styles.userOrderDetails}
        />
        <Text style={styles.OrderDetailsUserName} >
            {orderData.clientName}
        </Text>
      </View>
      {/**
       * this View contain presention of th rest of the order data.
       */}
      <View style={{flex:2, justifyContent: 'space-between', alignItems: 'center',}}>
        <View style={{flex:1, flexDirection:"row",justifyContent: 'space-between',alignItems:'baseline'}}>
          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.orderExtraInfo}
          </Text>
        </View>
        <View style={{flex:1, flexDirection:"row",justifyContent: 'space-between',alignItems:'baseline'}}>
          <TouchableOpacity onPress={()=>{callClient(orderData.clientPhone)}}>
            <Image 
              source={require('../assets/UserPhoneLogo.png')}
              style={styles.logoContainerOederDetail}
            />
          </TouchableOpacity>

          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.clientPhone}
          </Text>
        </View>
        <View style={{flex:1, flexDirection:"row",justifyContent: 'space-between',alignItems:'baseline'}}>
          <Image 
            source={require('../assets/clock.png')}
            style={styles.logoContainerOederDetailOther}
          />
          <Text style={styles.OrderDetailsOtherDetails}>
            {orderData.orderDate}
          </Text>
        </View>
      </View>
      {/**
       * Last View contains the buttons for exit this page (back to 'myAppointments' page) using [navigateBack] function
       *     or to cancel this appointment using [CancelAppointment] function.
       */}
      <View style={{flex:2, justifyContent: 'flex-start', alignItems: 'center',}}>
        <View style={styles.orderDetailsButtons}> 
          <Button
            onPress={CancelAppointment}
            title="Cancel Appointments"
            color='#ff0000'
          />
        </View>
        <View style={styles.orderDetailsButtons}>
          <Button 
          onPress={navigateBack}
            title="Appointments"
            color="#000000"
          />
        </View>
        {/* <View style={styles.orderDetailsButtons}>
          <Button 
            onPress={()=>{
              callClient(orderData.clientPhone)
            }}
            title="Call client"
            color="#000000"
          />
        </View> */}
      </View>
    </View>
  )
};
