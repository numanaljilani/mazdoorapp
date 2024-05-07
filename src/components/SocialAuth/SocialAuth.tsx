import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import images from '../../constants/images';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const SocialAuth = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
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
    console.log(result , "facebook result")

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data , "facebook token")

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log(facebookCredential , "facebook Credential")
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
    <View className=" flex-row px-4 gap-x-4 mt-4">
      <TouchableOpacity
        onPress={signIn}
        className="border border-gray-200 rounded-lg flex-1 py-3 justify-center items-center">
        <Image source={images.Google} className="w-9 h-9" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFacebookButtonPress}
        className="border border-gray-200 rounded-lg flex-1 py-3 justify-center items-center">
        <Image source={images.Facebook} className="w-9 h-9" />
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuth;
