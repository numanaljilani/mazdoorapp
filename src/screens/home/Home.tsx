import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import images from '../../constants/images';
import {useMutation, useQuery} from '@apollo/client';
import {useSelector} from 'react-redux';

import env from '../../env';
import {services} from '../../constants/services';
import icons from '../../constants/icons';
import {Icon, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import ServicesList from '../../components/Lists/ServicesList';
import WorkerList from '../../components/Lists/WorkerList';
import navigationString from '../../constants/navigation';
import {GET_CONTRACTOR_BY_SERVICE} from '../../graphql/mutation/getContractor';
import SearchModal from '../../components/search/SearchModal';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ListLoading from '../../components/loading/ListLoading';
import PhoneWarning from '../../components/updateModal/PhoneWarning';
import { bg_color, bg_color2, secondary_text_color, text_color } from '../../constants/color';

const Home = ({navigation}: any) => {
  const [contractors, setContractors] = useState([]);
  const [service, setService] = useState<string>('Electrician');
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [skLoading , setSkLoading] = useState<boolean>(true)
  const [skip , setSkip] = useState(0)

  const isFocused = useIsFocused();

  const {userData, token, language , dark} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const [get_contractor_by_service, {loading, error, data}] = useMutation(
    GET_CONTRACTOR_BY_SERVICE,
  );

  const getContractorsByService = async () => {
    if(skip < 20) setSkLoading(true)
    await get_contractor_by_service({
      variables: {service, subService : service, take: 20, skip: 0},
      context: {headers},
    });
    setSkLoading(false)
  };

  useEffect(() => {
    if (!isFocused) return;
    if (loading) return;
    getContractorsByService();
  }, [service, isFocused]);

  useEffect(() => {
    if (loading) return;
    if (data) {
      console.log(data?.getContractor)
      setContractors(data?.getContractor);
    }
  }, [data]);

  const search = async () => {};
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request

    getContractorsByService();
    setTimeout(() => {
      setRefreshing(false);
      // You can also refresh your data here
    }, 2000);
  }, []);


  console.log(`${userData.image}`)
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className={`px-4 py-5 min-h-screen ${bg_color(dark)}`}>
        <View className="flex-row justify-between">
          <View className=" flex-row items-center gap-3">
            <View className="  rounded-full overflow-hidden">
              {userData.image ? (
                <Image
                  source={{uri: userData?.image?.includes('googleusercontent') ? `${userData?.image}`: `${env.storage}${userData.image}`}}
                  className="w-10 h-10 "
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={icons.user}
                  className="w-10 h-10 "
                  tintColor={'#D3D3D3'}
                  resizeMode="contain"
                />
              )}
            </View>
            <View className="">
              <Text className={`${text_color(dark)} font-[Poppins-Regular]"`}>
                {!language ? `Hello` : `नमस्ते`}
              </Text>
              <Text className={`${text_color(dark)} font-[Poppins-SemiBold] tracking-wider text-base`}>
                {userData?.fullname ? userData?.fullname : 'Miran Ahmed'}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="w-8 h-8"
              onPress={() =>
                navigation.navigate(navigationString.NOTIFICATION)
              }>
              <Image source={icons.notification} className="w-full h-full" tintColor={"#822BFF"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationString.MYBOOKMARKS)}
              className="w-8 h-8">
              <Image source={icons.bookmark1} className="w-full h-full" tintColor={"#822BFF"} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-2">
          <TouchableOpacity
            onPress={() => {
              setSearchModal(true);
            }}
            className={`${bg_color2(dark)} flex-row  px-5 py-2 rounded-lg`}>
            <AntDesign size={25} color={dark ? "white":'#312651'} name="search1" />
            <Text className={`text-lg font-[Poppins-Regular] ${secondary_text_color(dark)} ml-4`}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-3">
          <Text className={`text-lg ${text_color(dark)} font-[Poppins-Medium]`}>
            {!language ? `Services` : `सेवाएं`}
          </Text>
          <View className="flex-row gap-x-3 gap-y-3 flex-wrap justify-center">
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Helper',
                  })
                }
                className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
                <FontAwesome5Icon
                  size={40}
                  color={'#00BCD2'}
                  name="boxes"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ?  "Helper" : "सहायक"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Plumbing',
                  })
                }
                className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons size={40} color={'#4CAC58'} name="face-woman-shimmer-outline" />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "Maid" : "नौकरानी"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Cleaning',
                  })
                }
                className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons
                  size={40}
                  color={'#822BFF'}
                  name="cleaning-services"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "Cleaning" : "सफाई"}
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Repairing',
                  })
                }
                className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FE971E'}
                  name="hammer-screwdriver"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ?"Repairing" : "मरम्मत"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Painting',
                  })
                }
                className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#1A96F0'}
                  name="format-paint"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ?"Painting" :"चित्रकारी"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Laundery',
                  })
                }
                className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FDC02D'}
                  name="washing-machine"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ?"Laundery" : " कपड़े धोन"}
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Appliances',
                  })
                }
                className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#E94032'}
                  name="microwave"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "Appliances" : "उपकरण"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Shifting',
                  })
                }
                className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#00BCD2'}
                  name="truck"
                />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "Shifting" : "स्थानांतरण"}
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.SUBCATEGORIES, {
                    service: 'Plumbing',
                  })
                }
                className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons size={40} color={'#4CAC58'} name="plumbing" />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "Plumbing" : "नलकारी"}
              </Text>
            </View>

            <View className="">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationString.MORESERVICES)
                }
                className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
                <Feather size={40} color={'#822BFF'} name="more-horizontal" />
              </TouchableOpacity>
              <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
                {!language ? "More" : "अधिक"}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text className={`text-lg ${text_color(dark)} font-[Poppins-Medium]`}>
            {!language ? `Most Popular Services` : `सर्वाधिक लोकप्रिय सेवाएँ`}
          </Text>
          <View>
            <FlatList
              data={services}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}: any) => (
                <ServicesList
                  item={item}
                  service={service}
                  setService={setService}
                  language={language}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View className=" ">
          {/* <WorkerList  navigation={navigation}/> */}
          {skLoading ?  <ListLoading/> :   contractors?.length > 0 ? (
           contractors.map((item, index) => (
              <WorkerList
                key={index}
                item={item}
                setContractors={setContractors}
                navigation={navigation}
                contractors={contractors}
                fromBookmark={false}
              />
            ))
          ) : (
            <View className="min-h-fit justify-center items-center mt-20">
              <Text className="text-center text-black font-[Poppins-SemiBold] my-auto text-lg font-semibold">
                {language ? `कोई कर्मचारी नहीं मिला` : `No Worker Found`}
              </Text>
            </View>
          )}
       
        </View>
      </View>
      <SearchModal
        navigation={navigation}
        modal={searchModal}
        setModal={setSearchModal}
        search={search}
      />
      {/* <PhoneWarning/> */}
    </ScrollView>
  );
};

export default Home;
