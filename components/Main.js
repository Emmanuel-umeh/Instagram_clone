import React, { Component } from 'react'
import { connect } from 'react-redux'
// connect
export default class Main extends Component {

    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
      <View style = {styles.container}>
        <Text>
          User is Logged in
        </Text>

        <Button onPress={this.signOutUser} title ="Sign out"></Button>
      </View> 
        
        )
    }
}
