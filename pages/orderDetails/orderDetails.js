import React from 'react'
import { View, Image, Text} from 'react-native'
import {styles}from '../styles'



const OrderDetails = () => {
  return (
    <View style={styles.containerForOrderDetails}>
      <View style={{flex:2,justifyContent: 'center', alignItems: 'center',}}>
        <Image
          source={require('../assets/logowithname.png')}
          style={styles.logoContainerOederDetail}
        />
        <Image
          source={require('../assets/user.png')}
          style={styles.userOrderDetails}
        />
      </View>
      <View style={{flex:3, justifyContent: 'flex-start', alignItems: 'center',}}>
        <Text style={styles.OrderDetailsUserName}>
          UserName
        </Text>
        <Text style={styles.OrderDetailsUserName}>
          Phone number
        </Text>
        <Text style={styles.OrderDetailsUserName}>
          Hair Style
        </Text>
        <Text style={styles.OrderDetailsUserName}>
          Date
        </Text>
      </View>
      <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'center',}}>

      </View>
      

        
    </View>
  )
}

export default OrderDetails