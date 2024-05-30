import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Animated,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import images from '../../constants/images';
import navigationString from '../../constants/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({ navigation }: any) => {
  const { width }: any = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  let scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slideRef: any = useRef(null);
  const onboardingCard = [
    {
      id: 1,
      english: 'We provide profesional service at friendly price',
      hindi: 'We provide profesional service at friendly price',
      image: 'image',
    },
    {
      id: 2,
      english: 'The best result and your satisfaction is our top priority',
      hindi: 'We provide profesional service at friendly price',
      image: 'image',
    },
    {
      id: 3,
      english: 'Let\'s make awesome changes',
      hindi: 'We provide profesional service at friendly price',
      image: 'image',
    },
  ];

  const scrollTo = async () => {
    if(currentIndex < 2 )   {    
      navigation.navigate(navigationString.LOGINSCREEN);
      const jsonValue = JSON.stringify({ onboarding : true });
      await AsyncStorage.setItem('onboarding', jsonValue);
    }
    if (currentIndex < onboardingCard.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)



    }
  };

  const onBoardingCards = ({ item }: any) => {
    return (
      <View className={`py-4  w-screen items-center justify-center`}>
        <Image source={images.OnBoardinImage2} className={`w-72 h-72 my-4`} resizeMode='contain' />
        <Text className="font-[Poppins-Regular] mx-3 text-black text-3xl font-semibold  leading-loose tracking-wider text-center">
          {item.english}
        </Text>
      </View>
    );
  };
  return (
    <View className="  flex-1 justify-center bg-white">
      <View className="">
        <FlatList
          data={onboardingCard}
          renderItem={onBoardingCards}
          showsHorizontalScrollIndicator
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id.toString()}
          viewabilityConfig={viewConfig}
          ref={slideRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
      <View className=" flex-row  justify-center ">
        {onboardingCard.map((_, i: any) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i.toString()}
              className={`h-3 w-3 m-2 rounded-full bg-[#822BFF] flex-row w-[${dotWidth}]`}
              style={{ width: dotWidth, opacity }}
            />
          );
        })}
      </View>
      <View className="px-10 w-full mt-5">
        <TouchableOpacity
          onPress={scrollTo}
          className="bg-[#822BFF] py-3 rounded-full">
          <Text className="text-white text-base text-center">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
