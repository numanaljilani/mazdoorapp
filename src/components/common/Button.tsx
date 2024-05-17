import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';

const Button = ({ onPressFunction, text }: any) => {
  return (
    <TouchableOpacity
      className="bg-[#822BFF]  py-3 rounded-full my-7"
      onPress={onPressFunction}>
      <Text className="text-white font-[Poppins-Medium] tracking-widest text-center text-lg ">
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default Button