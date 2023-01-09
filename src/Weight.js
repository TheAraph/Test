import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';

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

    const [age, setAge] = useState('')
    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if(snapshot.exists){
            setAge(snapshot.data().age)
          }
          else{
            console.log('User does not exist')
          }
        })
      }, [])
      
      const [height, setHeight] = useState('')
      useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          if(snapshot.exists){
            setHeight(snapshot.data().height)
          }
          else{
            console.log('User does not exist')
          }
        })
      }, [])

      // Declare weightLoss and initialize it to 0
      let weightLoss = 0;
      let weightGain = 0;
      let maintainWeight = 0;

      // Assign the value of the equation to weightLoss
      weightLoss = ((10 * weight) + (6.25 * height) - (5 * age) + 5);
      maintainWeight = (((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.2);
      weightGain = (maintainWeight - weightLoss) + (((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.2)
      
  return (
    <ScrollView>
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.headline4}>Current Weight</Text>
      <Text style={styles.headline2BLACK}>{weight}</Text>
      <Text style={styles.headline5}>Recommended Calories:</Text>
      <Text style={styles.headline4}>To Maintain Weight</Text>
      <Text style={styles.headline2BLACK}>{maintainWeight}</Text>
      <Text style={styles.headline4}>For Weight Loss</Text>
      <Text style={styles.headline2BLACK}>{weightLoss}</Text>
      <Text style={styles.headline4}>For Weight Gain</Text>
      <Text style={styles.headline2BLACK}>{weightGain}</Text>
      <Pressable style = {styles.button} onPress = {() => navigation.navigate('LogWeight')}>
        <Text style = {styles.btntext}>Log Weight</Text>
      </Pressable>
    </View>
    </ScrollView>
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
  headline5:{
    fontFamily: "Helvetica",
    fontSize: 24,
    color: "#000",
    margin: 10,
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