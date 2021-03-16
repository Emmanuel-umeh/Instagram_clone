import React, { useState } from 'react'

import {Text, View,TextInput,FlatList} from "react-native"
import firebase from "firebase"
require("firebase/firebase")

export default function Search() {
    const [users, setUsers] = useState([])


    const fetchUsers = (search) =>{
        firebase.firestore.
    }
    return (
        <div>
            
        </div>
    )
}
