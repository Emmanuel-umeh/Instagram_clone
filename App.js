import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import * as firebase from 'firebase';

import { Text, View, StyleSheet } from 'react-native';

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


export default class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      loaded : true,
      loggedIn  :false
    }
  }


  componentDidMount(){

firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
    
    console.log("user isnt logged in")
    this.setState({
      loading : true,
      loggedIn : false
    })
  }else{

    this.setState({
      loading : true,
      loggedIn : true
    })
  }
})

  }
  render() {

    const { loggedIn, loaded} = this.state

    if(!loaded){
      return(
        <View style = {styles.container}>
          <Text>loading</Text>
        </View>
      )
    }
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
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : "center"
  }
})