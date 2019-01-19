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
      height:6,
      width:6,
      borderRadius: 3,
      backgroundColor:'white'
    },
    faceRect: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 5,
      borderColor: 'white'
    },
    closeButton: {
      position: 'absolute',
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      left: 0
    }
  });

  export default styles