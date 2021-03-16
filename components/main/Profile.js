import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, FlatList, Image } from 'react-native'
import { connect, bindActionCreators } from 'react-redux'
import {fetchUser, fetchUserPosts}  from "../../redux/actions/index"
 class Profile extends Component {
     constructor(props){
         super(props)
     }

     componentDidMount(){

        const {currentUser, posts} = this.props
        console.log({currentUser, posts})

     }
    render() {
        const {currentUser, posts} = this.props
        return (
          
        )
    }
}




const styles = StyleSheet.create({
    container : {
        flex :1,
        alignContent : "center",
        justifyContent : "center"
    },
    containerInfo : {
      margin : 20
    }
})

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     fetchUser, fetchUserPosts
// }, dispatch)

const mapStateToProps =(store)=>({
    currentUser : store.userState.currentUser,
    posts : store.userState.posts
    
})

export default connect( mapStateToProps, null)(Profile)
