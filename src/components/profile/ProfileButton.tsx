import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { text_color } from '../../constants/color';
import { useSelector } from 'react-redux';

const ProfileButton = ({
  text,
  icon,
  onPress
}: {
  text: string;
  icon: ImageSourcePropType;
  onPress ?: () => void
}) => {
  const { dark} = useSelector(
    (state: any) => state?.user,
  );
  return (
    <TouchableOpacity onPress={onPress} className=" flex-row gap-x-3 justify-between items-center">
      <View className=" flex-row gap-x-3 items-end py-2">
        <Image source={icon} className="w-8 h-8" tintColor={"#A4A4A4"} />
        <Text className={`${text_color(dark)} font-[Poppins-Medium] text-base`}>{text}</Text>
      </View>
      <MaterialIcons name='navigate-next' size={30}       color={'#A4A4A4'}/>
    </TouchableOpacity>
  );
};

export default ProfileButton;
