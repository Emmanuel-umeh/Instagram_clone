import React, { useState, useEffect } from 'react';
import { StyleSheet,TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Icon, Text, View, } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
export default function Add() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const camera_status = await Camera.requestPermissionsAsync();
      setHasCameraPermission(camera_status.status === 'granted');


      if (Platform.OS !== 'web') {
        const  gallery_status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (gallery_status.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }else{


            setHasGalleryPermission(gallery_status.status === 'granted');


        }

      }
    })();
  }, []);


  const takePicture = async() =>{
if(camera){
    const data = await camera.takePictureAsync(null)
    // console.log(data.uri)

    setImage(data.uri)
}
  }

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === null) {
    return <Text>No access to camera</Text>;
  }
  return (

    <View style = {styles.container}>



    <View style={styles.cameraContainer}>
      
      <Camera 
      ref = {ref =>setCamera(ref)}
      style={styles.fixedRatio} type={type}
      ratio = {'1:1'}
      
      />

      
    </View>
    <View style={styles.buttonContainer}>

    <TouchableOpacity  style={styles.button}   onPress={() => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }}>
    <Icon style ={{
        color : "white",
         fontSize : 35
    }} name = "swap-horizontal"
 
>
  {/* <Text style={styles.text}> Flip </Text> */}
</Icon>

    </TouchableOpacity>

</View>

<View style= {styles.take_picture_container}>
    <Button onPress = {takePicture} ><Text>Take Picture</Text></Button>
</View>

{image && 
<Image style ={
    styles.image_preview
} source = {{uri : image}}/>}


</View>
  );
}





const styles = StyleSheet.create({ 

    container : {
        flex : 1
    },
    cameraContainer : {
        flex : 1,
        flexDirection  : "row",
         position : "absolute"
    },
    fixedRatio : {
        flex : 1,
        aspectRatio : 1
    },
    buttonContainer : {
        flexDirection : "row",
        flex : 1,
        backgroundColor  : "transparent"
    },
    button  : {
        flex : 0.15,
        alignSelf : "center", 
        alignItems : "center",
        color : "white", 
        fontSize :35,
        marginTop : 70,
        marginLeft : 30
    },
    text : {
        fontSize : 18,
        marginBottom : 10,
        color : "white"
    },
    take_picture_container : {
        // flex : 1,
        // flexDirection : "row", 
        // alignItems : "center",
        // top :300 

        alignSelf : "center"
    },
    image_preview : {
        flex : 1
    }
 }); 