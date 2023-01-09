import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

const Health = () => {
  const navigation = useNavigation()
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Pressable style = {styles.card} onPress = {() => navigation.navigate('Weight')}>
        <Text style = {styles.btntext}>Weight</Text>
      </Pressable>
      <Pressable style = {styles.card} onPress = {() => navigation.navigate('Sleep')}>
        <Text style = {styles.btntext}>Sleep</Text>
      </Pressable>
      <Pressable style = {styles.card} onPress = {() => navigation.navigate('FoodDrink')}>
        <Text style = {styles.btntext}>Food & Drink</Text>
      </Pressable>
    </View>
  )
}

export default Health

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