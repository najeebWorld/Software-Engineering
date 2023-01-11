import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./pages/loginPage/LoginForm";
import SignupForm from "./pages/signupPage/sigupPage";
import CalendarPage from "./pages/calendarPage/calendarPage";
import SuccessfullLogin from "./pages/success/SuccessfullLogin";
import WorkingDays from "./pages/workingDays/WorkingDays";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import CalendarPageBarber from "./pages/calendarPage/calendarPageBarber";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import BarberCollection from './pages/BarberCollection/BarberCollection';
import BarberProfile from "./pages/BarberProfile/BarberProfile";
import Reviews from "./pages/Reviews/Reviews";
import BarberAddress from "./pages/workingDays/barberAddress";
import CustomerMenu from './pages/Menu/CustomerMenu'
import BarberMenu from './pages/Menu/BarberMenu'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="AppointmentMaker" component={CalendarPage} />
        <Stack.Screen name="Success" component={SuccessfullLogin} />
        <Stack.Screen name="WorkingDays" component={WorkingDays} />
        <Stack.Screen name="MyAppointments" component={MyAppointments} />
        <Stack.Screen
          name="CalendarPageBarber"
          component={CalendarPageBarber}
        />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="BarberCollection" component={BarberCollection} />
        <Stack.Screen name="BarberProfile" component={BarberProfile} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="BarberAddress" component={BarberAddress} />
        <Stack.Screen name="CustomerMenu" component={CustomerMenu}/>
        <Stack.Screen name="MenuBarber" component={BarberMenu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
