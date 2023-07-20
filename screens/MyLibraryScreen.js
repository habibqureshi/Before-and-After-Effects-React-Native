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

export default function MyLibraryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userImages, setUserImages] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const userName = route.params?.userInfo?.user?.name || 'Guest';
  const userEmail = route.params.userEmail;
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
          const user = auth.currentUser;
          if (user) {
            const userEmail =
              user.email ||
              (user.providerData[0] && user.providerData[0].email);

            const reference = storage().ref(`${userEmail}${'/'}images`);
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

      fetchUserImages();
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
              {userEmail ? (
                <Text style={styles.hitext}>hi {userEmail}</Text>
              ) : (
                <Text style={styles.hitext}>hi {userName}</Text>
              )}
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
        <Text style={styles.createtext}>
          <Text style={{color: '#E962FF'}}>my</Text> library
        </Text>
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
    marginTop: 20,
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
    width: 100,
    height: 100,
    marginTop: 50,
    borderRadius: 10,
    alignSelf: 'center',
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
  gobuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
