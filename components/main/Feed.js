import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

export default class Feed extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>On the feed page</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex :1,
        alignContent : "center",
        justifyContent : "center"
    }
})