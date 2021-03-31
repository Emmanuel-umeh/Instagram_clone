import { Button, Icon, Text, View } from 'native-base'
import {StyleSheet} from "react-native"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux"
import {fetchUser, fetchUserPosts, fetchUserFollowing}  from "../redux/actions/index"
import firebase from "firebase"

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from './main/Feed'

import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'

const Tab = createMaterialBottomTabNavigator();
// connect


const EmptyComponent = ()=>{
    return(
        null
    )
}
class Main extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUser()
        this.props.fetchUserPosts()
        this.props.fetchUserFollowing()
        this.props.fetchUserFollowing()
    }
    render() {

        const {currentUser} = this.props

        return (



        <Tab.Navigator initialRouteName = "Feed" labeled = {false}>
        <Tab.Screen name="Feed" component={FeedScreen} options ={{
            tabBarIcon : ({color , size}) =>(
                <Icon name = "home" style ={{
                    color : color,
                    fontSize : 25
                }} />
            )
        }} />
        <Tab.Screen name="Search" component={SearchScreen} options ={{
            tabBarIcon : ({color , size}) =>(
                <Icon name = "md-search-outline" style ={{
                    color : color,
                    fontSize : 25
                }} />
            )
        }} />
        <Tab.Screen name="AddContainer" component={EmptyComponent} 

        // overriding default tab navigator behavior to make it navigate to an entire new screen and hide the bott
        // om tab navigator
        listeners = {({
            navigation
        })=>({
            tabPress : event =>{
                event.preventDefault();
                navigation.navigate("Add")
            }
        }) }
        
        options ={{
            tabBarIcon : ({color , size}) =>(
                <Icon name = "ios-add-circle" style ={{
                    color : color,
                   fontSize : 25
                }} />
            )
        }} />
        <Tab.Screen name="Profile" 
           listeners = {({
            navigation
        })=>({
            tabPress : event =>{
                event.preventDefault();
                navigation.navigate("Profile", {uid : firebase.auth().currentUser.uid})
            }
        }) }
        
        component={ProfileScreen} options ={{
            tabBarIcon : ({color , size}) =>(
                <Icon name = "ios-person" style ={{
                    color : color,
                   fontSize : 25
                }} />
            )
        }} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
        


        // <Button onPress={this.signOutUser} ><Text>SignOut</Text></Button>
   
        )
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser, fetchUserPosts, fetchUserFollowing
}, dispatch)

const mapStateToProps =(store)=>({
    currentUser : store.userState.currentUser
    
})

export default connect( mapStateToProps, mapDispatchToProps)(Main)


const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : "center",
      alignContent : "center"
    }
  })