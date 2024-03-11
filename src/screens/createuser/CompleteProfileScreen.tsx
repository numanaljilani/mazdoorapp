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
import { useCompleteProfileMutation, useUploadProfileMutation } from '../../service/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import icons from '../../constants/icons';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import { setUser } from '../../service/slice/userSlice';

const CompleteProfileScreen = ({ navigation } : any) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profile, setProfile] = useState<any>();

  const dispatch = useDispatch()

  const  { token }  = useSelector((state : any )=> state?.user);
  const [uploadProfile , { data , isError , isSuccess , error , isLoading }] = useUploadProfileMutation()
  const [completeProfileApi , { data : userData , isError : userIsError , isSuccess : userIsSuccess , error :userError  , isLoading : userIsLoading}] = useCompleteProfileMutation()

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
      setProfile(response.assets[0]);
    });
  };

  const onChangeText = (text: string) => {
    setEmail(text);
  };


  const completeProfile = async () =>{

    if(password !== confirmPassword) {
      showMessage({
        type : "danger",
        message : "password and conformed password does not matched"
      })
    }

    if(name.length < 5 || password.length < 4 ){
      showMessage({
        type : "danger",
        message : "all field are required"
      })
    }

    if(profile){
      const inputFormData = new FormData();
      inputFormData.append("file", {
        uri:  profile.uri,
        name: "image.png",
        fileName: "image",
        type: "image/png",
      });
      uploadProfile({body : inputFormData , token })
    }



    completeProfileApi({
      body : {
        name,
        email,
        password,
        address
      },
      token
    })


  }

  useEffect(()=>{
    if(isSuccess){

    }
    if(userIsSuccess){
      console.log(userData , "user information")
      dispatch(setUser(userData))
      navigation.navigate("BottomTabs")
    }
  },[isSuccess , userIsSuccess])

  useEffect(()=>{
    if(isError){
      console.log(error , "eroor")
    }
    if(userIsError){
      console.log(userError , "userEroror")
    }
  },[isError , userIsError])

  return (
    <ScrollView>
      <View className=" py-3">
        <Text className="text-2xl font-semibold text-center  ">
          Complete Profile
        </Text>
        <TouchableOpacity
          className="w-36 h-36 border-2 border-[#312651] rounded-full  mx-auto my-3 overflow-hidden justify-center items-center"
          onPress={handleImage}>
          <Image
            source={profile ? {uri: `${profile.uri}`} : images.Male}
            className="w-40 h-40"
            resizeMode="cover"
          />
          {/* <Image source={profile ? { uri : `data:${profile.type};base64,${profile.base64}`} : images.Male}  className="w-40 h-40" resizeMode='contain'/> */}
          {/* <View className="absolute bottom-4 right-1">
        <AntDesign size={28} color={ "#312651"}  name="pluscircle" />
        </View> */}
        </TouchableOpacity>
        <View className="px-4 ">
          <InputText label="Name" value={name} keyboard={true} setData={setName} icon={icons.user}/>
          <InputText
            label="Email"
            value={email}
            keyboard={true}
            setData={onChangeText}
            icon={icons.email}
          />
          <InputText
            label="Password"
            value={password}
            keyboard={true}
            setData={setPassword}
            secure={true}
            icon={icons.password}
          />
          <InputText
            label="Confirm Password"
            value={confirmPassword}
            keyboard={true}
            setData={setConfirmPassword}
            secure={true}
            icon={icons.password}
          />
          <TextInput
            label="Address"
            multiline
            numberOfLines={3}
            className="mt-5"
            mode="outlined"
            value={address}
            theme={{roundness: 10}}
            activeOutlineColor="#312651"
            onChangeText={(text: string) => setAddress(text)}
            left={<TextInput.Icon icon={() => <Icon source={  icons.location}  size={22} color='#312651'  />} />}
        
          />
          <TouchableOpacity className="bg-[#312651] w-full py-3 rounded-lg mt-5" onPress={completeProfile}>
            <Text className="text-white text-center text-lg font-medium">
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[#312651] border-2 w-full py-3 rounded-lg mt-5">
            <Text className="text-[#312651] text-center text-lg font-medium">
              Back To Login
            </Text>
          </TouchableOpacity>
        </View>
        { userIsLoading || isLoading && <ActivityIndicatorComponent/>}
      </View>
    </ScrollView>
  );
};

export default CompleteProfileScreen;
