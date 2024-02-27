import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import images from '../../constants/images';

const Profile = () => {
  return (
    <View className="flex-1 my-5">
      <View className="w-36 mx-auto h-36  rounded-full overflow-hidden">
        <Image source={images.Male} className="w-full h-full" />
      </View>
      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-[#312651]">John Nicolas</Text>
        <Text className="text-lg text-[#312651]">Electrician</Text>
      </View>
      <View className=" flex-row justify-evenly py-3">
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">80</Text>
          <Text className="text-sm text-center ">Post</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">40</Text>
          <Text className="text-sm text-center">Likes</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center">93</Text>
          <Text className="text-sm text-center">Votes</Text>
        </View>
      </View>
      <View className=" px-5 py-3 flex-row gap-x-5">
        <TouchableOpacity className="text-lg font-bold border-2 border-[#312651] rounded-md flex-1 py-2  text-center">
          <Text className="text-lg font-bold text-[#312651]  text-center ">
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="text-lg font-bold border-2 border-[#312651] bg-[#312651] rounded-md py-2 flex-1">
          <Text className="text-lg font-bold text-white  text-center">
            Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap gap-y-2  justify-between  px-5 py-4">
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
        <TouchableOpacity className="w-[32%]  aspect-square rounded-md overflow-hidden">
          <Image source={images.Male} className="w-full h-full" />
        </TouchableOpacity>
      </View>
    </View>
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
