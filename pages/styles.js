import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E5C492',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScrollable: {
    flex: 1,
    backgroundColor: '#E5C492',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  inputView: {
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    backgroundColor: '#E5C492',
    alignItems: 'center',
    borderWidth: 3.0,
    borderColor: '#8D5238',
  },

  inputViewError: {
    backgroundColor: '#E5C492',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3.0,
    borderColor: 'red',
  },

  TextInput: {
    color: 'black',
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 100,
  },
  logoContainerSignUp: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  logoContainerSuccess: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 55,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000000',
  },

  loginText: {
    color: 'white',
  },
  dayText: {
    color: 'black',
    marginTop: 12,
    fontWeight: 'bold',
  },
  dayTextClicked: {
    color: 'white',
    marginTop: 12,
    fontWeight: 'bold',
  },
  dayButton: {
    flex: 1,
    width: 51,
    height: 51,
    backgroundColor: '#E5C492',
    borderRadius: 10,
    borderColor: '#8D5238',
    borderWidth: 2,
    position: 'absolute',
    alignItems: 'center',
  },
  dayButtonClicked: {
    flex: 1,
    width: 51,
    height: 51,
    backgroundColor: '#8D5238',
    borderRadius: 10,
    borderColor: '#E5C492',
    borderWidth: 2,
    position: 'absolute',
    alignItems: 'center',
  },
  dayButtonTopRow: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 15,
  },
  dayButtonBottomRow: {
    flexDirection: 'row',
    marginLeft: 49,
    marginRight: 35,
    marginTop: 65,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    borderColor: '#E5C492',
    backgroundColor: '#E5C492',
  },
  label: {
    margin: 8,
  },

  welcomeContainer: {
    marginTop: 40,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: -50,
  },
  daysContainer: {
    width: 296,
    height: 168,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#8D5238',
    borderWidth: 3,
  },
  dropdown: {
    width: 140,
    margin: 10,
    height: 40,
    marginBottom: 0,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 3.0,
    borderColor: '#8D5238',
  },
  placeholderStyle: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    bold: 'true',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
    bold: 'true',
    backgroundColor: 'black',
  },
  btn: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#000000',
  },
  text: {
    color: 'white',
  },
  chooseDateContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
    marginRight: 120,
  },
  downDropText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  appointmentContainer: {
    position: 'absolute',
    width: 296,
    height: 314,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3.0,
    borderColor: '#8D5238',
  },
  appointmentContainerContent: {
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appoinment: {
    flex: 1,
    //position: "absolute",
    flexDirection: 'row',
    width: 240,
    height: 87,
    backgroundColor: '#E5C492',
    borderRadius: 10,
    borderWidth: 3.0,
    borderColor: '#8D5238',
    marginTop: 15,
  },
  containerForOrderDetails: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E5C492',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainerOederDetail:{
  },
  logoContainerOederDetailOther:{
    bottom: 10
  },
  orderDetailsButtons:{
    margin:20,
    width:300,
    resizeMode:'center',
    borderRadius:25,
  },
  userOrderDetails:{
    resizeMode:"contain",
  },
  imagecontainer:{
    alignItems: "center"
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    marginTop:100,
  },
  OrderDetailsUserName:{
    color:"black",
    fontFamily:"lucida grande",
    fontSize:30,
    marginTop:30,
    fontWeight: 'bold',
  },

  OrderDetailsOtherDetails:{
    color:"black",
    fontSize:20,
    marginTop:10,
  },
});
