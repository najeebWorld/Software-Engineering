import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { deleteOrder } from "../../Firebase/OrderOperations";
import { styles } from "../styles";
const Appointment = (props) => {
  return (
    <View style={styles.appoinment}>
      <View style={{ flexDirection: "column", marginLeft: 7, width: 180 }}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
          {props.barberName}
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 13 }}>
          Details:
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 13 }}>
          {`${props.date}, ${props.time}`}
        </Text>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 13 }}>
          {props.type}
        </Text>
      </View>
      <View style={{ flexDirection: "column", marginLeft: 7 }}>
        <TouchableOpacity
          style={{ marginBottom: 10, marginTop: 25 }}
          onPress={async () => {
            await deleteOrder(props.user, props.date, props.time, props.docID);
            props.reRender();
            alert("Appointment successfully canceled");
          }}
        >
          <Image source={require("../assets/trash.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Appointment;
