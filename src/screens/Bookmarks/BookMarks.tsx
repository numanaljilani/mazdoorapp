import { View, Text, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import icons from '../../constants/icons';
import WorkerList from '../../components/Lists/WorkerList';

const BookMarks = ({navigation} : any) => {
  return (
    <View className='bg-white min-h-screen'>
      <View className='flex-row justify-between px-6 py-5'>
      <View className='flex-row gap-x-5'>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={icons.back} className="w-7 h-7" />
        </TouchableOpacity>
        <Text className="text-black text-xl font-[Poppins-SemiBold] text-medium">
          My Bookmarks
        </Text>
        </View>
        
        <TouchableOpacity>
          <AntDesign size={30} color={'#312651'} name="search1" />
        </TouchableOpacity>
      </View>
      <View className=' px-3'>
      <WorkerList />
      <WorkerList />
      <WorkerList />
      </View>

    </View>
  )
}

export default BookMarks