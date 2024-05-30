import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import NotFound from '../../components/notFound/NotFound';

const BookMarks = ({navigation}: any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [service, setService] = useState<any>('Electrician');
  const [myBookmarkList, setMyBookmarList] = useState<any>([]);
  console.log(service, '>>>>>>');

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const [myBookmarks, {loading, error, data}] = useMutation(MYBOOKMARK);

  const getBookmarks = async () => {
    const res = await myBookmarks({
      variables: {service, take: 20, skip: 0},
      context: {headers},
    });
    console.log(res);
    if (res?.data?.myBookmark) {
      setMyBookmarList(res?.data?.myBookmark);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, [service]);
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
      <View className=" px-3">
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
       {myBookmarkList.length > 0 ?  <FlatList
        data={myBookmarkList}
        keyExtractor={(item , index) => index.toString()}
        renderItem={WorkerList}
        contentContainerStyle={{paddingBottom: 80}}
      /> :<NotFound/> }
      </View>
    </View>
  );
};

export default BookMarks;
