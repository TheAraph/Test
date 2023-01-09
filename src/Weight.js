import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'

const Weight = () => {
    const navigation = useNavigation()

    const [weight, setWeight] = useState('')
    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if(snapshot.exists){
            setWeight(snapshot.data().weight)
          }
          else{
            console.log('User does not exist')
          }
        })
      }, [])

  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.headline4}>Current Weight</Text>
      <Text style={styles.headline2BLACK}>{weight}</Text>
      <Text style={styles.headline4}>Weight Progress</Text>
      <Text style={styles.headline2BLACK}>-4KG</Text>
      <Text style={styles.headline4}>Calories Lost By Walk</Text>
      <Text style={styles.headline2BLACK}>33 cal.</Text>
      <Pressable style = {styles.button} onPress = {() => {props.navigation.navigate('LogWeight')}}>
        <Text style = {styles.btntext}>Log Weight</Text>
      </Pressable>
    </View>
  )
}

export default Weight

const styles = StyleSheet.create({
  btntext:{
    fontFamily: "Helvetica",
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff'
  },
  button:{
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
  input:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 344,
    height: 73,
    borderRadius:50,
    elevation: 3,
    backgroundColor: '#FFF',
    margin: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
  },
  headline4:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#000",
    margin: 10,
  },
  headline4INPUT:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "grey",
    margin: 10,
  },
  headline4DATE:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#000",
    margin: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  headline2BLACK:{
    fontFamily: "Helvetica",
    fontSize: 61,
    color: "#000",
    margin: 10,
    fontWeight: 'bold',
  },
  card:{
      alignItems: 'center',
      justifyContent: 'center',
      width: 341,
      height: 177, 
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#D5342B',
      marginBottom: 25,
  }
})