import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../../constants/images';

const Search = () => {
  const data = [
    {id: '1', title: 'Electrician'},
    {id: '2', title: 'Plumber'},
    {id: '3', title: 'carpainter'},
    {id: '4', title: 'Developer'},
    {id: '5', title: 'Service'},
    {id: '6', title: 'Service'},
    {id: '7', title: 'Service'},
    {id: '8', title: 'Service'},
    {id: '9', title: 'Service'},
    {id: '10', title: 'Service'},
    {id: '11', title: 'Service'},
    {id: '12', title: 'Service'},
  ];

  const renderList = ({item}: {item: any}) => (
    <View className="mb-2 bg-gray-100   px-4 rounded-2xl flex-row py-3 gap-3 mt-1">
      <View className="w-16 h-16 rounded-full  overflow-hidden">
        <Image
          source={images.Male}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View className="">
        <Text className="text-base font-bold text-[#312651]">John Nicolas</Text>
        <Text className="text-xs text-[#312651]">Welcome {item.id}</Text>
      </View>
    </View>
  );
  return (
    <View className="bg-white mt-2 px-3 ">
      <TouchableOpacity className="px-3 border mb-3 flex-row py-2 items-center  rounded-full">
        <AntDesign size={25} name="search1" />
        <Text className="ml-3 text-lg font-semibold ">Search</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderList}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default Search;
