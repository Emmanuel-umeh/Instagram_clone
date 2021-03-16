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
          <View style = {styles.container}>
                <View style = {styles.containerInfo}>
                <Text> {currentUser && currentUser.name}</Text>
                <Text> {currentUser && currentUser.email}</Text>
            </View>

            <View style = {styles.containerGallery}>

                <FlatList numColumns = {3}
                    horizontal = {false}

                    data = {posts}
                    renderItem = {({item}) =>{
                        <Image 
                        source =  {{
                            uri : item.downloadURL
                        }}

                        style = {styles.image}
                        />
                    }}
                />

            </View>
          </View>
        )
    }
}




const styles = StyleSheet.create({
    container : {
        flex :1,
        marginTop : 40
        // alignContent : "center",
        // justifyContent : "center"
    },
    containerInfo : {
      margin : 20
    },
    containerGallery : {
     flex : 1
    },
    image : {
        flex : 1,
        aspectRatio : 1/1
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
