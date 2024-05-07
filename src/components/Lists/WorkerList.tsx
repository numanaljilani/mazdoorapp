import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WorkerList = () => {
  return (
    <TouchableOpacity className="shadow shadow-black bg-white p-3 mt-3 rounded-3xl flex-row">
    <View className="border w-28 h-28 rounded-3xl"></View>
    <View className=" flex-1 px-3">
      <View className="flex-row justify-between ">
        <Text className="text-gray-600 font-semibold text-base">
          Miran Ahmed
        </Text>
        <Image source={icons.bookmark} className="w-7 h-7" />
      </View>
      <View>
        <Text className='text-black font-semibold text-lg'>House Cleaning</Text>
        <Text className='text-[#822BFF] font-bold text-xl'>600 /-</Text>
        <View className='flex-row gap-3'>
          <View className='flex-row gap-x-1'>
          <FontAwesome5                   
          size={17}
          color={'#FFB100'}
          name="star-half-alt"/>
          <Text className='text-gray-500  font-semibold text-sm'>4.8</Text>
          </View>

          <View className='border-l'/>
          <Text className='text-gray-500 font-semibold text-sm'>2000 + Reviews</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export default WorkerList