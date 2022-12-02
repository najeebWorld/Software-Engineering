import React from 'react'
import {styles} from "../styles"
import {View} from "react-native";
import DayButton from './dayButton';

const DaySelector = (props) => {
  return (
    <View style={styles.daysContainer}>
        <View style={styles.dayButtonTopRow}>
            <View style={{flex: 1}}>
                <DayButton day="Sun" setWeekDays = {props.setWeekDays}/>
            </View>
            <View style = {{flex: 1}}>
                <DayButton day="Mon" setWeekDays = {props.setWeekDays}/>
            </View>
            <View style = {{flex: 1}}>
                <DayButton day="Tue" setWeekDays = {props.setWeekDays}/>
            </View>
            <View style = {{flex: 1}}>
                <DayButton day="Wed" setWeekDays = {props.setWeekDays}/>
            </View>
        </View>
        <View style={styles.dayButtonBottomRow}>
            <View style={{flex: 3}}>
                <DayButton day="Thu" setWeekDays = {props.setWeekDays}/>
            </View>
            <View style = {{flex: 3 }}>
                <DayButton day="Fri" setWeekDays = {props.setWeekDays}/>
            </View>
            <View style = {{flex: 3}}>
                <DayButton day="Sat" setWeekDays = {props.setWeekDays}/>
            </View>
        </View>
    </View>
  )
}

export default DaySelector