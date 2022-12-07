import React from 'react'
import { View, Image} from 'react-native'
import {styles}from '../styles'



const OrderDetails = () => {
  return (
    <View style={styles.containerForOrderDetails}>
      <Image
        source={require('../assets/logowithname.png')}
        style={styles.logoContainerOederDetail}
      />
      <Image
        source={require('../assets/user.png')}
        style={styles.logoContainerOederDetail}
      />
        
    </View>
  )
}

export default OrderDetails