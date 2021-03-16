import { Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, FlatList, Image } from "react-native";
import { connect, bindActionCreators } from "react-redux";
import { fetchUser, fetchUserPosts } from "../../redux/actions/index";
import firebase from "firebase"
require("firebase/firestore")
class Profile extends Component {
  constructor(props) {
    super(props);


    this.state = {
        userPosts : [],
        user : null
    }
  }

  componentDidMount(){

    const {currentUser, posts} = this.props


    if(this.props.route.params.uid === firebase.auth().currentUser.uid){
        this.setState({
            user : currentUser,
            userPosts : posts
        })
    }else{  firebase
        .firestore()
        .collection("posts")
        .doc(this.props.route.params.uid)
        // .collection("userPosts")
        .get()
        .then((snapshot) => {
     
          if(snapshot.exists){
              this.setState({
                  user : snapshot.data()
              })
          }
        });
    
    }

  }


  renderItem = ({item}) => {
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
  render() {
    const { currentUser, posts } = this.props;
    // console.log({currentUser, posts})
    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text> {this.state.user && this.state.user.name}</Text>
          <Text> {this.state.user && this.state.user.email}</Text>
        </View>

        <View style={styles.containerGallery}>
          <View style={styles.containerImage}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={posts}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
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
});

export default connect(mapStateToProps, null)(Profile);
