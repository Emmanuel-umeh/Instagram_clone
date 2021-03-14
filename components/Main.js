import React, { Component } from 'react'
import { connect } from 'react-redux'
// connect
export default class Main extends Component {

    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
