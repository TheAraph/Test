import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';

const CurrentDate = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-US', options).format(today);

  return <Text style={styles.Date}>{dateString}</Text>;
};

const FoodDrink = () => {

  const navigation = useNavigation()

  const [caloriesConsumed, setCaloriesConsumed] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setCaloriesConsumed(snapshot.data().caloriesConsumed)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const [waterDrank, setWaterDrank] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setWaterDrank(snapshot.data().waterDrank)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const [waterGoal, setWaterGoal] = useState('')
  useEffect(() => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setWaterGoal(snapshot.data().waterGoal)
        }
        else{
          console.log('User does not exist')
        }
      })
    }, [])

    const resetValues = () => {
      try {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
          caloriesConsumed: 0,
          waterDrank: 0
        }).then(() => {
          alert('Values Reset');
          navigation.navigate('Health');
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

  return (
    <ScrollView>
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.Date}><CurrentDate></CurrentDate></Text>
      <Text style={styles.Headline4}>Calories Consumed</Text>
      <Text style={styles.Headline2Black}>{caloriesConsumed}</Text>
      <Text style={styles.Headline4}>Water Drank in Litres</Text>
      <Text style={styles.Headline2Black}>{waterDrank}/{waterGoal}</Text>
      <Pressable style = {styles.Button} onPress = {() => navigation.navigate('LogFood')}>
        <Text style = {styles.ButtonText}>Log Food</Text>
      </Pressable>
      <Pressable style = {styles.Button} onPress = {() => navigation.navigate('LogDrink')}>
        <Text style = {styles.ButtonText}>Log Drink</Text>
      </Pressable>
      <Pressable style = {styles.Button2} onPress =  {resetValues}>
        <Text style = {styles.Button2Text}>Reset Values For New Day</Text>
      </Pressable>
    </View>
    </ScrollView>
  )
}

export default FoodDrink

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    marginTop:100,
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
  HealthifyUserName:{
    fontFamily: "Helvetica",
    fontSize: 48,
    color: "#E2716B",
    margin: 10,
    fontWeight: 'bold',
  },
  Headline4:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#000",
    margin: 10,
    alignItems: "center"
  },
  Button2:{
    marginTop:20, alignItems:"center"
  },
  Headline2Black:{
    fontFamily: "Helvetica",
    fontSize: 61,
    color: "#000",
    margin: 10,
    fontWeight: 'bold'
  },
  Button2Text:{
    fontWeight:"bold",
    fontSize: 16,
    textDecorationLine: "underline"
  },
  Date:{
    fontFamily: "Helvetica",
    fontSize: 34,
    color: "#000",
    margin: 10,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
})