import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import {firebase} from './config';

import Login from "./src/Login";
import Register from "./src/Register"
import Home from "./src/Home";
import Header from "./components/Header";
import Health from "./src/Health";
import Resources from "./src/Resources";
import Weight from "./src/Weight";
import FoodDrink from "./src/FoodDrink";
import Sleep from "./src/Sleep";

const Stack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }

  //detect state
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  //If user is not logged in, show only login and signup pages
  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          
          options={{
            headerTitle: () => <Header name = "Healthify"></Header>,
            headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
          }}

          />
        <Stack.Screen 
          name = "Register" 
          component = {Register}

          options={{
            headerTitle: () => <Header name = "Healthify"/>,
            headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
          }}
          />

      </Stack.Navigator>
    );
  }

  //When user is signed in
  return (
    <Stack.Navigator>
    <Stack.Screen 
        name = "Home" 
        component = {Home}

        options={{
          headerTitle: () => <Header name = "Home"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
        <Stack.Screen 
        name = "Health" 
        component = {Health}

        options={{
          headerTitle: () => <Header name = "Health"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
        <Stack.Screen 
        name = "Resources" 
        component = {Resources}

        options={{
          headerTitle: () => <Header name = "Resources"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
        <Stack.Screen 
        name = "Weight" 
        component = {Weight}

        options={{
          headerTitle: () => <Header name = "Weight"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
        <Stack.Screen 
        name = "Sleep" 
        component = {Sleep}

        options={{
          headerTitle: () => <Header name = "Sleep"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
        <Stack.Screen 
        name = "FoodDrink" 
        component = {FoodDrink}

        options={{
          headerTitle: () => <Header name = "FoodDrink"/>,
          headerStyle: {
            height:98,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowRadius: 10,
            elevation: 25
          }
        }}

        
        />
    </Stack.Navigator>
  )
}

export default () => {
  return(
    <NavigationContainer>
        <App />
    </NavigationContainer>
  )
}