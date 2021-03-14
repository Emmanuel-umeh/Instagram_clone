import firebase from "firebase"

export function fetchUser(){
    return((dispatch ) =>{
        firebase.firestore().collection('users')
    })
}