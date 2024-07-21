import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import WorkerList from '../../components/Lists/WorkerList';
import icons from '../../constants/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { GET_CONTRACTOR_BY_SERVICE, SEARCHCONTRACTOR } from '../../graphql/mutation/getContractor';
import NotFound from '../../components/notFound/NotFound';

const ContractorListScreen = ({navigation , route} : any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [contractors, setContractors] = React.useState<any[]>([]);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const [get_contractor_by_service, {loading, error, data}] = useMutation(
    GET_CONTRACTOR_BY_SERVICE,
  );
  const [search_contractors, {data : searchData , loading : searchLoading}] = useMutation(
    SEARCHCONTRACTOR,
  );
  const getContractorsByService = async () => {
    await get_contractor_by_service({
      variables: {service : route?.params?.service, take: 20, skip: 0},
      context: {headers},
    });
  };
  const searchContractors = async () => {
    const res = await search_contractors({
      variables: {search : route?.params?.search, take: 20, skip: 0},
      context: {headers},
    });

    // console.log(res.data.searchContractor)


  };

  useEffect(() => {
    if (loading || searchLoading) return;
    if(route?.params?.service){
      getContractorsByService();
    }else{
      searchContractors()
    }

  }, []);

  
  useEffect(() => {
    if (loading || searchLoading) return;
    if (data) {
      console.log(data)
      setContractors(data?.getContractor);
    }
  }, [data]);
  useEffect(() => {
    if (loading || searchLoading) {
      console.log('Loading or search loading...');
      return;
    }

    if (searchData && searchData.searchContractor) {
      console.log(searchData.searchContractor, ">>>");

      // Update state only if searchData.searchContractor is valid
      setContractors(searchData?.searchContractor || []);
    }
  }, [loading, searchLoading, searchData]);
  
  return (
    <View className='bg-white min-h-screen'>
      <View className='flex-row justify-between px-6 py-5'>
      <View className='flex-row gap-x-5'>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={icons.back} className="w-7 h-7" />
        </TouchableOpacity>
        <Text className="text-black text-xl font-[Poppins-SemiBold] text-medium">
        {route?.params?.service ? route?.params?.service : route?.params?.search}
        </Text>
        </View>
        
        <TouchableOpacity>
          <AntDesign size={30} color={'#312651'} name="search1" />
        </TouchableOpacity>
      </View>
      <View className=' px-3'>
      {contractors.length > 0 ?  <FlatList
        data={contractors}
        keyExtractor={(item , index) => index.toString()}
        renderItem={(item) =>(<WorkerList item={item.item} navigation={navigation}/>)}
        contentContainerStyle={{paddingBottom: 80}}
      /> :<NotFound/> }
      {/* <WorkerList /> */}
      </View>

    </View>
  );
};

export default ContractorListScreen;
