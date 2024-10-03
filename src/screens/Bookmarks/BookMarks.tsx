import {View, Text, Image, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import icons from '../../constants/icons';
import WorkerList from '../../components/Lists/WorkerList';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {MYBOOKMARK} from '../../graphql/mutation/bookmark';
import {useMutation} from '@apollo/client';
import {services} from '../../constants/services';
import ServicesList from '../../components/Lists/ServicesList';
import NotFoundBooking from '../../components/common/NotFoundBookings';
import ListLoading from '../../components/loading/ListLoading';

const BookMarks = ({navigation}: any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [service, setService] = useState<any>('Electrician');
  const [myBookmarkList, setMyBookmarList] = useState<any>([]);
  const [skLoading , setSkLoading] = useState<boolean>(true)
  const [skip , setSkip] = useState(0)

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const [myBookmarks, {loading, error, data}] = useMutation(MYBOOKMARK);

  const getBookmarks = async () => {
    if(skip < 20) setSkLoading(true)
    const res = await myBookmarks({
      variables: {service, take: 20, skip: 0},
      context: {headers},
    });
    setSkLoading(false)
    console.log(res.data)
    if (res?.data?.myBookmark) {
      setMyBookmarList(res?.data?.myBookmark);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [service]);


  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    getBookmarks()
    setRefreshing(false);
  }, []);

  return (
    <View className="bg-white min-h-screen">
      <View className="flex-row justify-between px-6 py-5">
        <View className="flex-row gap-x-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.back} className="w-7 h-7" />
          </TouchableOpacity>
          <Text className="text-black text-xl font-[Poppins-Medium] text-medium">
            My Bookmarks
          </Text>
        </View>

        <TouchableOpacity>
          <AntDesign size={30} color={'#312651'} name="search1" />
        </TouchableOpacity>
      </View>
      <View className=" px-3 my-2 pb-10">
        <View>
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
        {/* <WorkerList /> */}
       {skLoading ? <ListLoading/> : myBookmarkList.length > 0 ?  <FlatList
        data={myBookmarkList}
        keyExtractor={(item , index) => index.toString()}
        renderItem={(item)=><WorkerList item={item.item} navigation={navigation} contractors ={myBookmarkList} setContractors={setMyBookmarList} fromBookmark ={true} funct={getBookmarks}/>}
        contentContainerStyle={{paddingBottom: 80}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> : <NotFoundBooking des ={"You don't have bookmarks. "}/> }
      </View>
    </View>
  );
};

export default BookMarks;
