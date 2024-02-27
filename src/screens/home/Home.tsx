import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import images from '../../constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = () => {
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

  const renderItem = ({item}: {item: any}) => (
    <View
      className=" rounded-full py-2 px-4 mx-1  my-3 bg-[#312651]"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text className="text-base font-semibold text-gray-100">
        {item.title}
      </Text>
    </View>
  );

  const renderList = ({item}: {item: any}) => (
    <View className="mb-2 bg-gray-100   px-4 rounded-2xl flex-row gap-3 py-2 mt-1">
      <View className="w-16 h-16 rounded-full  overflow-hidden">
        <Image
          source={images.Male}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View className="">
        <Text className="text-base font-bold text-[#312651]">John Nicolas</Text>
        <Text className="text-xs text-[#312651]">Welcome{item.id}</Text>
      </View>
    </View>
  );

  const renderAdds = () => (
    <TouchableOpacity
      className="my-3 mx-2 w-44  py-2 bg-white px-4  rounded-2xl justify-between"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
      }}>
      <View className="w-16 h-16 rounded-full  overflow-hidden shadow-2xl drop-shadow-2xl shadow-black">
        <Image
          source={images.Male}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View>
        <Text className="text-lg font-semibold">Electrician</Text>
        <Text className="text-sm font-normal">Electrician</Text>
      </View>
      <View>
        <Text className="text-lg font-medium">₹ 200/sqft</Text>
        <Text className="text-sm">Aurangabad</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      className=" bg-white px-4"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
      }}>
      <View className="py-3  overflow-hidden">
        <View className="flex-row gap-4 items-center px-4 rounded-2xl overflow-hidden">
          <View className="w-16 h-16 rounded-full  overflow-hidden shadow-2xl drop-shadow-2xl shadow-black">
            <Image
              source={images.Male}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View className="">
            <Text className="text-xs text-[#312651]">Welcome</Text>
            <Text className="text-base font-bold text-[#312651]">
              John Nicolas
            </Text>
          </View>
        </View>
        <View></View>
      </View>
      <View className="">
        <Text className="text-xl font-semibold text-[#312651]">
          Top rated workers
        </Text>
        <View>
          <View className="">
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderAdds}
              horizontal={true}
            />
          </View>
        </View>
      </View>
      <View className="py-2 flex-row">
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className=" ">
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderList}
          contentContainerStyle={{paddingBottom: 900}}
        />
      </View>
    </View>
  );
};

export default Home;
