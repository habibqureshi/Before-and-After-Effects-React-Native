import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};
export default function OnBoardScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('SignUp');
  };

  const slides = [
    {
      id: '1',
      image: require('../../assets/FILLED_OUTLINE.jpg'),
      title: `beautiful${'\n'}before-after${'\n'}shots`,
    },
    {
      id: '2',
      image: require('../../assets/FILLED_OUTLINE.jpg'),
      title: `beautiful${'\n'}before-after${'\n'}shots`,
    },
    {
      id: '3',
      image: require('../../assets/FILLED_OUTLINE.jpg'),
      title: `beautiful${'\n'}before-after${'\n'}shots`,
    },
  ];
  const Slide = ({item}) => {
    return (
      <View style={{alignItems: 'center', height: 230}}>
        <Image
          source={item?.image}
          style={{height: 230, width, resizeMode: 'contain'}}
        />
        <View
          style={{
            marginTop: 50,
          }}>
          {/* Indicator container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {/* Render indicator */}
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: 'blue',
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{marginTop: 80}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      {/* Get Started Button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 70,
  },
  title: {
    color: '#2A2A2A',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 25,
    textAlign: 'center',
  },
  indicator: {
    height: 10,
    width: 45,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 3,
    borderRadius: 6,
  },
  btnContainer: {
    width: '90%',
    margin: 20,
  },
  button: {
    backgroundColor: '#E962FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
