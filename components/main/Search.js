import React, { useState } from 'react'

import {Text, View,TextInput,FlatList} from "react-native"
import { Container, Header, Content, List, ListItem } from 'native-base';
import firebase from "firebase"
require("firebase/firebase")

export default function Search() {
    const [users, setUsers] = useState([])

    renderItem = ({item})=>{
        return(

            <View>

            </View>
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
     <View>
         <TextInput onChange = {(search)=>{
             fetchUsers(search)
         }} />


         <FlatList 
         numColumns = {1}
         data = {users}
         horizontal = {false}
         renderItem = {renderItem}
         
         />

     </View>
    )
}
