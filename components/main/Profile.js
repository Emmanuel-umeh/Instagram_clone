import { Button, Text, View } from "native-base";
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, FlatList, Image } from "react-native";
import { connect, bindActionCreators } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../redux/actions/index";
import firebase from "firebase";
require("firebase/firestore");


function Profile(props) {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     userPosts: [],
  //     user: null,
  //     following: false,
  //   };
  // }

  const [posts,setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)
  

   const Unfollow = ()=>{
    setFollowing(false)

    firebase.firestore().collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid).
    delete()
  }

  const Follow = ()=>{

    try {
      
    console.log("folowwing!!!!!!!!!!!!!!!")
    setFollowing(true)

    firebase.firestore().collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid).
  set({})
    } catch (error) {
      console.log({error})
    }

  }

  useEffect(()=>{

    const { currentUser, posts } = props;

    console.log("!!!!!!!!!!!!!!!!!", props.route.params.uid);

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      // this.setState({
      //   user: currentUser,
      //   userPosts: posts,
      // });

      setUser(currentUser)
      setPosts(posts)
    } else {

      console.log("uid doesnt match current logged user");

      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        // .collection("userPosts")
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());

          if (snapshot.exists) {
            // this.setState({
            //   user: snapshot.data(),
            // });
            setUser(snapshot.data())
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          // access the current user data
          // console.log({})
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fetching user posts" , snapshot)

          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          // this.setState({
          //   userPosts: posts,
          // });

          setPosts(posts)
        });
    }

    if(props.following.indexOf(props.route.params.uid) > -1){
console.log("updating followuing!!!!!!!")
      setFollowing(true)

    }else{
      setFollowing(false)
    }

  }, [props.route.params.uid, props.following])

  // componentDidMount() {
  //   const { currentUser, posts } = props;
  //   if (props.route.params.uid === firebase.auth().currentUser.uid) {
  //     this.setState({
  //       user: currentUser,
  //       userPosts: posts,
  //     });
  //   }else {
  //     firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(props.route.params.uid)
  //     // .collection("userPosts")
  //     .get()
  //     .then((snapshot) => {
  //       console.log(snapshot.data());

  //       if (snapshot.exists) {
  //         this.setState({
  //           user: snapshot.data(),
  //         });
  //       }
  //     });

  //   firebase
  //     .firestore()
  //     .collection("posts")
  //     .doc(props.route.params.uid)
  //     .collection("userPosts")
  //     .orderBy("creation", "asc")
  //     .get()
  //     .then((snapshot) => {
  //       // access the current user data
  //       // console.log({})
  //       // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!fetching user posts" , snapshot)

  //       let posts = snapshot.docs.map((doc) => {
  //         const data = doc.data();
  //         const id = doc.id;
  //         return { id, ...data };
  //       });
  //       this.setState({
  //         userPosts: posts,
  //       });
  //     });
  //   }
  // }

 
 const  renderItem = ({ item }) => {
    // console.log("rendering item!!!!!!!!!!!!!", item.downloadURL);

    return (
      <Image
        source={{
          uri: item.downloadURL,
        }}
        style={styles.image}
      />
    );
  };

    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text> {user && user.name}</Text>
          <Text> {user && user.email}</Text>

          {props.route.params.uid !== firebase.auth().currentUser.uid ? (
            <View>
              {following ? (
                <Button rounded   onPress={()=>{
                  Unfollow()
                }}>
                  <Text>Following</Text>
                </Button>
              ) : (
                <Button rounded onPress={()=>{
                 Follow()
                }}>
                  <Text>Follow</Text>
                </Button>
              )}
            </View>
          ) : null}
        </View>

        <View style={styles.containerGallery}>
          <View style={styles.containerImage}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    // alignContent : "center",
    // justifyContent : "center"
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    // width : 100
  },
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     fetchUser, fetchUserPosts
// }, dispatch)

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following : store.userState.following
});

export default connect(mapStateToProps, null)(Profile);
