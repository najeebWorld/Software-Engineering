import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import {styles} from '../styles';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function SignupForm({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifypass, setVerify] = useState('');
  const [error, setError] = useState(false);
  const [isSelectedMale, setSelectionMale] = useState(false);
  const [isSelectedFemale, setSelectionFemale] = useState(false);

  /**
   * These functions are to prevent two checkboxes to be clicked at the same time.
   * @param {*} currState
   */
  const femaleClickHandler = currState => {
    if (!currState && isSelectedMale) {
      setSelectionFemale(true);
      setSelectionMale(false);
    } else {
      setSelectionFemale(!isSelectedFemale);
    }
  };
  const maleClickHandler = currState => {
    if (!currState && isSelectedFemale) {
      setSelectionMale(true);
      setSelectionFemale(false);
    } else {
      setSelectionMale(!isSelectedMale);
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#E5C492'}}>
      <View style={styles.containerScrollable}>
        <Image
          source={require('../assets/logowithname.png')}
          style={styles.logoContainerSignUp}
        />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Full name"
            placeholderTextColor="#003f5c"
            onChangeText={name => setName(name)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={error ? styles.inputViewError : styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={error ? 'Passwords do not match' : 'Password'}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>

        <View style={error ? styles.inputViewError : styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={error ? 'Passwords do not match' : 'Confirm Password'}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => setVerify(password)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={phone => setPhone(phone)}
          />
        </View>
        <View>
          <CheckBox
            title="Customer"
            checked={isSelectedMale}
            onPress={() => {
              maleClickHandler(isSelectedMale);
            }}
            containerStyle={styles.checkbox}
            checkedColor="#8D5238"
          />
          <CheckBox
            title="Barber"
            checked={isSelectedFemale}
            onPress={() => {
              femaleClickHandler(isSelectedFemale);
            }}
            containerStyle={styles.checkbox}
            checkedColor="#8D5238"
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            const gender = isSelectedMale ? 'male' : 'female';
            if (password === verifypass) {
              console.log(phone, name, gender, email, password);
              navigation.navigate('AppointmentMaker');
            } else {
              setError(true);
            }
          }}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
