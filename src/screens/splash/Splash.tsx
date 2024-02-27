import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
// import images from '../../constants/images';

const Splash = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const delay = 3000; // 3 seconds in milliseconds

    const timeoutId = setTimeout(() => {
      // Code to execute after the delay
      console.log('3 seconds have passed!');
      navigation.replace('Login');
    }, delay);

    // Clear the timeout if the component is unmounted or if the effect dependency changes

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View className="flex-1 bg-[#F3F4F8] items-center justify-center">
      <Text className="text-4xl font-extrabold text-[#312651]">
        MAZD<Text className="text-[#FF7754]">OO</Text>R
      </Text>
      <ActivityIndicator size="large" className="mt-5" color="#312651" />
    </View>
  );
};

export default Splash;
