import {View, Text, TouchableOpacity, Image, FlatList, RefreshControl} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import icons from '../../constants/icons';
import { MYNOTIFICATIONS } from '../../graphql/mutation/notification';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import NotFoundBooking from '../../components/common/NotFoundBookings';

const NotificationCard = ({ item } :any) => {
  console.log(item)
  return (
    <TouchableOpacity className='mx-3 mt-2 flex-row bg-white rounded-xl py-2 px-3'>
      <View className="bg-[#822BFF]/20 p-4 w-16 h-16 rounded-full flex-row justify-center items-center">
        <Image source={icons.user} className="w-9 h-9" tintColor={"#822BFF"}/>
      </View>
      <View className='px-4  flex-1'>
        <Text className="text-black font-[Poppins-Medium] text-sm">{item.title}</Text>
        <Text className="text-black font-[Poppins-Regular] text-sm">{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Notification = ({navigation} : any) => {
    const {userData, token, language} = useSelector((state: any) => state?.user);
    const [notifications,setNotitfications] = useState([])
    const headers = {
        authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
      };
    const [myNotifications] = useMutation(MYNOTIFICATIONS);


    const notificationFunction = async () => {
        console.log('inside myNotifications');
        const res = await myNotifications({
          variables: {take: 20, skip: 0},
          context: {headers},
        });
        console.log(res?.data?.myNotifications, '>>>>>>');
        if(res?.data?.myNotifications){
            setNotitfications(res?.data?.myNotifications)
        }
        
      };
    
      useEffect(() => {
        notificationFunction();
      }, []);
      const [refreshing, setRefreshing] = useState(false);

      const onRefresh = useCallback(() => {
        setRefreshing(true);
        notificationFunction();
        setRefreshing(false);
        // Simulate a network request

      }, []);
  return (
    <View>
      <View className="px-5 py-5 bg-white flex-row gap-x-3">
        <TouchableOpacity onPress={()=> navigation.goBack()}>

        <Image source={icons.back} className='h-6 w-6'/>
        </TouchableOpacity>
        <Text className="text-black font-[Poppins-SemiBold] text-lg">
          Notifications
        </Text>
      </View>
      
      {notifications.length > 0 ? <FlatList
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
            //   renderItem={({item}: any) => (
            //     <ServicesList
            //       item={item}
            //       service={service}
            //       setService={setService}
            //       language={language}
            //     />
            //   )}
            renderItem={(item)=><NotificationCard item={item.item}/>}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            /> : <NotFoundBooking/>}
      {/* <NotificationCard /> */}
    </View>
  );
};

export default Notification;
