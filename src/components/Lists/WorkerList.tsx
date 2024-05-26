import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import env from '../../env';

const WorkerList = ({item , navigation , screen } : any) => {
  return (
    <TouchableOpacity className="shadow  shadow-black bg-white p-3 mt-3 rounded-3xl flex-row" onPress={()=> navigation.navigate()}>
    <View className={`border w-28 h-28 ${!item?.image && 'p-3'} rounded-3xl overflow-hidden`}>
    { item?.image ? <Image source={{uri :`${env.storage}${item?.image}` }} className="h-full w-full" /> : <Image source={icons.user} className="h-full w-full"  tintColor={"#dbd7d2"}/>}
    </View>
    <View className=" flex-1 px-3">
      <TouchableOpacity className="flex-row justify-between" onPress={()=> console.log("Presssed")}>
        <Text className="text-gray-600 font-semibold text-base">
          {item?.fullname}
        </Text>
      
        <Image source={icons.bookmark} className="w-7 h-7" tintColor={'#822BFF'} />
   

      </TouchableOpacity>
      <View>
        <Text className='text-black font-semibold text-lg'>{item?.service}</Text>
        <Text className='text-[#822BFF] font-bold text-xl'>{item?.price} /-</Text>
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