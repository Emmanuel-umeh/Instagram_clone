import { Button, Text, View } from 'native-base'
import {StyleSheet} from "react-native"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux"
import {fetchUser}  from "../redux/actions/index"


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed'

const Tab = createBottomTabNavigator();
// connect
class Main extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUser()
    }
    render() {

        const {currentUser} = this.props

        return (



        <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} options ={{
            tabBarIcon
        }} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
        


        // <Button onPress={this.signOutUser} ><Text>SignOut</Text></Button>
   
        )
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchUser
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