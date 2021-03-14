import firebase from "firebase"

import {
    USER_STATE_CHANGED
} from "../constants/index"

export async function  fetchUser(){
    return((dispatch ) =>{
    let currentUser  = await   firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .get()

        if(currentUser.exists){

            console.log(currentUser.data())
            dispatch({
                type : USER_STATE_CHANGED, 
                currentUser : currentUser.data()
            })
        }else{
            console.log("no user exists")
        }
    })
}