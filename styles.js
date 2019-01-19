import { StyleSheet, Dimensions } from 'react-native';

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
      borderColor: 'white'
    },
    faceContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: windowHeight,
      width: windowWidth
    },
    faceDot: {
      position: 'absolute',
      height:2,
      width:2,
      borderRadius: 1,
      backgroundColor:'orange'
    },
    faceRect: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'orange'
    },
    buttonContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      width: 100,
      height: 50,
      bottom: 20,
      alignItems: 'center'
    },
    buttonText: {
      position: 'absolute',
      bottom: 20,
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold'
    }
  });

  export default styles