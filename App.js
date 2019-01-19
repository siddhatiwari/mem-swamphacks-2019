import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem, BarCodeScanner, ImageManipulator, FaceDetector } from 'expo';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 50, 
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'gray'
  },
  faceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    width: windowWidth
  }
});

const FaceComponent = face => {
  const { rightEyePosition, leftEyePosition } = face.face;
  console.log(rightEyePosition)
  return (
      <View>
        <View style={{position: 'absolute', top: rightEyePosition.y,left: rightEyePosition.x,height:10,width:10,backgroundColor:'red'}}></View>
      <View style={{position: 'absolute', top: leftEyePosition.y,left: leftEyePosition.x,height:10,width:10,backgroundColor:'red'}}></View>
      </View>
  )
};

export default class App extends React.Component {

  state = {
    faces: []
  }

  _renderButtons = () => (
    <View>
      <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:0,bottom:0,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Zach!')}>
      </TouchableOpacity>
      <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:0,left:windowWidth/2,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Ryan!')}>
      </TouchableOpacity>
      <TouchableOpacity style={{position:'absolute',backgroundColor:'transparent',top:windowHeight/2,left:windowWidth/2,height:windowHeight,width:windowWidth/2}} onPress={() => alert('Thats Siddha!')}>
      </TouchableOpacity>
    </View>
  )

  _takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
    }
  }

  _handleFaceDetection = ({ faces }) => {
    this.setState({ faces: faces })
  }

  render() {
    const { faces } = this.state; 
    return (
      <View style={styles.container} >
        <Camera
          style={{ height: windowHeight, width: windowWidth }} 
          type={Camera.Constants.Type.back}
          ref={ref => this.camera = ref}
          onFacesDetected={this._handleFaceDetection}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.none}}>
          
        </Camera>
        <View style={styles.faceContainer}>
        {faces.map((face, index) => {
            return (
              <FaceComponent key={index} face={face}/>
            )
          })}
          </View>
        <TouchableOpacity style = {styles.cameraButton} onPress = {this._takePicture}></TouchableOpacity>

      </View>
    );
  }
}
