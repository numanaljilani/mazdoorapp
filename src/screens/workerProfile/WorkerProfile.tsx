import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../constants/images';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {useMutation, useQuery} from '@apollo/client';
import {getWorkerProfile} from '../../graphql/workerProfile';
import icons from '../../constants/icons';
import env from '../../env';
import {watchList} from '../../graphql/watchList';
import { showMessage } from 'react-native-flash-message';
import { postMutation } from '../../graphql/posts';

const WorkerProfile = ({navigation, route}: any) => {

  const {userData, token} = useSelector((state: any) => state?.user);
  const [imageUrls, setImageUrls] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>({});
  const [available, setAvailable] = useState<boolean>(false);

  
  const headers = {
    authorization: token ? `Bearer ${token}` : '',
  };
  const [handleWatchList, {data: mutationData, loading: mutationLoading}] =
    useMutation(watchList);
    const [getPosts] = useMutation(postMutation);


  const {data, loading: dataLoading , error} = useQuery(getWorkerProfile, {
    variables: {id : route.params.id}, context : {headers}
  });


  useEffect(() => {
    if (data) {
      setProfile(data.getWorkerById);
    }
  }, [data]);


  useEffect(() => {
    if (error) {console.log(error)

    }
  }, [error]);



  const addToWatchList = async () => {
    const res = await handleWatchList({ variables: { id : route.params.id} , context : { headers}});
    setProfile({...profile , addOrRemove : res.data.addWorkerToWatchList.added })

    showMessage({
      type : "success",
      message : `${res.data.addWorkerToWatchList.message}`,
      description : `${res.data.addWorkerToWatchList.message}`
    })
  };

  const getAllMyPosts = async () => {

    const res = await getPosts({
      variables: {id: route.params.id },
      context: {headers},
    });
    if (res.data.getPosts) {
    setImageUrls(res.data.getPosts);
    }
  };

  useEffect(()=>{
    getAllMyPosts()
  },[])

  const handleCall = () => {
    Linking.openURL(`tel:${profile.phone}`);
  };

  return (
    <View className='flex-1 bg-white'>
    <ScrollView className="">
      <View className="flex-row justify-between px-7">
        <View />
        <View className="w-36 mt-4 mx-auto h-36  rounded-full overflow-hidden">
          <Image
            source={
              profile.profile
                ? {
                    uri: `${env.storage}${profile.profile}`,
                  }
                : images.Male
            }
            className="w-full h-full"
          />
        </View>
      </View>

      <View className="justify-center items-center">
        <Text className="text-2xl font-bold text-[#312651]">
          {profile?.name}
        </Text>
        <Text className="text-sm text-[#312651]">{profile?.email}</Text>
      </View>
      <View className=" flex-row justify-evenly py-3">
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center text-[#1B1212]">{imageUrls ? imageUrls.length : 0}</Text>
          <Text className="text-sm text-center text-[#1B1212] ">Post</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center text-[#1B1212]">0</Text>
          <Text className="text-sm text-center text-[#1B1212]">Likes</Text>
        </View>
        <View className="rounded-lg px-5 py-2 bg-white" style={style.shadow}>
          <Text className="text-2xl font-bold text-center text-[#1B1212]">0</Text>
          <Text className="text-sm text-center text-[#1B1212]">Votes</Text>
        </View>
      </View>
      <View className=" px-5 py-3 flex-row gap-x-5">
        <TouchableOpacity
          onPress={addToWatchList}
          className="text-lg font-bold border-2 border-[#312651] rounded-md flex-1 py-2  text-center">
          <Text className="text-lg font-bold text-[#312651]  text-center ">
           {profile.addOrRemove || profile.added ?  "Added" : "Add" }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`text-lg font-bold   rounded-md py-2 flex-1 ${
            profile.available ? 'bg-green-500' : 'bg-red-500'
          }`}
          >
          <Text className="text-lg font-bold text-white  text-center">
            {profile.available ? 'Available' : 'Unavailable'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" px-4">
        <View className="bg-gray-100 p-5 rounded-lg">
          <View className="bg-white py-2 rounded-lg px-4  flex-row items-center">
            <Image
              source={icons.suitcase}
              className="w-6 h-6 mr-3"
              tintColor="#312651"
            />
            <Text className="text-base font-medium text-[#1B1212]">{profile.occupation}</Text>
          </View>
          <View className="bg-white py-2 rounded-lg px-4  flex-row items-center mt-2">
            <Image
              source={icons.available}
              className="w-6 h-6 mr-3"
              tintColor="#312651"
            />
            <Text className="text-base font-medium text-[#1B1212]">{profile.availablity}</Text>
          </View>
          <View className="bg-white py-2 rounded-lg px-4 mt-2 flex-row items-center">
            <Image
              source={icons.rupee}
              className="w-5 h-5 mr-3"
              tintColor="#312651"
            />
            <Text>
              <Text className="text-lg font-bold text-[#1B1212]">{profile?.cost ? profile?.cost : "-"}</Text> /
              {profile.unit}
            </Text>
          </View>
          <View className="bg-white py-2 rounded-lg px-4 mt-2 flex-row flex-wrap ">
            <Image
              source={icons.location}
              className="w-6 h-6 mr-3"
              tintColor="#312651"
            />
            <Text className="text-base text-[#1B1212]">{profile.location} </Text>
            <Text className="text-base text-[#1B1212]">, {profile.address}</Text>
          </View>
        </View>
      </View>
      <View className=" gap-y-2   px-5 py-4">
      {imageUrls?.map((post: any, index: any) => (
          <View
            key={index}
            className=" aspect-square rounded-md overflow-hidden">
            <Image
              source={{uri: `${env.storage}${post.imageUrl}`}}
              className="w-full h-full"
            />

          </View>
        ))}
      </View>
  

      {loading && <ActivityIndicatorComponent />}
    </ScrollView>
    <View  className="fixed bottom-0 px-2 mb-2 flex-row justify-between">
        <TouchableOpacity onPress={handleCall} className="flex-1 py-4  bg-[#312651] flex-row justify-center items-center  rounded-lg">
          <Image source={icons.phone} className='w-7 h-7 mr-4' tintColor={'#ffff'}/>
          <Text className='text-gabg-white text-center text-lg text-white my-auto font-semibold tracking-widest'>Get a Phone number </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkerProfile;

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});
