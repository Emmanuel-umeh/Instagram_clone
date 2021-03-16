import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'

export default class Profile extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>On the Profile page</Text>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser, fetchUserPosts
}, dispatch)

const mapStateToProps =(store)=>({
    currentUser : store.userState.currentUser
    
})

export default connect( mapStateToProps, mapDispatchToProps)(Profile)
