import React from 'react'
import {Text, View, StyleSheet, Button} from "react-native"

export default function Landing({navigation}) {
    return (

        <View style = {styles.container}>
       <Text>
            Landing Page
        </Text>


<Button
title = "Register"
onPress = {
    ()=> navigation.navigate("Register")
}

/>

<Button
title = "Login"
onPress = {
    ()=> navigation.navigate("Login")
}
/>


        </View>
    )
       
 
}


const styles = StyleSheet.create({
container : {
    flex :1,
    justifyContent : "center"
}

})

