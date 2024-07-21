import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import icons from '../../constants/icons';
import OptionsModal from '../../components/profile/OptionsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {useMutation} from '@apollo/client';
import {availablityStatus} from '../../graphql/workerProfile';
import {setLanguage, setPosts, setUser} from '../../service/slice/userSlice';
import {showMessage} from 'react-native-flash-message';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useUploadPostMutation} from '../../service/api/userApi';
import {postMutation} from '../../graphql/posts';
import env from '../../env';
import DeleteModal from '../../components/profile/DeleteModal';
import {deletePostMeutation} from '../../graphql/delete';
import Feather from 'react-native-vector-icons/Feather';
import ProfileButton from '../../components/profile/ProfileButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logout from '../../components/profile/Logout';
import navigationString from '../../constants/navigation';
const Profile = ({navigation}: any) => {
  const {userData, token, posts, language} = useSelector(
    (state: any) => state?.user,
  );
  const [optionModal, setOptionModal] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string>('');
  const animation = new Animated.Value(0);

  const [uploadPostApi, {data, isSuccess, isError, error}] =
    useUploadPostMutation();

  const [getPosts] = useMutation(postMutation);
  const dispatch = useDispatch();

  const headers = {
    authorization: token ? `Bearer ${token}` : '',
  };

  const [changeStatus] = useMutation(availablityStatus);
  const [deletPost] = useMutation(deletePostMeutation);
  const navigateToScreen = async () => {
    navigation.navigate('CreateWorkerProfile');
    setOptionModal(false);
  };

  const [isEnabled, setIsEnabled] = useState<boolean>(language);
  const [isEnabledDark, setIsEnabledDark] = useState(false);

  const toggleSwitch = () => {
    // setIsEnabled(previousState => !previousState);
    dispatch(setLanguage(!language))
  };
  const toggleDark = () => {
    setIsEnabledDark(previousState => !previousState);
  };

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.setItem('accessToken', '');
    navigation.navigate('Login');
    setOptionModal(false);
    setLogoutModal(false)
    setLoading(false);
  };

  const handleAvailable = async () => {
    setLoading(true);
    const res = await changeStatus({context: {headers}});
    if (res?.data?.availableAndUnavailable) {
      dispatch(
        setUser({
          ...userData,
          available: res.data.availableAndUnavailable.available,
        }),
      );
      showMessage({
        type: 'success',
        message: `${
          res.data.availableAndUnavailable.available
            ? 'Available Now'
            : 'Not Available'
        } `,
      });
    }
    setLoading(false);
  };

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
      if (response.assets) {
        setImageUrl(response.assets[0].uri);

        uploadPost();
      }
    });
  };

  const uploadPost = async () => {
    setLoading(true);

    const inputFormData = new FormData();

    inputFormData.append('file', {
      uri: imageUrl,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });

    await uploadPostApi({body: inputFormData, token});
    setLoading(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(error, '>>??>>??>>??');
    }
  }, [isError]);

  const getAllMyPosts = async () => {
    // const res = await getPosts({
    //   variables: {id: userData._id},
    //   context: {headers},
    // });
    // if (res.data.getPosts) {
    //   dispatch(setPosts(res.data.getPosts));
    // }
  };
  useEffect(() => {
    if (isSuccess) {
      getAllMyPosts();
    }
  }, [isSuccess]);

  useEffect(() => {
    setLoading(true);
    getAllMyPosts();
    setLoading(false);
  }, []);

  const deleteImage = async (postId: string) => {
    setDeleteModal(true);
    console.log(postId);
    setImageId(postId);
  };
  const deletePic = async (postId: string) => {
    setDeleteModal(false);
    setLoading(true);
    const res = await deletPost({
      variables: {postId: imageId},
      context: {headers},
    });
    getAllMyPosts();
    setLoading(false);
  };

  const showModal = () => {
    setLogoutModal(true);
    Animated.spring(animation, {
      toValue: 1,
      stiffness: 100,
      damping: 10,
      mass: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.spring(animation, {
      toValue: 0,
      stiffness: 100,
      damping: 10,
      mass: 1,
      useNativeDriver: true,
    }).start(() => {
      setLogoutModal(false);
    });
  };

  const changePassword = () =>{
    navigation.navigate(navigationString.CHANGEPASSWORD)
  }
  const updateProfile = () =>{
    navigation.navigate(navigationString.UPDATEPROFILE)
  }

  const PrivacyPolicy = () =>{
    navigation.navigate(navigationString.PRIVACY)
  }
  const navigateToHelpCenter = () =>
    navigation.navigate(navigationString.HELPCENTER);

  const becomeContractor = () =>     navigation.navigate(navigationString.CREATECONTRACTOR);

  return (
    <ScrollView className="bg-white px-4">
      <View className="py-5 px-4 flex-row justify-between">
        <TouchableOpacity className="flex-row gap-x-3" onPress={()=> navigation.navigate(navigationString.UPDATEPROFILE)}>
          <Image source={images.logo} className="w-6 h-6" />
          <Text className="text-2xl font-[Poppins-Medium] text-black">
            {!language ? `Profile` : `प्रोफ़ाइल`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" p-2 border-[#822BFF] rounded-full border "
          onPress={() => setOptionModal(true)}>
          <Feather size={20} color={'#822BFF'} name="more-horizontal" />
        </TouchableOpacity>
      </View>
      <View className=" px-7">
        <View className="w-36 mt-4 mx-auto h-36  rounded-full overflow-hidden">
          {userData?.image ? (
            <Image
              source={{
                uri: `${env.storage}${userData?.image}`,
              }}
              className="w-full h-full"
            />
          ) : (
            <Image
              source={icons.avatar}
              className="w-full h-full"
              tintColor={'#D3D3D3'}
            />
          )}
        </View>
        <View>
          <Text className="text-black text-center  font-[Poppins-Medium] ">
            {userData?.fullname ? userData?.fullname : "Miran Ahmed"}
          </Text>
          <Text className="text-black text-center  font-[Poppins-Medium] ">
            {userData?.email ? userData?.email : "mazdoor@gmail.com"}
          </Text>
        </View>
      </View>
      <View className="border-t mt-3 border-gray-300 ">
        <ProfileButton text={!language ? 'Edit Profile' :'प्रोफ़ाइल संपादित करें'} icon={icons.profile} onPress={updateProfile}/>
        <ProfileButton text={!language ? 'Contractor' : "ठेकेदार"} icon={icons.suitcase} onPress={becomeContractor}/>
        <ProfileButton text={!language ?'Notifications': 'सूचनाएं'} icon={icons.notification} />
        {/* <ProfileButton text={!language ?'Payments' :'भुगतान'} icon={icons.wallet} /> */}
        <ProfileButton text={!language ?'Security' :'सुरक्षा'} icon={icons.secure} onPress={changePassword} />
        <View className=" flex-row gap-x-3 justify-between items-center">
          <View className=" flex-row gap-x-3 items-end py-2">
            <Image
              source={icons.language}
              className="w-8 h-8"
              tintColor={'#181818'}
            />
            <Text className=" text-black font-[Poppins-Medium] text-base">
              {!language ? `Language` : `भाषा`}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#e6d4ff'}}
            thumbColor={language ? '#822BFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={language}
          />
        </View>
        {/* <View className=" flex-row gap-x-3 justify-between items-center">
          <View className=" flex-row gap-x-3 items-end py-2">
            <Image
              source={icons.show}
              className="w-8 h-8"
              tintColor={'#181818'}
            />
            <Text className=" text-black font-[Poppins-Medium] text-base">
             {!language ?` Dark Mode` : `डार्क मोड`}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#e6d4ff'}}
            thumbColor={isEnabledDark ? '#822BFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDark}
            value={isEnabledDark}
          />
        </View> */}
        <ProfileButton text={!language ?'Privacy':'गोपनीयता'} icon={icons.password} onPress={PrivacyPolicy}/>
        <ProfileButton
          text={!language ? 'Help Center':`सहायता केंद्र`}
          icon={icons.notification}
          onPress={navigateToHelpCenter}
        />
        <ProfileButton text={!language ?'Invite Friends':'मित्रों को आमंत्रित करें'} icon={icons.people} />
        <TouchableOpacity
          onPress={showModal}
          className=" flex-row gap-x-3 justify-between items-center">
          <View className=" flex-row gap-x-3 items-end py-2">
            <Image
              source={icons.logout}
              className="w-8 h-8"
              tintColor={'#EF4444'}
            />
            <Text className=" text-red-500 font-[Poppins-Medium] text-base">
              {!language ?`Logout` : `लॉग आउट`}
            </Text>
          </View>
          <MaterialIcons name="navigate-next" size={30} color={'#EF4444'} />
        </TouchableOpacity>
        <Logout
          setModal={hideModal}
          logoutModal={logoutModal}
          logout={logout}
        />
      </View>

      {/* <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-[#312651]">
          {userData?.name}
        </Text>
        <View className='flex-row gap-3 justify-center items-center'>
          <Image source={icons.phone}               className="w-6 h-6"
              resizeMode="contain"
              tintColor={'#312651'}/>
          <Text className="text-lg text-[#312651]">{userData?.phone}</Text>
        </View>
      </View> */}

      {/* <View className=" flex-row justify-evenly py-3">
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">{posts.length}</Text>
          <Text className="text-sm text-center ">Post</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">0</Text>
          <Text className="text-sm text-center">Likes</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">0</Text>
          <Text className="text-sm text-center">Votes</Text>
        </View>
      </View> */}
      {/* <View className=" px-5 py-3 flex-row gap-x-5">
        <TouchableOpacity
          onPress={handleImage}
          className="text-lg font-bold border-2 border-[#312651] rounded-md flex-1 py-2  text-center">
          <Text className="text-lg font-bold text-[#312651]  text-center ">
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAvailable}
          className={`text-lg font-bold   rounded-md py-2 flex-1 ${
            userData?.available ? 'bg-green-500' : 'bg-red-500'
          }`}>
          <Text className="text-lg font-bold text-white  text-center">
            {userData?.available
              ? language
                ? 'उपलब्ध'
                : 'Available'
              : language
              ? 'अनुपलब्ध'
              : 'Unavailable'}
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* {userData?.isWorker && (
        <View className=" px-4">
          <View className=" bg-gray-100  p-5 rounded-lg">
            <View className="bg-white py-2 rounded-lg px-4  flex-row items-center">
              <Image
                source={icons.suitcase}
                className="w-6 h-6 mr-3"
                tintColor="#312651"
              />
              <Text className="text-base font-medium">
                {userData?.occupation}
              </Text>
            </View>
            <View className="bg-white py-2 rounded-lg px-4  flex-row items-center mt-2">
              <Image
                source={icons.available}
                className="w-6 h-6 mr-3"
                tintColor="#312651"
              />
              <Text className="text-base font-medium">
                {userData?.availablity}
              </Text>
            </View>
            <View className="bg-white py-2 rounded-lg px-4 mt-2 flex-row items-center">
              <Image
                source={icons.rupee}
                className="w-5 h-5 mr-3"
                tintColor="#312651"
              />
              <Text>
                <Text className="text-lg font-bold">{userData?.cost}</Text> /
                {userData?.unit}
              </Text>
            </View>
            <View className="bg-white py-2 rounded-lg flex-row px-4 mt-2  ">
              <Image
                source={icons.location}
                className="w-6 h-6 mr-3"
                tintColor="#312651"
              />
              <View>
                <Text className="text-base">{userData?.location} </Text>
                <Text className="text-base">, {userData?.address}</Text>
              </View>
            </View>
          </View>
        </View>
      )} */}
      <View className=" gap-y-2   px-5 py-4">
        {posts?.map((post: any, index: any) => (
          <View
            key={index}
            className=" aspect-square rounded-md overflow-hidden">
            <Image
              source={{uri: `${env.storage}${post.imageUrl}`}}
              className="w-full h-full"
            />
            <TouchableOpacity
              onPress={() => deleteImage(post._id)}
              className="w-10 h-10  z-50 absolute  top-3 right-3">
              <Image
                source={icons.delete}
                className="w-full h-full"
                resizeMode="contain"
                tintColor="#312651"
              />
            </TouchableOpacity>
          </View>
        ))}
        {/* <TouchableOpacity className=" aspect-square rounded-md overflow-hidden">
          <Image source={{uri : `${env}/${post.imageUrl}`}} className="w-full h-full" />
        </TouchableOpacity> */}
      </View>

      {optionModal && (
        <OptionsModal
          setModal={setOptionModal}
          navigateToScreen={navigateToScreen}
          logout={logout}
          navigation={navigation}
        />
      )}
      {loading && <ActivityIndicatorComponent />}
      {deleteModal && (
        <DeleteModal setModal={setDeleteModal} deleteFunc={deletePic} />
      )}
    </ScrollView>
  );
};

export default Profile;

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
