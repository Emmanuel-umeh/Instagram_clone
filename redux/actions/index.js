import firebase from "firebase"

import {
    USER_STATE_CHANGED
} from "../constants/index"

export  function  fetchUser(){
    return((dispatch ) =>{
  firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .get().then(currentUser =>{
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

     
    })
}