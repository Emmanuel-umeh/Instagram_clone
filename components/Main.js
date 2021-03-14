import { Button, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// connect
class Main extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
      <View style = {styles.container}>
        <Text>
          User is Logged in
        </Text>

        <Button onPress={this.signOutUser} ><Text>SignOut</Text></Button>
      </View> 
        
        )
    }
}


export default connect(Main)