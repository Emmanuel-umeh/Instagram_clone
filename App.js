import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBZPkQHvZgfepgveDNFh2gtXWsgmUGlPD8",
    authDomain: "instagram-clone-e9ae9.firebaseapp.com",
    projectId: "instagram-clone-e9ae9",
    storageBucket: "instagram-clone-e9ae9.appspot.com",
    messagingSenderId: "385013043078",
    appId: "1:385013043078:web:b850874aa580cfa0f1a607",
    measurementId: "G-Y98CMM4HNH"
  };

  if(firebase.apps.length === 0){

    firebase.initializeApp(firebaseConfig);
  }


const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName = "Landing">
        <Stack.Screen name = "Landing" component = {LandingScreen} options = {{
          headerShown : false
        }} />
        <Stack.Screen name = "Register" component = {RegisterScreen} options = {{
          headerShown : false
        }} />

      </Stack.Navigator>
    
  </NavigationContainer>
  );
}

