import firebase from "firebase";

import { USERS_DATA_STATE_CHANGED, USERS_POSTS_STATE_CHANGED, USER_FOLLOWING_STATE_CHANGE, USER_POST_STATE_CHANGED, USER_STATE_CHANGED } from "../constants/index";

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

          // console.log({posts})
          dispatch({
            type: USER_POST_STATE_CHANGED,
            posts: posts,
          });
       
      });
  };
}
// fetch the users the user is following
export function fetchUserFollowing() {
  return (dispatch) => {



    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
   
          // access the current user data
          // console.log({})
        
          let following = snapshot.docs.map((doc)=>{

              const id = doc.id;
              return id
          })

          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fetching user following" , following)


          // console.log({posts})
          dispatch({
            type: USER_FOLLOWING_STATE_CHANGE,
            following: following,
          });

          for(let i =0; i<following.length; i++){
            dispatch(fetchUsersData(following[i]))
          }
       
      });
  };
}

// fetch data for all the users
export function fetchUsersData(uid){

  return((dispatch, getState)=>{

    // check if the user exists in our array
      const found = getState().usersState.users.some(el =>el.uid === uid)

    if(!found){
firebase.firestore().collection("users").doc(uid).get()
.then(snapshot =>{
  if(snapshot.exists){ 
    let user = snapshot.data()
    user.uid = snapshot.id
    

    dispatch({
      type : USERS_DATA_STATE_CHANGED,
      user
    })

    dispatch(
      fetchUsersFollowingPosts(user.id)
    )
  }
})    }
  })
}


// fetch the postas of the users the current user is foollowing
export function fetchUsersFollowingPosts(uid) {
  return (dispatch) => {



    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {


        const uid = snapshot.query.EP.path.segments[1]


        const uid = snapshot.query.EP.path.segments[1]
        console.log({snapshot, uid})
   
        const user = getState().usersState.users.find(el =>el.uid === uid)

          let posts = snapshot.docs.map((doc)=>{
              const data = doc.data()
              const id = doc.id;
              return {id, ...data, user}
          })

          // console.log({posts})

          console.log({posts})
          dispatch({
            type: USERS_POSTS_STATE_CHANGED,
            posts: posts,
            uid
          });

          console.log(getState())
       
      });
  };
}