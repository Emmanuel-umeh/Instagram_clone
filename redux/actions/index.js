import firebase from "firebase";

import { USER_STATE_CHANGED } from "../constants/index";

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
          // console.log(currentUser.data())
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
      .then((posts) => {
        if (posts.exists) {
          // access the current user data
          // console.log(posts.data())
          dispatch({
            type: USER_STATE_CHANGED,
            posts: posts.data(),
          });
        } else {
          console.log("no user exists");
        }
      });
  };
}
