import {View, Text} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ProfileDetailsLoading = () => {
  return (
    <View>
      <View className="px-4 py-4 w-full">
        <View className="bg-slate-300/50 justify-center items-center  rounded-lg h-72">
          <EvilIcons name="image" size={80} color="#fff" />
        </View>
        <View className='py-3 gap-y-2'>
        <View className="bg-slate-300/50 w-2/3  rounded-lg h-7"/>
        <View className="bg-slate-300/50 w-3/4  rounded-lg h-7"/>
        <View className="bg-slate-300/50 w-full  rounded-lg h-7"/>
        <View className="bg-slate-300/50 w-full  rounded-lg h-36"/>
        <View className="bg-slate-300/50 w-full  rounded-lg h-36"/>
        <View className="bg-slate-300/50 w-full  rounded-lg h-36"/>

        </View>
      </View>
    </View>
  );
};

export default ProfileDetailsLoading;
