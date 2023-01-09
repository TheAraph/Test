import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler'

const Register = () => {

  //set variables needed
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [waterGoal, setWaterGoal] = useState('')
  const [weightGoal, setWeightGoal] = useState('')
  const [calorieGoal, setCalorieGoal] = useState('')
  

  //registeruser function
  registerUser = async (email, password, firstName, lastName, weight, weightGoal, height, waterGoal, calorieGoal) => {
    //before moving wait for firebase auth
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => { //when firebase auth is present, send email verification
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: "true",
        url: 'https://healthify-2b416.firebaseapp.com',
      })
      .then(() => {//if it works, send email to inbox to verify
        alert('Congrats! You are now logged in. Please verify your email')
      }).catch((error) => {
          alert(error.message)
      })
      .then(() => {//add user to database
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          weight,
          weightGoal,
          height,
          waterGoal,
          calorieGoal
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    })
    .catch((error => {
      alert(error.message)
    }))
  }


return(
  <ScrollView>
  <View style = {styles.container}>
        <Text style={styles.Headline4}>Welcome to</Text>
        <Text style={styles.Healthify}>Healthify</Text>
        <Text style={styles.Headline4}>Please Enter Your...</Text>
        <View style = {{marginTop: 20}}>
        <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
        />
        <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
        />
        </View>
        <View style = {{marginTop:20}}>
        <Text style={styles.Headline4}>Let's get to know you...</Text>
        </View>
        <View style = {{marginTop: 20}}>
        <TextInput
            style={styles.textInput}
            placeholder="Current Weight in kg"
            onChangeText={(weight) => setWeight(weight)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <TextInput
            style={styles.textInput}
            placeholder="Weight Goal in kg"
            onChangeText={(weightGoal) => setWeightGoal(weightGoal)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <TextInput
            style={styles.textInput}
            placeholder="Calorie Goal in cal"
            onChangeText={(calorieGoal) => setCalorieGoal(calorieGoal)}
            autoCorrect={false}
            keyboardType="number-pad"
        />
        <TextInput
            style={styles.textInput}
            placeholder="Height in cm"
            onChangeText={(height) => setHeight(height)}
            keyboardType="number-pad"
            autoCorrect={false}
        />
        <TextInput
            style={styles.textInput}
            placeholder="Water Goal in L"
            onChangeText={(waterGoal) => setWaterGoal(waterGoal)}
            keyboardType="number-pad"
            autoCorrect={false}
        />
        <TouchableOpacity 
            style = {styles.Button}
            onPress = {() => registerUser(email, password, firstName, lastName, weight, weightGoal, height, calorieGoal, waterGoal)}>
            <Text style = 
                {styles.ButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => navigation.navigate('Login')}>
            <Text style = 
                {{
                    fontWeight:"bold",
                    fontSize: 16,
                    textDecorationLine: "underline"
                }}>Already registered? Go back to Login</Text>
            
        </TouchableOpacity>
        </View>
        <View style = {{marginTop:40}}>
        <Text style={styles.Headline4}></Text>
        </View>
    </View>
    </ScrollView>
)
              }

export default Register

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: "center",
      marginTop:10,
  },
  textInput:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 344,
      height: 73,
      borderRadius:15,
      elevation: 3,
      backgroundColor: '#FFF',
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
      padding: 15,
    },
    Button:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 344,
      height: 73,
      borderRadius: 73,
      elevation: 3,
      backgroundColor: '#D5342B',
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
    },
    ButtonText:{
      fontFamily: "Helvetica",
      fontSize: 34,
      fontWeight: 'bold',
      color: '#fff'
    },
    Healthify:{
      fontFamily: "Helvetica",
      fontSize: 61,
      color: "#D5342B",
      margin: 0,
      fontWeight: 'bold',
    },
    Headline4:{
      fontFamily: "Helvetica",
      fontSize: 34,
      color: "#000",
      margin: 0,
    }
})