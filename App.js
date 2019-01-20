import React from 'react';
import AppLink from 'react-native-app-link';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Animated, StatusBar } from 'react-native';
import { Camera, Permissions, FileSystem, BarCodeScanner, ImageManipulator, FaceDetector, takeSnapshotAsync, Asset } from 'expo';

import styles from './styles'

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

const FaceComponent = face => {
  const { bounds, rightEyePosition, leftEyePosition, rightEarPosition, leftEarPosition, mouthPosition, leftMouthPosition, rightMouthPosition, noseBasePosition, leftCheekPosition, rightCheekPosition, rollAngle } = face.face;
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

export default class App extends React.Component {

  constructor(props) {
    super(props)
    Asset.fromModule(require('./assets/zucc.jpg')).downloadAsync()
    this.showFaceAnimation = new Animated.ValueXY({ x: windowWidth / 2 - 150, y: windowHeight - 10 })
    this.showCameraButtonAnimation = new Animated.ValueXY({ x: windowWidth / 2 - 40, y: windowHeight - 65 })
    this.showZuccButtonAnimation = new Animated.Value(20);
  }

  state = {
    faces: [],
    previewPaused: false,
    croppedImage: null,
    personData: null,
    isFetchingUser: false,
    showingPointPerson: null,
    showingCameraButton: false,
    showingZuccData: false
  }

  componentDidUpdate(prevProps, prevState) {
    const { 
      faces, previewPaused, croppedImage, personData, isFetchingUser, showingPointPerson,
      showingCameraButton 
    } = this.state; 

    const showPointPerson = faces.length === 0 && personData === null && !isFetchingUser;
    if (showingPointPerson !== showPointPerson || showingPointPerson === null) {
      this._handleShowPointToFace(showPointPerson)
      this.setState({ showingPointPerson: showPointPerson })
    }

    const showCameraButton = faces.length > 0 && !previewPaused;
    if (showingCameraButton !== showCameraButton) {
      this._handleShowCameraButton(showCameraButton)
      this.setState({ showingCameraButton: showCameraButton })
    }
  }

  _takePicture = async faceIndex => {
    const { previewPaused, faces } = this.state;
    if (this.camera && !previewPaused && faces.length > 0) {
      this.setState({ isFetchingUser: true })
      let photo = await this.camera.takePictureAsync({quality: 0.3,base64:true})
      //onsole.log(p)
      //let d = await FileSystem.readAsStringAsync(photo.uri)
      this.camera.pausePreview()
      this.setState({previewPaused: true})
      //let photo = await takeSnapshotAsync(this.camera, {format: 'jpg', quality: 1}).catch(e => console.log(e))
      let face = faces[faceIndex]
      const { x, y } = face.bounds.origin
      const { width, height } = face.bounds.size
      //let croppedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [ {crop: {originX: x, originY: y, width: width, height: height}} ])
      //this.setState({ croppedImage: croppedPhoto.uri })
      const body = new FormData();
      body.append('image', photo.base64)
      fetch('http://35.243.237.151/upload', {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: 'POST',
        mode: 'cors',
        body: body
      })
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          console.log(json[0])
          this.setState({ personData: json[0] })
        } else {
          this.setState({ personData: 'error' })
        }
      })
      .catch(e=> {
        this.setState({ personData: 'error' })
        console.log(e)
      })
      .finally(() => this.setState({ isFetchingUser: false }))
    }
  }

  _handleFaceDetection = ({ faces }) => {
    this.setState({ faces: faces })
  }

  _handleModalPress = () => {
    this.setState({ personData: null, previewPaused: false, showingZuccData: false })
    if (this.camera) this.camera.resumePreview();
  }

  _openInstagram = instagramUsername => {
    AppLink.maybeOpenURL(`instagram://user?username=${instagramUsername}`, { appName: 'Instagram', appStoreId: '389801252' }).catch(e=>console.log(e))
  }

  _handleShowPointToFace = show => {
    this.setState({ animatingPointToFace: true }, () => {
      Animated.spring(this.showFaceAnimation, {
        toValue: { x: windowWidth / 2 - 150, y: windowHeight - (show ? 80 : 0) },
      }).start()
    })
  }

  _handleShowCameraButton = show => {
    this.setState({ animatingCameraButton: true }, () => {
      Animated.spring(this.showCameraButtonAnimation, {
        toValue: { x: windowWidth / 2 - 40, y: windowHeight - (show ? 100 : 0) },
      }).start()
    })
  }

  _handleZuccPress = () => {
    this.setState({ showingZuccData: true }, () => {
      Animated.spring(this.showingZuccData, {
        toValue: 50,
      }).start()
    })
  }

  render() {
    const { 
      faces, previewPaused, croppedImage, personData, isFetchingUser, showingPointPerson,
      showingCameraButton, showingZuccData 
    } = this.state; 

    //if (croppedImage) console.log(croppedImage);
    let faceIndex;
    if (faces.length > 0) {
      let maxArea = 0;
      for(let i = 0; i < faces.length; i++) {
        const { width, height } = faces[i].bounds.size;
        let area = width * height;
        if (area > maxArea) {
          faceIndex = i;
          maxArea = area;
        }
      }
    }

    return (
      <View style={styles.container} >
        <StatusBar hidden={true}/>
        <Camera
          style={styles.cameraContainer} 
          type={Camera.Constants.Type.back}
          ref={ref => this.camera = ref}
          onFacesDetected={this._handleFaceDetection}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.none}}>
            <View style={styles.faceContainer}>
              {!previewPaused && faceIndex >= 0 && <FaceComponent face={faces[faceIndex]}/>}
              {croppedImage && <Image source={{uri:croppedImage}} style={{height:500,width:500,resizeMode:'contain'}}/>}
            </View>

            <View style={{alignItems:'center',justifyContent:'center',height:'100%',backgroundColor:'transparent', width: '100%'}}>
              <Animated.View style={[styles.pointToPersonContainer, this.showFaceAnimation.getLayout()]}>
                <Text style={styles.pointToPerson}>Show me a face!</Text>
              </Animated.View>
            </View>

            <Animated.View style={[{position:'absolute',height:80,width:80},this.showCameraButtonAnimation.getLayout()]}>
              <TouchableOpacity style={[styles.cameraButton,{flex:1}]} onPress = {() => this._takePicture(faceIndex)}/>
            </Animated.View>
        </Camera>

        <Modal visible={personData !== null && personData !== 'error'} transparent={true} animationType='fade'>
          {previewPaused && personData &&
            <View style={{alignItems:'center',justifyContent:'center',height:'100%',backgroundColor:'rgba(0,0,0,0.5)'}} >
              <View style={styles.card}>
                <Text style={styles.cardNameText}>{personData.name}</Text>
                <Image source={{uri:personData.instagramPicUrl}} style={styles.cardProfilePicture} />
                <Text style={styles.cardSocialText}>IG: @{personData.instagramLink}</Text>
                {showingZuccData && 
                  <View style={{alignItems:'center',width:300,backgroundColor:'#3b5998',paddingTop:10,paddingBottom:10}}>
                    <Text style={styles.zuccDataText}>{personData.phoneNumber}</Text>
                    <Text style={styles.zuccDataText}>{personData.email}</Text>
                    <Text style={styles.zuccDataText}>Single ❤️</Text>
                  </View>
                }
                <View>
                  <TouchableOpacity style={[styles.cardButton, {marginBottom: 10}]} onPress={() => this._openInstagram(personData.instagramLink)}>
                    <Text style={styles.cardButtonText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cardButton} onPress={this._handleModalPress}>
                    <Text style={styles.cardButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>

              
                <Animated.View style={[{width:200,height:60},{marginTop:this.showZuccButtonAnimation}]}>
                  <TouchableOpacity style={styles.zuccButton} onPress={this._handleZuccPress}>
                    <Image source={require('./assets/zucc.jpg')} style={styles.zuccFace}></Image>
                    <Text style={styles.zuccButtonText}>Zucc 👀</Text>
                  </TouchableOpacity>
                </Animated.View>
              
            </View>
          }
        </Modal>
        <Modal visible={personData === 'error'} transparent={true} animationType='fade'>
          {personData === 'error' && 
              <View style={{alignItems:'center',justifyContent:'center',height:'100%',backgroundColor:'rgba(0,0,0,0.5)'}} >
                <View style={styles.card}>
                  <Text style={styles.cardTitleText}>Error</Text>
                  <Text style={[styles.cardBodyText, {justifyContent: 'center'}]}>Error finding face. Try taking another picture, making sure that the person's face is in full view.</Text>
                  <TouchableOpacity style={styles.cardButton} onPress={this._handleModalPress}>
                    <Text style={styles.cardButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
        </Modal>
      </View>
    );
  }
}
