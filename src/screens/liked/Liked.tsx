import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../constants/images';
import {useMutation} from '@apollo/client';
import {myWatchListMutation} from '../../graphql/mywatchlist';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import { useSelector } from 'react-redux';
import env from '../../env';
const Liked = ({ navigation } : any) => {

  const { token} = useSelector((state: any) => state?.user);
  const [watchList , setWatchList] = useState<[]>([])
  const headers = {
    authorization: token ? `Bearer ${token}` : '',
  };

  const [getMyWatchList,{loading, data: data1}] = useMutation(myWatchListMutation);


  const { language } = useSelector((state: any) => state?.user);
  const getWatchList = async () =>{
    const res = await getMyWatchList({variables : { take : 10 , skip : 0} , context : {headers} });
console.log(res , ">>>>>")
    if(res.data.myWatchList){
      setWatchList(res.data.myWatchList)
    }
  }


  useEffect(()=>{
    getWatchList()
  },[])

  const renderList = ({item}: {item: any}) => (
    <TouchableOpacity onPress={()=> navigation.navigate("WorkerProfile", { id: item.workerIds })} className="mb-2 bg-gray-100   px-4 rounded-2xl flex-row  gap-2 mt-1 py-2">
      <View className="w-16 h-16 rounded-full  overflow-hidden">
 
        <Image
          source={item.imageUrl ? {uri : `${env.storage}${item.imageUrl}`} :images.Male}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View className="pl-4">
        <Text className="text-base font-bold text-[#312651]">{item.name}</Text>
        <Text className="text-xs text-[#312651]">{item.location}        {console.log(`${env.storage}${item.imageUrl}`)} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="bg-white mt-2 px-3 min-h-full">
      {/* <TouchableOpacity className="px-3  mb-3 flex-row py-2 items-center  rounded-full">
    <AntDesign size={25} name="search1" />
    <Text className="ml-3 text-lg font-semibold ">Search</Text>
  </TouchableOpacity> */}
      <View className="px-4 py-4">
        <Text className="text-3xl font-semibold text-[#312651] ">
          {language ? `मेरी निगरानी सूची`:`My Watch List`}
        </Text>
      </View>

     {watchList.length > 0 ? <FlatList
        data={watchList}
        keyExtractor={(item , index) => index.toString()}
        renderItem={renderList}
        contentContainerStyle={{paddingBottom: 80}}
      /> : <View className=" h-full justify-center items-center">
        <Text className='text-xl font-bold mb-16'>{language ? `खाली निगरानी सूची`:`Empty watch list`}</Text>
        </View>}
      {loading && <ActivityIndicatorComponent />}
    </View>
  );
};

export default Liked;
