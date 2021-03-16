import React, { useState } from 'react'

import {Text, View,TextInput,FlatList, SafeAreaView} from "react-native"
import { Container, Header, Content, List, ListItem } from 'native-base';
import firebase from "firebase"
require("firebase/firestore")

export default function Search() {
    const [users, setUsers] = useState([])

    const renderItem = ({item})=>{
        return(

       
            <ListItem>
              <Text>{item.name}</Text>
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

        <SafeAreaView>
     <View>
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
        </SafeAreaView>

    )
}
