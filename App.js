import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem, BarCodeScanner, ImageManipulator } from 'expo';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <Camera
          style={{ height: windowHeight, width: windowWidth }} 
          type={Camera.Constants.Type.back}
          ref={ref => this.camera = ref}>
          <View>
            <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:0,bottom:0,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Zach!')}>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:0,left:windowWidth/2,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Ryan!')}>
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:windowHeight/2,left:windowWidth/2,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Siddha!')}>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
