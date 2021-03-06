import React, { useState } from 'react'

import {Text, View,TextInput,FlatList, StyleSheet, TouchableOpacity} from "react-native"
import { Container, Header, Content, List, ListItem } from 'native-base';
import firebase from "firebase"
require("firebase/firestore")

export default function Search(props) {
    const [users, setUsers] = useState([])

    const renderItem = ({item})=>{
        return(

       
            <ListItem>

                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("Profile", {
                        uid : item.id
                    })
                }}>
                <Text>{item.name}</Text>
                </TouchableOpacity>
     
            </ListItem>
          
        )    }


    const fetchUsers = (search) =>{
        firebase.firestore()
        .collection("users")
        .where("name" , ">=" , search)
        .get()
        .then((snapshot)=>{
            let users = snapshot.docs.map((doc)=>{
                const data = doc.data()
                const id = doc.id

                return({id, ...data})

            })


            setUsers(users)
        })
    }
    return (
     <Container>

         <View style = {{
             flex : 1
         }}>

       
         <TextInput placeholder = "Search..." onChangeText = {(search)=>{
             fetchUsers(search)
         }} />

<List
numColumns = {1}
dataArray = {users}
horizontal  = {false}
renderItem = {renderItem}
>
         {/* <FlatList 
         numColumns = {1}
         data = {users}
         horizontal = {false}
         renderItem = {renderItem}
         
         /> */}
  </List>

  </View>
     </Container>
    )
}
