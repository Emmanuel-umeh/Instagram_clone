import { Button, Text, View } from "native-base";
import React, {useState} from "react";
import { Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
export default function Save(props) {
  console.log(props.route.params);
  const { image } = props.route.params;

  const [caption, setCaption] = useState("");


  const savePostData = (downloadURL)=>{

  }

 const  uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = snapShot =>{
        console.log(`transferred : ${snapShot.bytesTransferred}`)
    }

    const taskCompleted = () =>{
        task.snapshot.ref.getDownloadURL().then((snapshot)=>{
            console.log({snapshot})

            savePostData(snapshot)
        }) 
    }
    const taskError = snapShot =>{
        // snapShot.ref.getDownloadUrl().then((snapshot)=>{
            console.log({snapShot})
        // })
    }


    task.on('state_changed' , taskProgress, taskError, taskCompleted)
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
      />

      <TextInput placeholder="Write a caption. . ." onChangeText={setCaption} />

      <Button
        block
        onPress={() => {
          uploadImage();
        }}
      >
        <Text>Save</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {},
});
