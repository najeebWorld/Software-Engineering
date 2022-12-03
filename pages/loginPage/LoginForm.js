import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { authenticate } from '../../Firebase/auth';
import { getUser } from '../../Firebase/FirebaseOperations';
import user from '../../Firebase/User'

export default function LoginForm({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logowithname.png')}
        style={styles.logoContainer}
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={ async () => {
          await authenticate(email, password);
          console.log("User id",user.userID());
          const useremail = (await getUser(user.userID())).userEmail;
          console.log(useremail);
          navigation.navigate('MyAppointments');
        }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={styles.loginText}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}
