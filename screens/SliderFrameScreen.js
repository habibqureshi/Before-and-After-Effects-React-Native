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
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function SliderFrameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {imageA, imageB} = route.params;

  const signUpHandler = () => {
    navigation.navigate('SignUp');
  };

  const signInHandler = () => {
    navigation.navigate('SignIn');
  };

  const [sliderValue, setSliderValue] = useState(50);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );

  const [originalImageAWidth, setOriginalImageAWidth] = useState(0);
  const [originalImageBWidth, setOriginalImageBWidth] = useState(0);

  useEffect(() => {
    Image.getSize(imageA, (width, height) => {
      setOriginalImageAWidth(width);
    });

    Image.getSize(imageB, (width, height) => {
      setOriginalImageBWidth(width);
    });
  }, [imageA, imageB]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const {dx} = gestureState;
      const newSliderValue = sliderValue + (dx / windowWidth) * 100;
      setSliderValue(newSliderValue);
    },
    onPanResponderRelease: () => {
      // Add any necessary cleanup code
    },
  });

  const viewShotRef = useRef();

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcon name="arrow-back-ios" size={30} color={'#DA34F5'} />
        </Pressable>
        <View style={styles.hiContainer}>
          <Text style={styles.hiText}>Hi Guest</Text>
          <View style={styles.signupContainer}>
            <Pressable onPress={signUpHandler}>
              <Text style={styles.signupText}>Sign Up</Text>
            </Pressable>
            <Text style={styles.separator}> | </Text>
            <Pressable onPress={signInHandler}>
              <Text style={styles.signupText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.createText}>
          <Text style={styles.sliderText}>Slider</Text> Frame
        </Text>
        <ViewShot
          ref={viewShotRef}
          style={styles.imageContainer}
          options={{format: 'jpg', quality: 1}}>
          <Image
            source={{uri: imageA}}
            style={[
              styles.image,
              {flex: (sliderValue / 100) * originalImageAWidth},
            ]}
            resizeMode="cover"
          />
          <Image
            source={{uri: imageB}}
            style={[
              styles.image,
              {flex: ((100 - sliderValue) / 100) * originalImageBWidth},
            ]}
            resizeMode="cover"
          />
        </ViewShot>
        <View style={styles.sliderContainer} {...panResponder.panHandlers}>
          <View style={styles.sliderLine} />
          <View style={[styles.sliderHandle, {left: `${sliderValue}%`}]} />
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hiContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiText: {
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
  image: {
    flex: 1,
    height: '100%',
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
