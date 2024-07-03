import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {auth} from '../firebase/firebase.config';
import {signOut} from 'firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';

export default function MyLibraryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userImages, setUserImages] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userName = route.params?.userInfo?.user?.name;
  const googleEmail = route.params?.userInfo?.user?.email;
  const userEmail = route.params.userEmail;
  const localImagePath = '../assets/image.jpg';
  const signUpHandler = () => {
    navigation.replace('SignUp');
  };
  const signInHandler = () => {
    navigation.replace('SignIn');
  };
  useEffect(() => {
    // Check if the user is signed in
    if (userName || userEmail !== 'Guest') {
      setUserLoggedIn(true);
    }
  }, [userName, userEmail]);
  useEffect(() => {
    if (userLoggedIn) {
      // Function to fetch user's saved images from Firebase Storage
      const fetchUserImages = async () => {
        try {
          if (userEmail) {
            // Fetch images for logged-in user by userEmail
            const reference = storage().ref(`${userEmail}${'/'}images`);
            const listResult = await reference.listAll();

            const imageUrls = await Promise.all(
              listResult.items.map(async item => {
                const url = await item.getDownloadURL();
                return url;
              }),
            );
            setUserImages(imageUrls);
          } else if (googleEmail) {
            // Fetch images for logged-in user by userName
            const reference = storage().ref(`${googleEmail}${'/'}images`);
            const listResult = await reference.listAll();

            const imageUrls = await Promise.all(
              listResult.items.map(async item => {
                const url = await item.getDownloadURL();
                return url;
              }),
            );
            setUserImages(imageUrls);
          } else {
            // Fetch images for guest user by deviceId
            const deviceId = DeviceInfo.getUniqueIdSync();

            const reference = storage().ref(`guests/${deviceId}`);
            const listResult = await reference.listAll();

            const imageUrls = await Promise.all(
              listResult.items.map(async item => {
                const url = await item.getDownloadURL();
                return url;
              }),
            );
            setUserImages(imageUrls);
          }
        } catch (error) {
          console.error('Error fetching user images from Firebase:', error);
        }
      };

      fetchUserImages()
        .then(() => setIsLoading(false))
        .catch(error => {
          setIsLoading(false);
          console.log('Error fetching image from Firebase', error);
        });
    }
  }, [userLoggedIn]);
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
                <Pressable onPress={signOutHandler}>
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
        <Text style={styles.createtext}>
          <Text style={{color: '#E962FF'}}>my</Text> library
        </Text>

        {isLoading ? (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require(localImagePath)}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            {userImages.map((imageUrl, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={{uri: imageUrl}}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.goButtonContainer}
        //   onPress={gohandler}
      >
        <View style={styles.goButton}>
          <Text style={styles.gobuttonText}>Select</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  imageWrapper: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  createtext: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },
  goButtonContainer: {
    width: 300,
    height: 45,
    marginTop: 100,
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
  gobuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
