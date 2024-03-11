import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import images from '../../constants/images';
import {useSelector} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import icons from '../../constants/icons';
import OptionsModal from '../../components/profile/OptionsModal';

const Profile = ({ navigation } : any) => {
  const {userData, token} = useSelector((state: any) => state?.user);
  const [optionModal , setOptionModal] = useState<boolean>(false)
  const navigateToScreen = async () =>{
    navigation.navigate("CreateWorkerProfile")
  }
  return (
    <ScrollView className="">
      <View className='flex-row justify-between px-7'>
      <View/>
      <View className="w-36 mt-4 mx-auto h-36  rounded-full overflow-hidden">
        <Image
          source={
            userData.profile
              ? {uri: `http://192.168.52.213:3000/uploads/${userData.profile}`}
              : images.Male
          }
          className="w-full h-full"
        />
      </View>
      <TouchableOpacity onPress={()=>setOptionModal(true)}>
      <Image
          source={icons.options}
          className="w-8 h-8 mt-6"
          tintColor={'#312651'}
        />
        </TouchableOpacity>
      </View>
      
      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-[#312651]">
          {userData.name}
        </Text>
        <Text className="text-lg text-[#312651]">{userData.phone}</Text>
      </View>
      <View className=" flex-row justify-evenly py-3">
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">0</Text>
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
      </View>
      <View className=" px-5 py-3 flex-row gap-x-5">
        <TouchableOpacity className="text-lg font-bold border-2 border-[#312651] rounded-md flex-1 py-2  text-center">
          <Text className="text-lg font-bold text-[#312651]  text-center ">
            upload
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="text-lg font-bold border-2 border-green-500 bg-green-500 rounded-md py-2 flex-1">
          <Text className="text-lg font-bold text-white  text-center">
            Available
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" gap-y-2   px-5 py-4">
        <TouchableOpacity className=" aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>

      </View>
      <View className="absolute bottom-0  px-5 flex-row gap-5 justify-between">

        {/* <TouchableOpacity className="flex-1  bg-[#312651] rounded-lg" onPress={navigateToScreen}>
          <Text className='text-white text-center my-auto text-base font-normal'>Become a patner </Text>
        </TouchableOpacity> */}
      </View>
      {optionModal && <OptionsModal setModal={setOptionModal} navigateToScreen={navigateToScreen}/>}
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
