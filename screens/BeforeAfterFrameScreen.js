import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function BeforeAfterFrameScreen() {
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
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcon name="arrow-back-ios" size={30} color={'#DA34F5'} />
          </Pressable>
        </View>
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
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.createtext}>
          <Text style={{color: '#E962FF'}}>before-after</Text> frame
        </Text>
        <Image style={styles.image} source={require('../assets/image.jpg')} />
      </View>
      <TouchableOpacity
        style={styles.goButtonContainer}
        //   onPress={gohandler}
      >
        <View style={styles.goButton}>
          <Text style={styles.gobuttonText}>Capture</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
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
  gobuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
