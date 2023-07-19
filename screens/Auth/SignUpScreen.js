import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/firebase.config';
export default function SignUpScreen() {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const signinhandler = () => {
    navigation.replace('SignIn');
  };
  const signUphandler = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigation.replace('SignIn');

        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        // ..
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
              <Text style={styles.text}>Sign up for</Text>
              <Text style={[styles.text, styles.highlight]}>Free</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Icon.Button
                name="google"
                size={20}
                color="white"
                backgroundColor="#D7503F"
                style={styles.button}
                // onPress={handleGoogleSignUp}
              >
                Sign up with Google
              </Icon.Button>
            </View>
            <View style={styles.buttonContainer}>
              <Icon.Button
                name="facebook"
                size={20}
                color="white"
                backgroundColor="#3b5998"
                style={styles.button}
                // onPress={handleAppleSignUp}
              >
                Sign up with facebook
              </Icon.Button>
            </View>
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
              onPress={signUphandler}>
              <View style={styles.signupButton}>
                <Text style={styles.buttonText}>Sign up</Text>
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
              <Text style={styles.greyText}>Already a member?</Text>
              <Pressable
                style={({pressed}) => [pressed && styles.pressed]}
                onPress={signinhandler}>
                <Text style={styles.blackText}> Sign In</Text>
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
    marginTop: 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
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
