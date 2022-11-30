import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E5C492",
      alignItems: "center",
      justifyContent: "center",
    },
    containerScrollable: {
      flex: 1,
      backgroundColor: "#E5C492",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 50
    },
    
    inputView: { 
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      backgroundColor: "#E5C492",
      alignItems: "center",
      borderWidth: 3.0,
      borderColor: "#8D5238"
  
    },

    inputViewError: {
        backgroundColor: "#E5C492",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 3.0,
        borderColor: "red"
    
      },
   
    TextInput: {
      color: "black",
      textAlign: 'center'
    },
    logoContainer: {
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 100,
    },
    logoContainerSignUp: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30
      },
      logoContainerSuccess: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 55,
      },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#000000",
    },
  
    loginText: {
      color: "white"
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      borderColor: "#E5C492",
      backgroundColor: "#E5C492"
    },
    label: {
      margin: 8,
    },

    welcomeContainer: {
      marginTop: 40,
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      marginBottom: -50
    }
  });