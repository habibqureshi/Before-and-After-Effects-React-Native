import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const signUpHandler = () => {
    navigation.navigate('SignUp');
  };
  const signInHandler = () => {
    navigation.navigate('SignIn');
  };
  const createhandler = () => {
    // console.log('Create is pressed');
    navigation.navigate('Create');
  };
  return (
    <View style={styles.container}>
      <View style={styles.hiContainer}>
        <Text style={styles.hitext}>hi Guest</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={signUpHandler}>
            <Text style={styles.signupText}>signup</Text>
          </Pressable>
          <Text style={{fontSize: 20, color: '#DA34F5', fontWeight: 'bold'}}>
            {' '}
            |{' '}
          </Text>
          <Pressable onPress={signInHandler}>
            <Text style={styles.signupText}>login</Text>
          </Pressable>
        </View>
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
          <Text style={{fontSize: 20, fontWeight: '600', color: '#FFFFFF'}}>
            {'   '}
            go to
            <Text style={{fontSize: 20, fontWeight: '600', color: '#DA34F5'}}>
              {' '}
              my Library
            </Text>
          </Text>
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
    marginTop: 80,
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
