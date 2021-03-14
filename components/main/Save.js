import { Button, Text, View } from 'native-base'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react/cjs/react.development'

export default function Save(props) {
    console.log(props.route.params)
    const {image} = props.route.params

    const [caption, setCaption] = useState("")
    return (
     <View style = {styles.container}>

<Image source = {{
    uri : image
}} />

<TextInput placeholder = "Write a caption. . ." onChangeText ={setCaption} />

<Button><Text>Save</Text></Button>
     </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    image : {

    }
})