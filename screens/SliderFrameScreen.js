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
import SideBySide from 'react-native-side-by-side-views';

export default function SliderFrameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {imageA, imageB} = route.params;
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userName = route.params?.userInfo?.user?.name || 'Guest';

  const signUpHandler = () => {
    navigation.replace('SignUp');
  };

  const signInHandler = () => {
    navigation.replace('SignIn');
  };

  const saveCombinedImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save images.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const imageAWidth = (sliderValue / 100) * windowWidth;
        const imageBWidth = windowWidth - imageAWidth;

        // Capture the view containing the combined images
        const uri = await viewShotRef.current.capture();

        console.log('Captured image URI:', uri);

        const imagePath = uri.replace('file://', ''); // Remove the 'file://' prefix

        // Save the image to the gallery
        await CameraRoll.save(imagePath);

        console.log('Combined image saved to gallery successfully!');
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log('Error saving combined image:', error);
    }
  };
  useEffect(() => {
    try {
      // Check if the user is signed in
      if (userName !== 'Guest') {
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.error('Error in useEffect:', error);
      // Handle the error here, show an error message, or perform other actions if needed.
    }
  }, [userName]);
  const signOutHandler = async () => {
    try {
      await GoogleSignin.signOut();
      setUserLoggedIn(false); // Set the userLoggedIn state to false
      console.log('Signed out successfully');
      navigation.replace('SignIn');
    } catch (error) {
      console.error(error);
    }
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
          {userLoggedIn ? (
            <>
              <Text style={styles.hitext}>hi {userName}</Text>
              <Pressable onPress={signOutHandler}>
                <Text style={styles.signupText}>Sign Out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.hitext}>hi Guest</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Pressable onPress={signUpHandler}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#DA34F5',
                    fontWeight: 'bold',
                  }}>
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
      <SideBySide
        style={styles.sidebysidecontainer}
        dividerStyle={{
          top: 30,
          width: 8,
          borderRadius: 10,
          opacity: 0.7,
          backgroundColor: 'black',
          paddingVertical: 220,
        }}>
        <View>
          <Image source={{uri: imageA}} style={styles.images} />
        </View>
        <View>
          <Image source={{uri: imageB}} style={styles.images} />
        </View>
      </SideBySide>
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
    alignItems: 'flex-start',
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
