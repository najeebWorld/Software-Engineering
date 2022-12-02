import React, {useState} from 'react'
import {styles} from '../styles'
import {
    Text,
    TouchableOpacity,
  } from "react-native";

const DayButton = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const onClickHandler = () => {
      setIsClicked(!isClicked);
      props.setWeekDays(prevState =>{
        const day = props.day;
        return {
          ...prevState,
          [day]: !isClicked
        }
  });
  }
  return (
    <TouchableOpacity style={isClicked ? styles.dayButtonClicked : styles.dayButton} onPress={onClickHandler}>
        <Text style={isClicked ? styles.dayTextClicked : styles.dayText}>{props.day}</Text>
    </TouchableOpacity>
  )
}

export default DayButton