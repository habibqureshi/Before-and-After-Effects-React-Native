import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function SliderFrameScreen() {
  const navigation = useNavigation();

  const signUpHandler = () => {
    navigation.navigate('SignUp');
  };

  const signInHandler = () => {
    navigation.navigate('SignIn');
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
        <Image style={styles.image} source={require('../assets/image.jpg')} />
      </View>
      <TouchableOpacity style={styles.goButtonContainer}>
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
  image: {
    width: '100%',
    height: 400,
    marginTop: 50,
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
