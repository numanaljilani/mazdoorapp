import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { bg_color, bg_color2 } from '../../constants/color'
import { useSelector } from 'react-redux';

const ListLoading = () => {
  const {userData, token, dark} = useSelector((state: any) => state?.user);
  return (
[1,2,3,4,5,6].map((data , index)=>(
    <View key={index} className={`py-2 w-full rounded-lg mt-2  flex-row px-4 shadow-sm shadow-black ${bg_color(dark)}`}>
    <View className={`py-2 w-28 h-28 rounded-lg ${bg_color2(dark)}`}></View>
   <View className='w-2/3 h-10 rounded-lg gap-y-2 px-4 '>
   <View className={`${"bg-slate-200/50"} w-full h-4 rounded-lg`}></View>
   <View className={`${"bg-slate-200/50"} w-2/3 h-6 rounded-lg`}></View>
   <View className={`${"bg-slate-200/50"} w-full h-6 rounded-lg`}></View>  
   </View>
</View>
))


  )
}

export default ListLoading