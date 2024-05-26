import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileButton = ({
  text,
  icon,
  onPress
}: {
  text: string;
  icon: ImageSourcePropType;
  onPress ?: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress} className=" flex-row gap-x-3 justify-between items-center">
      <View className=" flex-row gap-x-3 items-end py-2">
        <Image source={icon} className="w-8 h-8" />
        <Text className="text-black font-[Poppins-Medium] text-base">{text}</Text>
      </View>
      <MaterialIcons name='navigate-next' size={30}       color={'#181818'}/>
    </TouchableOpacity>
  );
};

export default ProfileButton;
