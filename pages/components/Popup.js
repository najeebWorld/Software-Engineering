import { Modal, View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import {styles} from '../styles'
import React from 'react'

const Popup = (props) => {
  return (
    <Modal visible={props.visible} transparent={props.transparent}>
      <View style={styles.popupBackground}>
        <View style={styles.popupContent}>
          <Text
            style={{ ...styles.baseText, alignText: "center", marginTop: 10 }}
          >
            {props.headerText}
          </Text>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoContainer}
          />
          <Text
            style={{
              ...styles.baseText,
              alignText: "center",
              fontSize: 15,
              marginTop: -90,
              textAlign: "center",
            }}
          >
            {props.bodyText}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ ...styles.btn, width: 100, height: 50, marginRight: 10 }}
              onPress={props.firstButtonOnClick}
            >
              <Text style={{ fontSize: 15, color: "white", fontStyle: "bold" }}>
                {props.firstButtonText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btn, width: 100, height: 50, marginLeft: 10 }}
              onPress={props.secondButtonOnClick}
            >
              <Text style={{ fontSize: 15, color: "white", fontStyle: "bold" }}>
                {props.secondButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default Popup