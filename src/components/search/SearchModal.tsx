import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {IconButton, Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '../../constants/icons';
import navigationString from '../../constants/navigation';

const SearchModal = ({
  setModal,
  search,
  modal,
  navigation,
}: {
  setModal: any;
  search: any;
  modal: boolean;
  navigation: any;
}) => {
  const {language} = useSelector((state: any) => state?.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const textInputRef = useRef<any>(null);

  const [recentItems, setRecentItems] = React.useState<string[]>([]);

  const searchServices = async () => {
    if (!searchQuery) return;
    setRecentItems(items => [...items, searchQuery]);
    const jsonValue = await JSON.stringify(recentItems);
    await AsyncStorage.setItem('searchHistory', jsonValue);
    setModal(false)
    navigation.navigate(navigationString.CONTRACTORLIST, {
      search: searchQuery,
      searchScreen: true,
    });
  };

  useEffect(() => {
    (async () => {
      if (!modal) return;

      const searchHistory = await AsyncStorage.getItem('searchHistory');
      console.log(searchHistory);
      if (searchHistory) {
        setRecentItems(JSON.parse(searchHistory));
      }
    })();
  }, []);
  return (
    <Modal
      transparent={true}
      visible={modal}
      style={{zIndex: 1100}}
      //   animationType="slide"
      animationType="fade"
      className=""
      // onRequestClose={}
    >
      <View style={styles.modalBackground} className="flex-1 justify-end ">
        <ScrollView contentContainerStyle={{}}>
          <View className="bg-white w-full mt-10 px-4 py-4 min-h-screen  rounded-3xl">
            <View className="py-2 px-4 flex-row justify-between">
              <TouchableOpacity onPress={() => setModal(false)} className="">
                <Image source={icons.back} className="w-6 h-6" />
              </TouchableOpacity>
              <Text className="text-xl text-black/70 font-[Poppins-SemiBold]">
                {language ? 'खोज' : `Search`}
              </Text>
              <View />
            </View>
            <Searchbar
              style={styles.searchBar}
              ref={textInputRef}
              autoFocus={true}
              placeholder={language ? 'खोज' : `Search`}
              onChangeText={setSearchQuery}
              value={searchQuery}
              right={() => (
                <IconButton
                  onPress={searchServices}
                  size={30}
                  icon="filter-outline"
                  iconColor="rgba(130, 43, 255, 5)"
                />
              )}
            />
            <View className="flex-row justify-between">
              <Text className="text-lg font-[Poppins-SemiBold] text-black/80 tracking-wider">
                {language ? 'हाल ही का' : `Recent`}
              </Text>
              <TouchableOpacity className="">
                <Text className="text-lg font-[Poppins-SemiBold] text-[#822BFF] tracking-wider">
                  {language ? 'सभी साफ करें' : `Clear All`}
                </Text>
              </TouchableOpacity>
            </View>
            {recentItems
              .map((item, index) => (
                <View key={index} style={styles.recentContainer}>
                  <Text
                    style={{fontSize: 14, color: 'grey'}}
                    className="font-[Poppins-Regular] text-base tracking-wider">
                    {item}
                  </Text>
                  <IconButton
                    style={{paddingTop: 10}}
                    iconColor="grey"
                    icon="delete-circle"
                    size={23}
                  />
                </View>
              ))
              .reverse()}
          </View>
        </ScrollView>
        {/* <View className="flex-row absolute bottom-20  left-0 right-0">
              <TouchableOpacity
                className="   bg-[#832bff42] rounded-full mx-2 flex-1 py-4 "
                onPress={() => setModal(false)}>
                <Text className="text-center text-base text-[#822BFF] font-[Poppins-Meduim]">
                  {language ? `रद्द करें` : `Cancel`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" py-4 bg-[#822BFF] mx-2 rounded-full flex-1"
                // onPress={cancelBooking}
              >
                <Text className="px-6 text-base text-center text-white font-[Poppins-Meduim]">
                  {language ? 'लॉग आउट' : `Search`}
                </Text>
              </TouchableOpacity>
            </View> */}
      </View>
    </Modal>
  );
};

export default SearchModal;
const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  searchBar: {
    backgroundColor: 'rgba(240, 240, 240, 1)',
    marginBottom: 20,
  },
  resultInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  resultCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(130, 43, 255, 10)',
  },
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
