import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '../firebase/firebase.config';
import {signOut} from 'firebase/auth';

export default function HomeScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const userName = route.params?.userInfo?.user?.name;
  const userEmail = route.params.email;
  const signUpHandler = () => {
    navigation.replace('SignUp');
  };
  const signInHandler = () => {
    navigation.replace('SignIn');
  };
  const createhandler = () => {
    navigation.navigate('Create', {
      userInfo: route.params?.userInfo,
      userEmail: userEmail,
    });
  };
  const mylibraryhndlr = () => {
    navigation.navigate('MyLibrary', {
      userInfo: route.params?.userInfo,
      userEmail: userEmail,
    });
  };
  const signOutHandler = async () => {
    try {
      await GoogleSignin.signOut();
      setUserLoggedIn(false);
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

  useEffect(() => {
    // Check if the user is signed in
    if (userName || userEmail !== 'Guest') {
      setUserLoggedIn(true);
    }
  }, [userName, userEmail]);
  return (
    <View style={styles.container}>
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
      <View style={styles.whatContainer}>
        <Text style={styles.whattext}>
          what are <Text style={{color: '#E962FF'}}>we</Text> doing {'\n'}
          {'          '}
          today?
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image style={styles.image} source={require('../assets/Build.jpg')} />
        <Pressable onPress={createhandler}>
          <Text style={styles.createtext}>
            <Text style={{color: '#E962FF'}}>Create</Text> a new Shot
          </Text>
        </Pressable>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <Image
            style={styles.footerimg}
            source={require('../assets/PhotoGallery.png')}
          />
          <Pressable onPress={mylibraryhndlr}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#FFFFFF'}}>
              {'   '}
              go to
              <Text style={{fontSize: 20, fontWeight: '600', color: '#DA34F5'}}>
                {' '}
                my Library
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
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
  whatContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 90,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
  },
  footerContainer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 90,
  },
  footerimg: {
    width: 77,
    height: 77,
    // backgroundColor: 'transparent',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: 55,
    height: 55,
  },
  whattext: {
    fontSize: 34,
    fontWeight: '600',
    color: '#2A2A2A',
    lineHeight: 41,
  },
  createtext: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
    // lineHeight: 41,
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
});
