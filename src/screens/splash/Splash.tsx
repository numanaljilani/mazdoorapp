import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from '@apollo/client';
import {meMutation} from '../../graphql/me';
import {useDispatch} from 'react-redux';
import {
  setLanguage,
  setPosts,
  setToken,
  setUser,
} from '../../service/slice/userSlice';
import {showMessage} from 'react-native-flash-message';
import {postMutation} from '../../graphql/posts';
import images from '../../constants/images';
import navigationString from '../../constants/navigation';
import { ME } from '../../graphql/mutation/me';
import { bg_color } from '../../constants/color';
// import images from '../../constants/images';

const Splash = ({navigation}: {navigation: any}) => {
  const [me] = useMutation(ME);

  const dispatch = useDispatch();

  const navigateToAutorizedScreen = async () => {
    // navigation.navigate(navigationString.ONBOARDINGSCREEN);
    const token: string | null = await AsyncStorage.getItem('accessToken');
    const lang  =  await AsyncStorage.getItem('lang')
    

    dispatch(setLanguage(JSON.parse(lang!))) 

      const onboarding: string | null = await AsyncStorage.getItem(
        'onboarding',
      );
      console.log(onboarding , "onboarding")
    if (!token) {

      const checkOnBoarding = JSON.parse(onboarding!);
      if (onboarding) {
        !checkOnBoarding.onboarding
          ? navigation.navigate(navigationString.ONBOARDINGSCREEN)
          : navigation.navigate(navigationString.LOGINSCREEN);
      } else {
        navigation.navigate(navigationString.LOGINSCREEN);
        return;
      }
    }
    if (!token) return;
    try {

      const headers = {
        authorization: token? `Bearer ${JSON.parse(token)}` : '',
      };
      const res = await me({    context: {headers},});

      if (res.data?.me.user) {
        dispatch(setUser(res.data.me.user));
        dispatch(setToken(JSON.parse(token)));
        navigation.replace(navigationString.BOTTOMTABS);
        showMessage({
          type: 'success',
          message: 'Welcom back',
          // description: 'Welcome to mazdoor',
          icon:"success"
        });
        return;
      } else {
        navigation.replace(navigationString.LOGINSCREEN);
      }
    } catch (error) {
      console.log(error, '>>>>>>> splash screen');
      navigation.replace(navigationString.LOGINSCREEN);
    }
  };
  useEffect(() => {
    navigateToAutorizedScreen();
  }, []);
  console.log(bg_color("dark"))
  return (
    <View className={`flex-1 ${bg_color("dark")} items-center justify-center`}>
      <Image source={images.logo} className="w-20 h-20" resizeMode="contain" />
      <ActivityIndicator
        size="large"
        className="mt-5 absolute bottom-5"
        color="#822BFF"
      />
    </View>
  );
};

export default Splash;
