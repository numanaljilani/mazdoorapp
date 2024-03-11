import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, { useState } from 'react';
import {Avatar} from 'react-native-paper';
import images from '../../constants/images';
import { gql, useQuery } from '@apollo/client';
import { Get_Top_RatedWorkers, Get_Worker_By_Service } from '../../graphql/worker';
import { useSelector } from 'react-redux';

const Home = () => {

  const [topRatedWorker , setTopRatedWorker] = useState([])
  const [worker , setWorker] = useState([])

  const [service,setService] = useState<string>("Plumber")

  const services = [
    'Electrician',
    'Plumber',
    'Carpenter',
    'Handyman',
    'Painter',
    'HVAC Technician',
    'Landscaper/Gardener',
    'Cleaning Service',
    'Roofing Specialist',
    'Flooring Specialist',
    'Locksmith',
    'Pest Control',
    'Appliance Repair Technician',
    'Interior Designer',
    'Moving and Packing Service',
    'Home Security Specialist',
    'Renovation Contractor',
    'Masonry/Bricklayer',
    'Window and Door Installation/Repair',
    'Pool Maintenance/Repair',
  ]

  const  { userData , token }  = useSelector((state : any )=> state?.user)
  // console.log(`http://192.168.87.213:3000/uploads/${userData.profile}` , ">>>>>>")

  const { loading, error, data :gqlData , fetchMore } = useQuery(Get_Top_RatedWorkers, { variables : { first : 10 , after : null}});
  const { loading : loading2 , error : error2, data :gqlData2 } = useQuery(Get_Worker_By_Service);

  // console.log(gqlData);
  // console.log(gqlData2);
  
  const data = [
    {id: '1', title: 'Electrician'},
    {id: '2', title: 'Plumber'},
    {id: '3', title: 'carpainter'},
  ];

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
    onPress={()=> setService(item)}
      className={`rounded-full py-2 px-4 mx-1  my-3 bg-${item === service ? "[#312651]" : "white"} shadow shadow-[#312651]`}
      // style={{
      //   shadowColor: '#000',
      //   shadowOffset: {
      //     width: 0,
      //     height: 4,
      //   },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 3.84,
      //   elevation: 5,
      // }}
      >
      <Text className={`text-base font-semibold text-gray-100 text-${item === service ? "white" : "[#312651]"}`}>
        {item}
      </Text>
    </TouchableOpacity>
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
          <View className="w-16 h-16 rounded-full   overflow-hidden ">
            <Image
              // source={images.Male}
              source={{ uri : `http://192.168.87.213:3000/uploads/${userData.profile}`}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="">
            <Text className="text-xs text-[#312651]">Welcome</Text>
            <Text className="text-base font-bold text-[#312651]">
              {userData.name}
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
          data={services}
          keyExtractor={item => item}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className=" ">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderList}
          contentContainerStyle={{paddingBottom: 900}}
        />
      </View>
    </View>
  );
};

export default Home;
