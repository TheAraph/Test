import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'


const Login = () => {
    //login variables
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //login function
  loginUser = async (email, password) => {
    try{//try authenticate using username and password
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error){
        //show error message
        alert("Incorrect email or email doesn't exist")
    }
  }

  //forgot password
  const forgotPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent")
      }).catch((error) => {
        alert("Incorrect email or email doesn't exist!")
      })
  }

  return (
    <View style = {styles.container}>
        <Text style={styles.Headline4}>Welcome to</Text>
        <Text style={styles.Healthify}>Healthify</Text>
        <View style = {{marginTop: 40}}>
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
        <TouchableOpacity 
            style = {styles.Button}
            onPress = {() => loginUser(email, password)}>
            <Text style = 
                {styles.ButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => navigation.navigate('Register')}>
            <Text style = 
                {{
                    fontWeight:"bold",
                    fontSize: 16,
                    textDecorationLine: "underline"
                }}>Don't have an account? Sign Up Here</Text>
            
        </TouchableOpacity>
        <TouchableOpacity
            style = {{marginTop:20, alignItems:"center"}}
            onPress = {() => {forgotPassword()}}>
            <Text style = 
                {{
                    fontWeight:"bold",
                    fontSize: 16,
                    textDecorationLine: "underline"
                }}>Forgot Password</Text>
            
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        marginTop:100,
    },
    Button2:{
      marginTop:20, alignItems:"center"
    },
    Button2Text:{
      fontWeight:"bold",
      fontSize: 16,
      textDecorationLine: "underline"
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
        margin: 10,
        fontWeight: 'bold',
      },
      Headline4:{
        fontFamily: "Helvetica",
        fontSize: 34,
        color: "#000",
        margin: 10,
      }
})