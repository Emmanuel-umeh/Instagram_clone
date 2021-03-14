import firebase from "firebase"

export async function  fetchUser(){
    return((dispatch ) =>{
    let currentUser  = await   firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .get()

        if(currentUser.exists){
            dispatch({
                type : USER_STATE_CHANGED, 
                currentUser : currentUser.data
            })
        }
    })
}