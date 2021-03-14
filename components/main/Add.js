import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'native-base';

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



    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
      
      />
    </View>

<View style={styles.buttonContainer}>
<Button
  style={styles.button}
  onPress={() => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }}>
  <Text style={styles.text}> Flip </Text>
</Button>
</View>

</View>
  );
}




const styles = StyleSheet.create({ 

    container : {
        flex : 1
    },
    camera : {
        flex : 1
    },
    buttonContainer : {
        flexDirection : "row",
        flex : 1,
        backgroundColor  : "transparent"
    },
    button  : {
        flex : 0.1,
        alignSelf : "flex-end", 
        alignItems : "center"
    },
    text : {
        fontSize : 18,
        marginBottom : 10,
        color : "white"
    }
 }); 