import React, { useState, useEffect } from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Icon, Text, View, } from 'native-base';

export default function Add() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (

    <View style = {styles.container}>



    <View style={styles.cameraContainer}>
      <Camera style={styles.fixedRatio} type={type}
      ratio = {'1:1'}
      
      />

      
    </View>
    <View style={styles.buttonContainer}>
<Icon name = "home"
  style={styles.button}
  onPress={() => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }}>
  {/* <Text style={styles.text}> Flip </Text> */}
</Icon>
</View>


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
    }
 }); 