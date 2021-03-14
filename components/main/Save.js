import { Button, Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
export default function Save(props) {
  console.log(props.route.params);
  const { image } = props.route.params;

  const [caption, setCaption] = useState("");

  uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    const task = firebase.storage().ref().child(childPath);
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
