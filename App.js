import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem, BarCodeScanner, ImageManipulator, FaceDetector, takeSnapshotAsync } from 'expo';
import { Dimensions } from 'react-native';

import styles from './styles'

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

const FaceComponent = face => {
  const { bounds, rightEyePosition, leftEyePosition, rightEarPosition, leftEarPosition, mouthPosition, leftMouthPosition, rightMouthPosition, noseBasePosition, leftCheekPosition, rightCheekPosition, rollAngle } = face.face;
  console.log(rightEyePosition)
  return (
      <View>
        {/* Face dot map */}
        <View style={[styles.faceDot, {top: rightEyePosition.y,left: rightEyePosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: leftEyePosition.y,left: leftEyePosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: rightEarPosition.y,left: rightEarPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: leftEarPosition.y,left: leftEarPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: mouthPosition.y,left: mouthPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: leftMouthPosition.y,left: leftMouthPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: rightMouthPosition.y,left: rightMouthPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: noseBasePosition.y,left: noseBasePosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: leftCheekPosition.y,left: leftCheekPosition.x}]}>
        </View>
        <View style={[styles.faceDot, {top: rightCheekPosition.y,left: rightCheekPosition.x}]}>
        </View>
        {/* Face rect */}
        <View style = {[styles.faceRect, {top: bounds.origin.y, left: bounds.origin.x, width: bounds.size.width, height: bounds.size.height, transform:[{rotate:  `${rollAngle} deg`}]}]}>
        </View>
      </View>
  )
};

export default class App extends React.Component {ß

  state = {
    faces: [],
    previewPaused: false
  }

  _takePicture = async () => {
    const { previewPaused } = this.state;
    if (this.camera && !previewPaused) {
      // let photo = await this.camera.takePictureAsync({quality: 0.3})
      this.camera.pausePreview()
      this.setState({previewPaused: true})
      let photo = await takeSnapshotAsync(this.camera, {format: 'jpg', quality: 1}).catch(e => console.log(e))
    }
  }

  _resumePreview = () => {
    if (this.camera) {
      this.camera.resumePreview()
      this.setState({previewPaused: false})
    }
  }

  _handleFaceDetection = ({ faces }) => {
    this.setState({ faces: faces })
  }

  _handleDisplayCancelButton = () => {
    const { previewPaused } = this.state;
    if (previewPaused) {
      return (
        <View style={[styles.buttonContainer, {left: 20}]}>
          <Text style={styles.buttonText} onPress={this._resumePreview}>X
          </Text>
        </View>
      )
    }
  }

  _handleDisplayUploadButton = () => {
    const { previewPaused } = this.state;
    if (previewPaused) {
      return (
        <View style={[styles.buttonContainer, {right: 20}]}>
          <Text style={styles.buttonText} onPress={this._resumePreview}>Ok
          </Text>
        </View>
      )
    }
  }

  render() {
    const { faces, previewPaused } = this.state; 
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
          if (!previewPaused) {
            return (
              <FaceComponent key={index} face={face}/>
            )
          }
          })}
        </View>
        {this._handleDisplayCancelButton()}
        {this._handleDisplayUploadButton()}
        <TouchableOpacity style = {styles.cameraButton} onPress = {this._takePicture}>
        </TouchableOpacity>
      </View>
    );
  }
}
