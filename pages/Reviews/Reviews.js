import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput } from "react-native";
import { getCustomer, newReview } from "../../Firebase/CustomerOperations";
import user from "../../Firebase/User";
import { getBarberList } from "../../Firebase/BarberOperations";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState, Fragment, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import { Rating, AirbnbRating } from 'react-native-elements';



export default function SuccessfullLogin({ navigation }) {

    const [_chosenBarber, setChosenBarber] = useState("Choose Barber");
    const [_barberId, setBarberId] = useState("");
    const [_barberData, SetBarberData] = useState([]);
    const [isSelectedName, setSelectedName] = useState(false);
    const [_review, setReview] = useState("");
    const [rate, setRating] = useState(-1);


    useFocusEffect(
        React.useCallback(() => {
          const getBarbers = async () => {
            const Barbers = await getBarberList();
            SetBarberData(Barbers);
          };
          getBarbers().catch((err) => alert(err));
        }, [])
      );

    const changeOnDropDownBarber = async (item) => {
    
        setChosenBarber(item.label);
        setBarberId(item.value);

      };

    const handlerSelectedName = () => {
        if (isSelectedName) {
            setSelectedName(false);
        } else {
            setSelectedName(true);
        }
    }

    const handlerSendReview = async (barberId, ) => {
        if (_chosenBarber == "Choose Barber" || _review == "") {
            if (_review == "" && _chosenBarber != "Choose Barber") {
                alert("Please enter your review");
            } else {
                if (_chosenBarber == "Choose Barber" && _review == "") {
                    alert("Please enter your review and Barber that you want to review");
                } else {
                    alert("Please enter the barber that you want to review");
                }
            }
            
        } else {
            if (rate != -1) {
                if (isSelectedName) {
                    console.log("sent");
                    await newReview(user.userID(), _chosenBarber, _barberId, _review, rate, false);
                    navigation.navigate("MyAppointments");
                } else {
                    console.log("sent");
                    await newReview(user.userID(), _chosenBarber, _barberId, _review, rate, true);
                    navigation.navigate("MyAppointments");
                }
            } else {
                alert("Please choose rate");
            }
            
        }       
        
    }

    return (
        <View style={styles.container}>
            
            <View>
            <Image
                    source={require("../assets/logowithname.png")}
                    style={styles.logoContainer}
                />
            </View>

            <View>
                <Dropdown
                style={styles.dropdown}
                data={_barberData}
                itemTextStyle={styles.downDropText}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                onChange={changeOnDropDownBarber}
                placeholder={_chosenBarber}
                />
            </View>

            <View style={styles.inputView}>
            <TextInput
            multiline={true}
            style={styles.TextInput}
            placeholder="Enter your review here..."
            placeholderTextColor="#003f5c"
            onChangeText={(review) => setReview(review)}
            />

            <CheckBox
                title="Do not add my name"
                checked={isSelectedName}
                onPress={handlerSelectedName}
                containerStyle={styles.checkbox}
                checkedColor="#8D5238"
            />

            <Rating 
            type='star'
            ratingCount={5}
            imageSize={30}
            ratingBackgroundColor={"#E5C492"}
            onFinishRating={(number) =>{ 
                console.log(number);
                setRating(number);
            }}
            style={{ padding: 5, backgroundColor: '#8D5238' }}            
            />

            <TouchableOpacity style={styles.btn} onPress={handlerSendReview}>
                <Text style={styles.text}>Send Review</Text>
            </TouchableOpacity>
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E5C492",
      alignItems: "center",
    },
  
    dropdown: {
      width: 250,
      margin: 10,
      height: 40,
      marginBottom: 30,
      padding: 5,
      borderRadius: 10,
      backgroundColor: "white",
      alignItems: "center",
      borderWidth: 3.0,
      borderColor: "#8D5238",
    },

    inputView: {
        borderRadius: 30,
        width: "70%",
        height: 150,
        marginBottom: 20,
        backgroundColor: "#E5C492",
        alignItems: "center",
        borderWidth: 3.0,
        borderColor: "#8D5238",
      },
    
      inputViewError: {
        backgroundColor: "#E5C492",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 3.0,
        borderColor: "red",
      },
    
      TextInput: {
        color: "black",
        textAlign: "center",
      },
  
    placeholderStyle: {
      fontSize: 15,
      textAlign: "center",
      alignContent: "center",
      alignItems: "center",
      color: "black",
      bold: "true",
    },
  
    selectedTextStyle: {
      fontSize: 15,
      color: "black",
      bold: "true",
      backgroundColor: "white",
      flex: 2,
      marginLeft: 95,
    },
  
    SecContainer: {
      flex: 1,
      paddingTop: 10,
    },

    rateContainer: {
        backgroundColor: "#E5C492",
      },
  
    header: {
      fontSize: 10,
      backgroundColor: "#fff",
      color: "black",
    },
  
    btn: {
        width: 250,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#000000",
      },
  
    text: {
      color: "white",
    },
  
    CalContainer: {
      borderWidth: 3.0,
      borderColor: "#8D5238",
      borderRadius: 10,
    },
  
    logoContainer: {
      alignItems: "flex-start",
      flexDirection: "row",
      marginBottom: 20,
      marginTop: 50,
    },
  
    chooseDateContainer: {
      alignItems: "flex-start",
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 50,
      marginRight: 120,
    },
  
    downDropText: {
      color: "black",
      fontSize: 15,
      textAlign: "center",
    },

    checkbox: {
        borderColor: "#E5C492",
        backgroundColor: "#E5C492",
        marginTop: 100,
      },
});
