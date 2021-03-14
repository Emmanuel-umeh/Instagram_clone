import { Button, Text, View } from 'native-base'
import {StyleSheet} from "react-native"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux"
import {fetchUser}  from "../redux/actions/index"


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

        console.log({currentUser})
        return (
      <View style = {styles.container}>

          {currentUser ?
          
          <Text>
          {currentUser.name} is Logged in
        </Text> : 
        
        
        <Text>
        Loading...
      </Text>
        }
       

        <Button onPress={this.signOutUser} ><Text>SignOut</Text></Button>
      </View> 
        
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