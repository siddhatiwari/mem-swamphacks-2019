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
    cameraContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: windowHeight,
      width: windowWidth,
    },  
    cameraButton: {
      position: 'absolute',
      backgroundColor: 'transparent',
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
    },
    card: {
      backgroundColor: 'white',
      padding: 20,
      paddingTop: 40,
      width: 300,
      height: 500,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardNameText: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 24
    },
    cardSocialText: {
      fontFamily: 'AvenirNext-Regular',
      fontSize: 17
    },
    cardButton: {
      backgroundColor: 'purple',
      width: 200,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardProfilePicture: {
      backgroundColor: 'gray',
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    cardButtonText: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 17,
      color: 'white'
    },
    cardTitleText: {
      fontFamily: 'AvenirNext-Bold',
      fontSize: 30
    },
    cardBodyText: {
      fontFamily: 'AvenirNext-Regular',
      fontSize: 17,
      textAlign: 'center'
    },
    pointToPerson: {
      fontFamily: 'Avenir Next',
      fontWeight: '600',
      fontSize: 17,
      color: 'black',
      alignItems: 'center'
    },
    pointToPersonContainer: {
      position:'absolute',
      backgroundColor: 'white',
      padding: 20,
      width: 300,
      height: 60,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    zuccFace: {
      backgroundColor: 'purple',
      width: 45,
      height: 45,
      borderRadius: 22.5
    },
    zuccButton: {
      backgroundColor: '#3b5998',
      width: 200,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      shadowOffset:{  width: 0,  height: 10,  },
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOpacity: 1.0,
      shadowRadius: 15
    },
    zuccButtonText: {
      color: 'white',
      fontFamily: 'AvenirNext-Bold',
      fontSize: 17,
      marginLeft: 15
    },
    zuccDataText: {
      color: 'white',
      fontFamily: 'Avenir Next',
      fontWeight: '500',
      fontSize: 17,
    }
  });

  export default styles