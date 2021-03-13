import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button  } from 'react-native'
export default class Register extends Component {

    constructor(props){
        super(props)

        this.state = {
            email : "",
            password : "",
            name : ""

        }
    }

    signUp = ()=>{
        
    }
    render() {
        return (
            <View>

<TextInput placeholder = "name" onChangeText ={(name)=>{
    this.setState({
        name
    })
}}

/>
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

<Button title = "Sign Up" onPress = {this.signUp}></Button>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center"
    }
})