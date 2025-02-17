import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ComparisonSlider from '../components/ComparisonSlider';
import {auth} from '../firebase/firebase.config';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';
import {signOut} from 'firebase/auth';

export default function SliderFrameScreen() {
  const [hideDivider, setHideDivider] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {imageA, imageB} = route.params;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userName = route.params?.userInfo?.user?.name;
  const googleEmail = route.params?.userInfo?.user?.email;
  const userEmail = route.params.userEmail;

  const viewShotRef = useRef();

  const signUpHandler = () => {
    navigation.replace('SignUp');
  };

  const signInHandler = () => {
    navigation.replace('SignIn');
  };

  const saveCombinedImage = async () => {
    setHideDivider(true);
    const uri = await viewShotRef.current.capture();

    try {
      // if (userLoggedIn) {
      const user = auth.currentUser;
      if (user) {
        const userEmail =
          user.email || (user.providerData[0] && user.providerData[0].email);
        // const imageFileName = `combined_${userEmail}.jpg`;
        const reference = storage().ref(
          `${userEmail}${'/'}images/${new Date()}`,
        );
        // path to existing file on filesystem
        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/test.jpg`;
        // uploads file
        await reference.putFile(uri);
        console.log('FILE uploaded to Firebase by email');
        alert('Image Saved Successfully.');
      } else if (googleEmail) {
        const reference = storage().ref(
          `${googleEmail}${'/'}images/${new Date()}`,
        );
        // path to existing file on filesystem
        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/test.jpg`;
        // uploads file
        await reference.putFile(uri);
        console.log('FILE uploaded to Firebase by user google mail');
        alert('Image Saved Successfully.');
      }

      // if (!userEmail || userName) {
      //   console.log('User email not available.');
      //   return;
      // }
      else {
        const deviceId = DeviceInfo.getUniqueIdSync();
        const reference = storage().ref(`guests/${deviceId}/${new Date()}`);
        await reference.putFile(uri);
        console.log('FILE uploaded to Firebase by devId');

        alert('Image Saved Successfully.');
      }
      // }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save images.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const imagePath = uri.replace('file://', ''); // Remove the 'file://' prefix

        try {
          // Save the image to the local gallery
          await CameraRoll.save(imagePath);
          console.log('Combined image saved to gallery successfully!');
        } catch (error) {
          console.log('Error saving combined image to gallery:', error);
        }
      }
    } catch (error) {
      console.log('Error saving combined image to Firebase:', error);
    }
  };

  useEffect(() => {
    // Check if the user is signed in
    if (userName || userEmail !== 'Guest') {
      setUserLoggedIn(true);
    }
  }, [userName, userEmail]);
  const signOutHandlerGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      setUserLoggedIn(false); // Set the userLoggedIn state to false
      console.log('Signed out successfully');
      navigation.replace('SignIn');
    } catch (error) {
      console.error(error);
    }
  };
  const signOutFirebase = () => {
    signOut(auth)
      .then(() => {
        setUserLoggedIn(false); // Set the userLoggedIn state to false
        console.log('Signed out successfully from firebase');
        navigation.replace('SignIn');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcon name="arrow-back-ios" size={30} color={'#DA34F5'} />
          </Pressable>
        </View>
        <View style={styles.hiContainer}>
          {userEmail || userName ? (
            <>
              <Text style={styles.hitext}>hi {userEmail || userName}</Text>
              {userName ? (
                <Pressable onPress={signOutHandlerGoogle}>
                  <Text style={styles.signupText}>Sign Out</Text>
                </Pressable>
              ) : (
                <Pressable onPress={signOutFirebase}>
                  <Text style={styles.signupText}>Sign Out</Text>
                </Pressable>
              )}
            </>
          ) : (
            <>
              <Text style={styles.hitext}>hi Guest</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable onPress={signUpHandler}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </Pressable>
                <Text
                  style={{fontSize: 20, color: '#DA34F5', fontWeight: 'bold'}}>
                  {' '}
                  |{' '}
                </Text>
                <Pressable onPress={signInHandler}>
                  <Text style={styles.signupText}>Sign In</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.createText}>
          <Text style={styles.sliderText}>Slider</Text> Frame
        </Text>
      </View>

      <ViewShot
        ref={viewShotRef}
        style={styles.imageContainer}
        options={{format: 'jpg', quality: 1}}>
        <ComparisonSlider
          imageWidth={400}
          imageHeight={400}
          initialPosition={50}
          leftImageURI={imageA}
          rightImageURI={imageB}
          hideDivider={hideDivider}
        />
      </ViewShot>
      <TouchableOpacity
        style={styles.goButtonContainer}
        onPress={saveCombinedImage}>
        <View style={styles.goButton}>
          <Text style={styles.goButtonText}>Capture</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  hiContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hitext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  signupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DA34F5',
  },
  separator: {
    fontSize: 20,
    color: '#DA34F5',
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  createText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  sliderText: {
    color: '#E962FF',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 400,
  },

  sidebysidecontainer: {
    // flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    // marginTop: 30,
    height: 400,
    width: 400,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
  },
  sliderLine: {
    height: 2,
    backgroundColor: 'black',
    flex: 1,
  },
  sliderHandle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 1,
    transform: [{translateX: -10}],
  },
  goButtonContainer: {
    width: 300,
    height: 45,
    marginTop: 80,
    alignSelf: 'center',
  },
  goButton: {
    backgroundColor: '#DA34F5',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
