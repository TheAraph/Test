import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import {firebase} from '../config'
import { ScrollView } from 'react-native-gesture-handler';


const LogFood = () => {
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

      const updateFood = () => {
        const db = firebase.firestore();
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
            caloriesConsumed: caloriesConsumed
        })
        .then(function() {
            console.log("Calories Consumed successfully updated!");
            alert('Calories Consumed successfully updated!')
            navigation.navigate('Health');
        })
        .catch(function(error) {
            console.error("Error updating Calories Consumed: ", error);
        });
    }

  return (
    <ScrollView>
    <View>
      <View style = {styles.container}>
      <Text style={styles.Headline4}>Enter Calories Consumed</Text>
      <TextInput
            style={styles.textInput}
            placeholder="Calories Consumed"
            onChangeText={(caloriesConsumed) => setCaloriesConsumed(caloriesConsumed)}
            keyboardType="number-pad"
            autoCorrect={false}
        />
      <Pressable style = {styles.Button} onPress = {() => updateFood()}>
        <Text style = {styles.ButtonText}>Confirm</Text>
      </Pressable>
      <Pressable style = {styles.Button} onPress = {() => navigation.navigate('FoodDrink')}>
        <Text style = {styles.ButtonText}>Back</Text>
      </Pressable>
    </View>
    </View>
    </ScrollView>
  )
}

export default LogFood

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        marginTop:30,
        justifyContent:"flex-end"
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

  