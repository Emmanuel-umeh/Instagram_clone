import firebase from "firebase";

import { USER_POST_STATE_CHANGED, USER_STATE_CHANGED } from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((currentUser) => {
        if (currentUser.exists) {
          // access the current user data
        //   console.log(currentUser.data())
          dispatch({
            type: USER_STATE_CHANGED,
            currentUser: currentUser.data(),
          });
        } else {
          console.log("no user exists");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {



    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
   
          // access the current user data
          // console.log({})
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fetching user posts" , snapshot)

          let posts = snapshot.docs.map((doc)=>{
              const data = doc.data()
              const id = doc.id;
              return {id, ...data}
          })

          console.log({posts})
          dispatch({
            type: USER_POST_STATE_CHANGED,
            posts: posts,
          });
       
      });
  };
}
