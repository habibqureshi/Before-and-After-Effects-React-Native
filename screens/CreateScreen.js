import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Picker,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

export default function CreateScreen() {
  const navigation = useNavigation();
  const signUpHandler = () => {
    navigation.navigate('SignUp');
  };
  const signInHandler = () => {
    navigation.navigate('SignIn');
  };
  const [selectedImageA, setSelectedImageA] = useState(null);
  const [selectedImageB, setSelectedImageB] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const selectImageAHandler = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImageA(response.assets[0].uri);
      }
    });
  };
  const selectImageBHandler = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImageB(response.assets[0].uri);
      }
    });
  };
  const handleFrameChange = frame => {
    setSelectedFrame(frame);
    setDropdownOpen(false);
  };

  const renderFrameOptions = () => {
    const frames = ['Slider', 'Before-After'];

    return frames.map(frame => (
      <Pressable
        key={frame}
        style={styles.frameOption}
        onPress={() => handleFrameChange(frame)}>
        <Text style={styles.frameOptionText}>{frame}</Text>
      </Pressable>
    ));
  };
  const gohandler = () => {
    if (selectedFrame == 'Slider') {
      navigation.navigate('SlideFrame', {
        imageA: selectedImageA,
        imageB: selectedImageB,
      });
    } else if (selectedFrame == 'Before-After') {
      navigation.navigate('BeforeAfterFrame', {
        imageA: selectedImageA,
        imageB: selectedImageB,
      });
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
          lets <Text style={{color: '#E962FF'}}>create</Text> a new shot
        </Text>
        <Image style={styles.image} source={require('../assets/Build.jpg')} />
      </View>
      <View style={styles.selectimgContainer}>
        <View>
          <Pressable onPress={selectImageAHandler}>
            <Text style={styles.createtext}>
              select image <Text style={{color: '#E962FF'}}>A</Text>
            </Text>
          </Pressable>
        </View>
        <View>
          {selectedImageA ? (
            <Image style={styles.glryImg} source={{uri: selectedImageA}} />
          ) : (
            <Image
              style={styles.glryImg}
              source={require('../assets/image.jpg')}
            />
          )}
        </View>
      </View>
      <View style={styles.selectimgContainer}>
        <View>
          <Pressable onPress={selectImageBHandler}>
            <Text style={styles.createtext}>
              select image <Text style={{color: '#E962FF'}}>B</Text>
            </Text>
          </Pressable>
        </View>
        <View>
          {selectedImageB ? (
            <Image style={styles.glryImg} source={{uri: selectedImageB}} />
          ) : (
            <Image
              style={styles.glryImg}
              source={require('../assets/image.jpg')}
            />
          )}
        </View>
      </View>
      <View style={styles.selectFrameContainer}>
        <View style={styles.dropdown}>
          <Pressable
            style={styles.dropdownHeader}
            onPress={() => setDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.dropdownHeaderText}>
              {selectedFrame ? selectedFrame : 'Select a frame'}
            </Text>
            <MaterialIcon
              name={
                isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={25}
              color="#000000"
            />
          </Pressable>

          {isDropdownOpen && (
            <View style={styles.dropdownOptions}>
              <ScrollView style={styles.dropdownScrollView}>
                {renderFrameOptions()}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.goButtonContainer} onPress={gohandler}>
        <View style={styles.goButton}>
          <Text style={styles.gobuttonText}>Go</Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  selectimgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 40,
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
  image: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  glryImg: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  createtext: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
  },

  selectFrameContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  dropdown: {
    position: 'relative',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  dropdownHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A2A2A',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
  },
  dropdownScrollView: {
    maxHeight: 140,
  },
  frameOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  frameOptionText: {
    fontSize: 16,
    color: '#2A2A2A',
  },
  goButtonContainer: {
    width: 300,
    height: 45,
    marginTop: 20,
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
