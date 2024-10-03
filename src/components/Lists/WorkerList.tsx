import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import icons from '../../constants/icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import env from '../../env';
import {useNavigation} from '@react-navigation/native';
import navigationString from '../../constants/navigation';
import {useSelector} from 'react-redux';
import {ADDTOBOOKMARK} from '../../graphql/mutation/bookmark';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';

const WorkerList = ({item, navigation, contractors , setContractors , fromBookmark , funct}: any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
console.log(userData , ">>>")
  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [bookmark] = useMutation(ADDTOBOOKMARK);
// console.log(item)
  const addToBookmarks = async () => {
    console.log('inside addToBookmarks');
    const res = await bookmark({
      variables: {contractorId: item.id ? item.id : item.contractorId , isBookmark : fromBookmark ? fromBookmark : item.isBookmark  },
      context: {headers},
    });
    if(fromBookmark){
      funct()
    }
  const filtered = contractors.map((data:any)=> {
    if(item.id == data.id){
      return{
        ...data,
        isBookmark : item?.isBookmark ? false : true,

      }
    }else {
      return data
    }
  })
  setContractors(filtered)
    if (res?.data) {
      showMessage({
        description:"Successfully added in your bookmarks",
        message: res?.data?.addToBookmark?.bookmark?.message,
        type : "success",
        icon:"success"
      });
    }
  };
console.log(item,"id")
  return (
    <TouchableOpacity
      className="shadow  shadow-black bg-white p-3 mt-3 rounded-3xl flex-row mb-1"
      onPress={() =>
        navigation.navigate(navigationString.CONTRACTORDETAILS, {
          id: fromBookmark? item.contractorId: item.id,
          bookmarked : item?.isBookmark
        })
      }>
      <View
        className={`border w-28 h-28 ${
          !item?.image &&''
        } rounded-3xl overflow-hidden`}>
        {item?.image || item?.contractor ? (
          <Image
            source={{uri:item?.image && item?.image?.includes('googleusercontent') ? item?.image : item?.contractor?.image && item?.contractor?.image.includes('googleusercontent') ? item?.contractor?.image : `${env.storage}${item?.image ? item?.image : item?.contractor?.image}`}}
            className="h-full w-full"
            resizeMode='cover'
          />
        ) : (
          <Image
            source={icons.user}
            className="h-full w-full"
            tintColor={'#dbd7d2'}
          />
        )}
      </View>
      <View className=" flex-1 px-3">
        <TouchableOpacity
          className="flex-row justify-between"
          onPress={addToBookmarks}
          >
          <Text className="text-gray-600 font-semibold text-base">
            {item?.fullname ? item?.fullname : item?.contractor ?  item?.contractor?.fullname : 'Miran Ahmed'}
          </Text>

          <Image
            source={fromBookmark || item?.isBookmark ? icons.bookmark  :icons.bookmark1}
            className="w-7 h-7"
            tintColor={'#822BFF'}
          />
        </TouchableOpacity>
        <View>
          <Text className="text-black font-semibold text-lg">
            {item?.service ? item?.service : 'Electrician'}
          </Text>
          <Text className="text-[#822BFF] font-bold text-xl">
            {item?.price ? item?.price : item?.contractor?.price  ?  item?.contractor?.price  : 500} /-
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-row gap-x-1">
              <FontAwesome5 size={17} color={'#FFB100'} name="star-half-alt" />
              <Text className="text-gray-500  font-semibold text-sm">{item?.rating ? item?.rating : item?.contractor?.rating ? item?.contractor?.rating : 5}</Text>
            </View>

            <View className="border-l" />
            <Text className="text-gray-500 font-semibold text-sm">
            {item?.rewies ? item?.rewies : item?.contractor?.rewies ? item?.contractor?.rewies : 0} + Reviews
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkerList;
