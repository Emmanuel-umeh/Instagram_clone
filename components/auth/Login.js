import React, { Component } from 'react'


import { Text, View, TextInput, StyleSheet, Button  } from 'react-native'
import firebase from "firebase"
export default class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            email : "",
            password : ""

        }
    }

    signIn =  async()=>{

        try {
            const {email, password} = this.state
// if(email.length || password || !name){
//     console.log(
// }

var response  =await   firebase.auth().signInWithEmailAndPassword(email,password)

console.log({response})
        } catch (error) {
            console.log({error})
        }

    }
    render() {
        return (
            <View style = {styles.container}>


<TextInput placeholder = "email" onChangeText ={(email)=>{
    this.setState({
        email
    })
}}

/>
<TextInput 
secureTextEntry = {true}
 placeholder = "password" onChangeText ={(password)=>{
    this.setState({
        password
    })
}}

/>

<Button title = "Sign In" onPress = {this.signIn}></Button>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignContent : "center"
    }
})