import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactUsBtn = ({
  text,
  icon,
  onPress
}: {
  text: string;
  icon: string;
  onPress ?: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="py-4 pl-3 bg-white rounded-lg mt-2 flex-row  justify-between items-center">
      <View className=" flex-row gap-x-3 items-end py-2">
      <Ionicons name={icon} size={35} color={'#822BFF'} />
        <Text className="text-black font-[Poppins-Medium] text-lg">{text}</Text>
      </View>
      <MaterialIcons name='navigate-next' size={30}       color={'#181818'}/>
    </TouchableOpacity>
  );
};

export default ContactUsBtn;
