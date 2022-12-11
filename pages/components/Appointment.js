import React, {useState, useEffect} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { getBarber, deleteOrder } from '../../Firebase/FirebaseOperations';
import {styles} from '../styles';
const Appointment = props => {
  const [barberName,setbarberName] = useState('');
  const [onDelete, setOnDelete] = useState(false);
  const [deleteGuard, setDeleteGuard] = useState(false);
  useEffect(()=>{
    const getName = async () =>{
      const name = await getBarber(props.user);
      setbarberName(name.userName);
    }
    getName().catch(err=>alert(err));
},[deleteGuard])

  useEffect(()=>{
    if(deleteGuard){
      const deleteOrderHandler = async () =>{
        await deleteOrder(props.user,props.date,props.time,props.docID)
      }
      deleteOrderHandler().catch(err=>{alert(err)});
      setDeleteGuard(false);
      props.render(!props.renderVal)
    }
  },[onDelete])
  return (
    <View style={styles.appoinment}>
      <View style={{flexDirection: 'column', marginLeft: 7, width: 180}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
          {barberName}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          Details:
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          {`${props.date}, ${props.time}`}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 13}}>
          {props.type}
        </Text>
      </View>
      <View style={{flexDirection: 'column', marginLeft: 7}}>
        <TouchableOpacity style={{marginBottom: 10, marginTop: 25}}
         onPress={() =>{
          setDeleteGuard(true);
          setOnDelete(!onDelete)}
          }>
          <Image source={require('../assets/trash.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;
