import { View } from 'native-base'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Save(props) {
    console.log(props.route.params)
    const {image} = props.route.params
    return (
     <View style = {styles.container}>

<Image source = {{
    uri : image
}} />
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