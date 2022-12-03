import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginForm from './pages/loginPage/LoginForm';
import SignupForm from './pages/signupPage/sigupPage';
import CalendarPage from './pages/calendarPage/calendarPage';
import SuccessfullLogin from './pages/success/SuccessfullLogin';
import WorkingDays from './pages/workingDays/WorkingDays';
import MyAppointments from './pages/MyAppointments/MyAppointments';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="AppointmentMaker" component={CalendarPage} />
        <Stack.Screen name="Success" component={SuccessfullLogin} />
        <Stack.Screen name="WorkingDays" component={WorkingDays} />
        <Stack.Screen name="MyAppointments" component={MyAppointments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
