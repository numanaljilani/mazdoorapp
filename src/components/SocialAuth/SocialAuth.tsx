import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import images from '../../constants/images';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {SOCIALLOGINMUTATION, SOCIALSIGNUPMUTATION} from '../../graphql/auth';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {setToken, setUser} from '../../service/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigationsString from '../../constants/navigation';
import {useDispatch, useSelector} from 'react-redux';
import messenging from '@react-native-firebase/messaging';
import {bg_color, bg_color2, border_color} from '../../constants/color';
import {ME} from '../../graphql/mutation/me';

const SocialAuth = ({navigation, login, setLoading}: any) => {
  const {dark} = useSelector((state: any) => state?.user);
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const [socialLogin] = useMutation(SOCIALLOGINMUTATION);
  const [socialSignup] = useMutation(SOCIALSIGNUPMUTATION);
  const [me] = useMutation(ME);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      if (userInfo?.user) {
        const res = await socialSignup({
          variables: {
            email: userInfo.user.email,
            fullname: userInfo.user.familyName,
            socialAuthname: 'gmail',
            image: userInfo.user.photo,
          },
        });
        console.log(res?.data?.sociaSignup?.user.accessToken);
        if (res?.data?.sociaSignup?.user.accessToken) {
          const headers: any = {
            authorization: `Bearer ${res?.data?.sociaSignup?.user.accessToken}`,
          };
          const res2 = await me({context: {headers}});
          if (res2.data?.me.user) {
            dispatch(setUser(res2.data.me.user));
            dispatch(
              setToken(res?.data?.sociaSignup?.user.accessToken),
            );
            // const jsonValue = JSON.stringify(
            //   res?.data?.sociaSignup?.user.accessToken,
            // )
            await AsyncStorage.setItem('accessToken', res?.data?.sociaSignup?.user.accessToken);
            navigation.replace(navigationsString.BOTTOMTABS);
            showMessage({
              type: 'success',
              message: 'Welcom back',
              // description: 'Welcome to mazdoor',
              icon: 'success',
            });
            return;
          }

          // dispatch(setUser(res?.data?.sociaSignup?.user));
          // dispatch(setToken(res?.data?.sociaSignup?.user?.accessToken));
          // const jsonValue = JSON.stringify(res?.data?.sociaSignup?.user.accessToken);
          // await AsyncStorage.setItem('accessToken', jsonValue);
          // navigation.replace(navigationsString.BOTTOMTABS);
        } else {
          showMessage({
            message:
              res?.data?.sociaSignup?.error?.message ||
              'Something went wrong in google auth.',
            type: 'danger',
            animated: true,
            icon: 'warning',
          });
        }
      }
      // console.log(userInfo.user.email);
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const logIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
      if (userInfo?.user) {
        setLoading(true);
        const res = await socialLogin({
          variables: {
            email: userInfo.user.email,
            socialAuthName: 'gmail',
            fcmtoken: await messenging().getToken(),
          },
        });
        console.log(res.data?.socialLogin?.user);
        if (res?.data?.socialLogin?.user) {
          dispatch(setUser(res?.data?.socialLogin?.user));
          dispatch(setToken(res?.data?.socialLogin?.user?.accessToken));
          const jsonValue = JSON.stringify(
            res?.data?.socialLogin?.user.accessToken,
          );
          await AsyncStorage.setItem('accessToken', jsonValue);
          navigation.replace(navigationsString.BOTTOMTABS);
          setLoading(false);
        } else {
          showMessage({
            message:
              res?.data?.socialLogin?.error?.message ||
              'Something went wrong in google auth.',
            type: 'danger',
            animated: true,
            icon: 'warning',
          });
        }
        setLoading(false);
      }

      // console.log(userInfo.user.email);
    } catch (error: any) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log(result, 'facebook result');

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data, 'facebook token');

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log(facebookCredential, 'facebook Credential');
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View className=" flex-row px-4 gap-x-4 mt-4 ">
      <TouchableOpacity
        onPress={login ? logIn : signIn}
        className={`border ${border_color(dark)} ${bg_color2(
          dark,
        )} rounded-lg flex-1 py-3 justify-center items-center`}>
        <Image source={images.Google} className="w-9 h-9" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFacebookButtonPress}
        className={`border  ${border_color(dark)} ${bg_color2(
          dark,
        )} rounded-lg flex-1 py-3 justify-center items-center`}>
        <Image source={images.Facebook} className="w-9 h-9" />
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuth;
