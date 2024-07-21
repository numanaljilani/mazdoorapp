import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputText from '../../components/Input/InputText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon, TextInput} from 'react-native-paper';
import image, {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import images from '../../constants/images';
import {
  useUpdateProfileMutation,
  useUploadProfileMutation,
} from '../../service/api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import icons from '../../constants/icons';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import { setUser} from '../../service/slice/userSlice';
import env from '../../env';
import {meMutation} from '../../graphql/me';
import {useMutation} from '@apollo/client';

const UpdateProfile = ({navigation}: any) => {
  const {
    userData: myProfile,
    token,
    language,
  } = useSelector((state: any) => state?.user);
  const [name, setName] = useState<string>(myProfile?.name);
  const [email, setEmail] = useState<string>(myProfile?.email);
  const [address, setAddress] = useState<string>(myProfile?.location);
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>(myProfile?.phone);
  const [profile, setProfile] = useState<any>();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [secure, setSecure] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const securePass = async () => {
    setSecure(!secure);
  };
  const passwordShow = async () => {
    setShow(!show);
  };

  const dispatch = useDispatch();

  const [uploadProfile, {data, isError, isSuccess, error, isLoading}] =
    useUploadProfileMutation();
  const [
    updateProfile,
    {
      data: userData,
      isError: userIsError,
      isSuccess: userIsSuccess,
      error: userError,
      isLoading: userIsLoading,
    },
  ] = useUpdateProfileMutation();
  const [me] = useMutation(meMutation);

  const handleImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 600,
      selectionLimit: 1, // Limit selection to one image
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('user cancel the image pikker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }

      // console.log('image ', response?.assets);
      if (response.assets) {
        setProfile(response.assets[0]);
        setImageUrl(response.assets[0]?.uri);
      }
    });
  };

  const onChangeText = (text: string) => {
    setEmail(text?.trim());
  };
  console.log(loading, '>>>>>>>>>>');

  const completeProfile = async () => {
    setLoading(true);
    if (profile) {
      const inputFormData = new FormData();
      inputFormData.append('file', {
        uri: imageUrl,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      uploadProfile({body: inputFormData, token});
    }

    updateProfile({
      body: {
        name: name?.trim(),
        phone,
        email: email?.trim(),
        password: password?.trim(),
        address: address?.trim(),
      },
      token,
    });
  };

  const getMyProfile = async () => {
    const res = await me({variables: {token}});
    if (res.data?.me.user) {
      dispatch(setUser(res.data.me.user));
      showMessage({
        type: 'success',
        message: 'Upadated',
        description: 'profile information updated successfull',
      });
    }
    // dispatch(setUser(userData))
    setLoading(false);
    navigation.navigate('BottomTabs');
  };

  useEffect(() => {
    if (isSuccess) {
    }
    if (userIsSuccess) {
      getMyProfile();
    }
  }, [isSuccess, userIsSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error, 'eroor');
    }
    if (userIsError) {
      console.log(userError, 'userEroror');
    }
  }, [isError, userIsError]);
  return (
    <ScrollView>
      <View className=" py-3">
        <Text className="text-2xl font-semibold text-center  ">
          {language ? `प्रोफ़ाइल परिवर्तन क्र` : `Complete Profile`}
        </Text>
        <View className="w-36 h-36  rounded-full  mx-auto my-3 justify-center items-center">
          <TouchableOpacity
            className="w-36 h-36 border-4 border-[#312651] rounded-full  mx-auto my-3 overflow-hidden justify-center items-center"
            onPress={handleImage}>
            <Image
              source={
                profile
                  ? {uri: `${profile?.uri}`}
                  : myProfile?.profile
                  ? {uri: `${env.storage}${myProfile?.profile}`}
                  : images.Male
              }
              className="w-40 h-40"
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View className="w-9 h-9 justify-center items-center absolute bottom-3 z-30 -right-3 mx-4 bg-blue-950 rounded-full ">
            <Text className="text-4xl font-bold     text-white  ">+</Text>
          </View>
        </View>
        <View className="px-4 ">
          <InputText
                        
            label={language ? 'नाम' : 'Name'}
            value={name}
            keyboard={true}
            setData={setName}
            icon={icons.user}
          />
          <InputText
                        
            label={language ? `फ़ोन` : 'Phone'}
            value={phone}
            setData={setPhone}
            keyboard={false}
          />
          <InputText
                        
            label={language ? 'ईमेल' : 'Email'}
            value={email ? email.trim() : myProfile?.email}
            keyboard={true}
            setData={onChangeText}
            icon={icons.email}
          />
          <InputText
                        
            label={language ? `पासवर्ड` : 'Password'}
            value={password.trim()}
            keyboard={true}
            setData={setPassword}
            secure={true}
            icon={icons.password}
            pass={!show}
            right={show ? icons.show : icons.hide}
            securePass={passwordShow}
          />

          <TextInput
            label={language ? `पता` : 'Address'}
            textColor='#28282B'
            multiline
            numberOfLines={3}
            className="mt-5 bg-white"
            mode="outlined"
            value={address}
            theme={{roundness: 10}}
            activeOutlineColor="#312651"
            onChangeText={(text: string) => setAddress(text)}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon source={icons.location} size={22} color="#312651" />
                )}
              />
            }
          />
          <TouchableOpacity
            className="bg-[#312651] w-full py-3 rounded-lg mt-5"
            onPress={completeProfile}>
            <Text className="text-white text-center text-lg font-medium">
              {language ? `परिवर्तन ` : `Save Changes`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white border-[#312651] border-2 w-full py-3 rounded-lg mt-5">
            <Text className="text-[#312651] text-center text-lg font-medium">
              {language ? ` वापस जाएं` : `Back`}
            </Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicatorComponent />}
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
