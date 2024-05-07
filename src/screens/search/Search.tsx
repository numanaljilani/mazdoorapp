import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import {Icon, TextInput} from 'react-native-paper';
import icons from '../../constants/icons';
import {useMutation} from '@apollo/client';
import {search_query} from '../../graphql/search';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {useSelector} from 'react-redux';
import env from '../../env';

const Search = ({navigation}: any) => {
  const [serch, setSearch] = useState<string>('');
  const [workers, setWorker] = useState<[]>([]);
  const {userData, language} = useSelector((state: any) => state?.user);

  const [search, {data, loading}] = useMutation(search_query);

  const searchData = async () => {
    if(!serch) return 
    const res = await search({variables: {name: serch, take: 10, skip: 0}});
    if (res?.data?.searchWorker) {
      setWorker(res?.data?.searchWorker);
    }
  };

  const renderList = ({item}: {item: any}) => {
    if(item._id === userData._id) return <></>
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('WorkerProfile', {id: item._id})}
        className="mb-2 bg-gray-100   px-4 rounded-2xl flex-row py-3  mt-1">
        <View className="w-16 h-16 rounded-full  overflow-hidden">
          <Image
            source={
              item.profile
                ? {uri: `${env.storage}${item.profile}`}
                : images.Male
            }
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="ml-3">
          <Text className="text-base font-bold text-[#312651]">
            {item?.name}
          </Text>
          <Text className="text-xs text-[#312651]"> {item?.occupation}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="bg-white mt-2 px-3 min-h-screen">
      {/* <TouchableOpacity className="px-3 border mb-3 flex-row py-2 items-center  rounded-full">
        <AntDesign size={25} name="search1" />
        <Text className="ml-3 text-lg font-semibold ">Search</Text>
      </TouchableOpacity> */}
      <View className="flex-row w-full">
        <TextInput
          className="flex-1 bg-gray-100 text-gray-900"
          placeholder={language ? `खोज` : `Search`}
          keyboardType="default"
          mode="outlined"
          theme={{roundness: 10}}
          placeholderTextColor={`#36454F`	}
          activeOutlineColor="#312651"
          right={<Icon source={icons.hashtag} size={24} color="black" />}
          onChangeText={text => setSearch(text)}
          onSubmitEditing={searchData}
        />
        <TouchableOpacity
          onPress={searchData}
          className=" px-4  mx-2 rounded-lg bg-[#312651]">
          <Text className="text-md my-auto text-white">
            {language ? `खोज` : `Search`}
          </Text>
        </TouchableOpacity>
      </View>

      {workers.length > 0 ? (
        <FlatList
          data={workers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderList}
          contentContainerStyle={{paddingBottom: 80}}
        />
      ) : (
        <View className="justify-center items-center my-auto">
          <Image
            source={icons.service}
            className="w-16 h-16"
            tintColor={'#808080'}
          />
          <Text className="text-3xl font-bold text-gray-400">
            {language ? `खोज` : `Search`}
          </Text>
        </View>
      )}
      {loading && <ActivityIndicatorComponent />}
    </View>
  );
};

export default Search;
