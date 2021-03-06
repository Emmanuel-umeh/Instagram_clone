import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import LoginScreen from "./components/auth/Login"
import * as firebase from 'firebase';

import { Text, View, StyleSheet, Button } from 'react-native';
import store from "./redux/store"
import MainScreen from "./components/Main"
import { Provider } from 'react-redux';
// import AddScreen from './components/Main/Add'
import AddScreen from './components/main/Add';
// import AddScreen from './components/Main/Add'
import SaveScreen from './components/main/Save';
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
      loaded : false,
      loggedIn  :false
    }
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}


  componentDidMount(){


firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
    
    console.log("user isnt logged in")
    this.setState({
      loaded : true,
      loggedIn : false
    })
  }else{

    this.setState({
      loaded : true,
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

    if(!loggedIn){
      return (
        <NavigationContainer>
  
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name = "Landing" component = {LandingScreen}  />
          <Stack.Screen name = "Register" component = {RegisterScreen}  />
          <Stack.Screen name = "Login" component = {LoginScreen}  />
  
        </Stack.Navigator>
      
    </NavigationContainer>
      )
    }


    if(loggedIn){
      return(

        <Provider store = {store}>
<NavigationContainer>



<Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name = "Landing" component = {MainScreen} />
          <Stack.Screen name = "Add" component = {AddScreen} />
          <Stack.Screen name = "Save" component = {SaveScreen} navigation = {this.props.navigation} />
          {/* <Stack.Screen name = "Register" component = {RegisterScreen} />
          <Stack.Screen name = "Login" component = {LoginScreen} />
   */}
        </Stack.Navigator>


        </NavigationContainer>
{/* <MainScreen /> */}
        </Provider>

      )
    }
      
    
   
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : "center"
  }
})