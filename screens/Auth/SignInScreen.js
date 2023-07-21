// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/firebase.config';
export default function SignInScreen() {
  const [userInfo, setUserInfo] = useState(null);
const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '536256767534-l0o3oenlqh89si3ksh8ghsd30j0meo3s.apps.googleusercontent.com',
    });
  }, []);
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      navigation.replace('Home', {userInfo: usrInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const guestHandler = () => {
    navigation.replace('Home', {email: email});
  };
  const signUpHandler = () => {
    navigation.replace('SignUp');
  };
  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigation.replace('Home', {email: email});
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={50}
        style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/SignUp.jpg')}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sign</Text>
              <Text style={[styles.text, styles.highlight]}> in</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Icon.Button
                name="google"
                size={20}
                color="white"
                backgroundColor="#D7503F"
                style={styles.button}
                onPress={signInWithGoogle}>
                Sign in with Google
              </Icon.Button>
            </View>
            <View style={styles.buttonContainer}>
              <Icon.Button
                name="facebook"
                size={20}
                color="white"
                backgroundColor="#3b5998"
                style={styles.button}>
                Sign in with facebook
              </Icon.Button>
            </View>

            <TouchableOpacity
              style={styles.signupButtonContainer}
              onPress={guestHandler}>
              <View style={styles.guestButton}>
                <Icon
                  name="user"
                  size={20}
                  color="white"
                  style={styles.arrowIcon}
                />
                <Text style={styles.buttonText}>Sign in as Guest</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                placeholderTextColor="#888888"
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="#888888"
                secureTextEntry={!passwordVisible}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}>
                <Icon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.signupButtonContainer}
              onPress={signInHandler}>
              <View style={styles.signupButton}>
                <Text style={styles.buttonText}>Sign in</Text>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                onPress={toggleRememberMe}
                style={styles.rememberMeCheckbox}>
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}>
                  {rememberMe && (
                    <Icon
                      name="check"
                      size={12}
                      color="white"
                      style={styles.checkIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <View style={styles.signupContainer}>
              <Text style={styles.greyText}>Don't have an account?</Text>
              <Pressable
                style={({pressed}) => [pressed && styles.pressed]}
                onPress={signUpHandler}>
                <Text style={styles.blackText}> Sign Up Now</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    color: '#2A2A2A',
  },
  highlight: {
    color: '#DA34F5',
  },
  buttonContainer: {
    width: 300,
    height: 45,
    marginTop: 20,
    alignSelf: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  inputContainer: {
    width: 300,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#11111333',
    borderRadius: 4,
  },
  passwordInputContainer: {
    flex: 1,
    width: 300,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#11111333',
    borderRadius: 4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 70,
  },
  rememberMeCheckbox: {
    marginRight: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#11111333',
    borderRadius: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#11111333',
  },
  orText: {
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 10,
    color: '#000000',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  signupButtonContainer: {
    width: 300,
    height: 45,
    marginTop: 20,
    alignSelf: 'center',
  },
  signupButton: {
    backgroundColor: '#DA34F5',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: '#888888',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#888888',
    borderColor: '#888888',
  },
  checkIcon: {
    marginLeft: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  greyText: {
    color: 'grey',
    fontSize: 15,
  },
  blackText: {
    color: 'black',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
