import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Home = ({navigation}: any) => {
  const [contractors, setContractors] = useState([]);
  const [worker, setWorker] = useState([]);
  const [service, setService] = useState<string>('Electrician');

  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  // console.log(userData.accessToken)
  // console.log(userData)

  const [get_contractor_by_service, {loading, error, data}] = useMutation(
    GET_CONTRACTOR_BY_SERVICE,
  );

  // const {
  //   loading: loading2,
  //   error: error2,
  //   data: gqlData2,
  //   refetch,
  // } = useQuery(Get_Worker_By_Service, {
  //   variables: {occupation: service, take: 50, skip: 0},
  // });

  const getContractorsByService = async () => {
    await get_contractor_by_service({
      variables: {service, take: 20, skip: 0},
      context: {headers},
    });
  };

  useEffect(() => {
    if (loading) return;
    getContractorsByService();
  }, [service]);

  useEffect(() => {
    if (loading) return;
    if (data) {
      setContractors(data?.getContractor);
    }
  }, [data]);

  console.log(contractors, 'contractors');
  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => setService(item.english)}
      className={`rounded-full py-2 px-4 mx-1  my-3 bg-${
        item.english === service ? '[#312651]' : 'white'
      } shadow shadow-[#312651]`}>
      <Text
        className={`text-base font-semibold text-gray-100 text-${
          item.english === service ? 'white' : '[#312651]'
        }`}>
        {language ? item.hindi : item.english}
      </Text>
    </TouchableOpacity>
  );

  const renderList = ({item}: {item: any}) => {
    if (userData._id === item._id) return <></>;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('WorkerProfile', {id: item._id})}
        className="mb-2 bg-gray-100   px-4 rounded-2xl flex-row  py-2 mt-1">
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
        <View className="ml-4">
          <Text className="text-base font-bold text-[#312651]">
            {item?.name}
          </Text>
          <Text className="text-xs text-[#312651]">{item?.occupation}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAdds = ({item}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('WorkerProfile', {id: item._id})}
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
          source={
            item.profile ? {uri: `${env.storage}${item.profile}`} : images.Male
          }
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View>
        <Text className="text-lg font-semibold">{item?.name}</Text>
        <Text className="text-sm font-normal">{item?.occupation}</Text>
      </View>
      <View>
        <Text className="text-lg font-medium">
          ₹ {item?.cost ? item?.cost : '_ '}/{item?.unit ? item?.unit : '_ '}
        </Text>
        <Text className="text-sm">{item?.address}</Text>
      </View>
    </TouchableOpacity>
  );
  // console.log(`${env.storage}${userData.image}`)
  return (
    <ScrollView>
      <View className=" bg-white px-4 py-5 min-h-screen">
        <View className="flex-row justify-between">
          <View className=" flex-row items-center gap-3">
            <View className="  rounded-full overflow-hidden">
              {userData.image ? (
                <Image
                  source={{uri: `${env.storage}${userData.image}`}}
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
              <Text className="text-black font-[Poppins-Regular]">
                Good Morining
              </Text>
              <Text className="text-black font-[Poppins-SemiBold] tracking-wider text-base">
                {userData?.fullname}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <TouchableOpacity className="w-8 h-8">
              <Image source={icons.notification} className="w-full h-full" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationString.MYBOOKMARKS)}
              className="w-8 h-8">
              <Image source={icons.bookmark} className="w-full h-full" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-2">
          <TextInput
            className=" bg-gray-100 text-black rounded-lg"
            placeholder="Search"
            placeholderTextColor={'#D3D3D3'}
            mode="outlined"
            theme={{roundness: 10}}
            autoCapitalize="none"
            activeOutlineColor="#822BFF"
            outlineColor="transparent"
            left={
              <TextInput.Icon
                icon={focused => (
                  <AntDesign
                    size={25}
                    color={focused ? '#312651' : '#555555'}
                    name="search1"
                  />
                )}
              />
            }
            right={
              <TextInput.Icon
                icon={focused => (
                  <Icon
                    source={icons.manue}
                    size={26}
                    color={focused ? '#822BFF' : '#D3D3D3'}
                  />
                )}
              />
            }
          />
        </View>

        <View className="">
          <Text className="text-lg text-black font-[Poppins-Medium]">
            Special Offers
          </Text>
          <View className="rounded-xl p-4 w-full  bg-[#822BFF]/90  shadow-black shadow-lg">
            <Text className="text-4xl   text-white font-[Poppins-SemiBold]">
              30%
            </Text>
            <Text className="text-lg  text-white font-[Poppins-Medium]">
              Todays Special!
            </Text>
            <Text className="text-sm  text-white font-[Poppins-Medium]">
              Get discount for every order only valid for today
            </Text>
            {/* <Image
              source={images.OnBoardinImage2}
              className="w-full h-40"
              resizeMode="cover"
            /> */}
          </View>
        </View>
        <View className="mt-3">
          <Text className="text-lg text-black font-[Poppins-Medium]">
            Services
          </Text>
          <View className="flex-row gap-x-3 gap-y-3 flex-wrap justify-center">
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons
                  size={40}
                  color={'#822BFF'}
                  name="cleaning-services"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Cleaning
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FE971E'}
                  name="hammer-screwdriver"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Repairing
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#1A96F0'}
                  name="format-paint"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Painting
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FDC02D'}
                  name="washing-machine"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Laundery
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#E94032'}
                  name="microwave"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Laundery
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#00BCD2'}
                  name="truck"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Shifting
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons size={40} color={'#4CAC58'} name="plumbing" />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Plumbing
              </Text>
            </View>

            <View className="">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationString.MORESERVICES)} className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
                <Feather size={40} color={'#822BFF'} name="more-horizontal" />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                More
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-lg text-black font-[Poppins-Medium]">
            Most Popular Services
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
          {contractors?.length > 0 ? (
            contractors.map((item, index) => (
              <WorkerList key={index} item={item} navigation={navigation}/>
            ))
          ) : (
            <View className="min-h-fit justify-center items-center mt-20">
              <Text className="text-center text-black my-auto text-lg font-semibold">
                {language ? `कोई कर्मचारी नहीं मिला` : `No Worker Found`}
              </Text>
            </View>
          )}
          {/* <TouchableOpacity onPress={()=>navigation.navigate(navigationString.CONTRACTORLIST)} className="shadow shadow-black bg-white p-3 rounded-3xl flex-row">
            <View className="border w-28 h-28 rounded-3xl"></View>
            <View className=" flex-1 px-3">
              <View className="flex-row justify-between ">
                <Text className="text-gray-600 font-semibold text-base">
                  Miran Ahmed
                </Text>
                <Image source={icons.bookmark} className="w-7 h-7" />
              </View>
              <View>
                <Text className='text-black font-semibold text-lg'>House Cleaning</Text>
                <Text className='text-[#822BFF] font-bold text-xl'>600 /-</Text>
                <View className='flex-row gap-3'>
                  <View className='flex-row gap-x-1'>
                  <FontAwesome5                   
                  size={17}
                  color={'#FFB100'}
                  name="star-half-alt"/>
                  <Text className='text-gray-500  font-semibold text-sm'>4.8</Text>
                  </View>

                  <View className='border-l'/>
                  <Text className='text-gray-500 font-semibold text-sm'>2000 + Reviews</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity> */}
          {/* <WorkerList/> */}
        </View>

        <View className="  ">
          {/* {contractors?.length > 0 ? (
            <FlatList
              data={worker}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderList}
              contentContainerStyle={{paddingBottom: 900}}
            />
          ) : (
            <View className="min-h-fit justify-center items-center mt-20">
              <Text className="text-center my-auto text-lg font-semibold">
                {language ? `कोई कर्मचारी नहीं मिला` : `No Worker Found`}
              </Text>
            </View>
          )} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
