import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';

const Services = ({icons } :any ) => {
  return (
    <View className=' w-1/5 aspect-w-1 aspect-h-1'>
    <TouchableOpacity className="bg-[#822BFF]/10  py-3 justify-center items-center rounded-full">
      
    </TouchableOpacity>
    <Text className="text-black font-[Poppins-Medium] text-medium">
      More
    </Text>
  </View>
  )
}

export default Services