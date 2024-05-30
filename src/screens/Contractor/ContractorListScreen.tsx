import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import WorkerList from '../../components/Lists/WorkerList';
import icons from '../../constants/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { GET_CONTRACTOR_BY_SERVICE } from '../../graphql/mutation/getContractor';
import NotFound from '../../components/notFound/NotFound';

const ContractorListScreen = ({navigation , route} : any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [contractors, setContractors] = useState([]);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const [get_contractor_by_service, {loading, error, data}] = useMutation(
    GET_CONTRACTOR_BY_SERVICE,
  );
  const getContractorsByService = async () => {
    await get_contractor_by_service({
      variables: {service : route?.params?.service, take: 20, skip: 0},
      context: {headers},
    });
  };

  useEffect(() => {
    if (loading) return;
    getContractorsByService();
  }, []);

  
  useEffect(() => {
    if (loading) return;
    if (data) {
      setContractors(data?.getContractor);
    }
  }, [data]);
  
  return (
    <View className='bg-white min-h-screen'>
      <View className='flex-row justify-between px-6 py-5'>
      <View className='flex-row gap-x-5'>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={icons.back} className="w-7 h-7" />
        </TouchableOpacity>
        <Text className="text-black text-xl font-[Poppins-SemiBold] text-medium">
        {route?.params?.service}
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
        renderItem={WorkerList}
        contentContainerStyle={{paddingBottom: 80}}
      /> :<NotFound/> }
      {/* <WorkerList /> */}
      </View>

    </View>
  );
};

export default ContractorListScreen;
