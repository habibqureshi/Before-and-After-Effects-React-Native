import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/Auth/OnBoardScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import SignInScreen from './screens/Auth/SignInScreen';
import CreateScreen from './screens/CreateScreen';
import SliderFrameScreen from './screens/SliderFrameScreen';
import BeforeAfterFrameScreen from './screens/BeforeAfterFrameScreen';
import MyLibraryScreen from './screens/MyLibraryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SlideFrame"
          component={SliderFrameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BeforeAfterFrame"
          component={BeforeAfterFrameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyLibrary"
          component={MyLibraryScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
