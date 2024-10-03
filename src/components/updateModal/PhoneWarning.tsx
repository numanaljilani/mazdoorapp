import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import navigationString from '../../constants/navigation';

const PhoneWarning = ({setModal, navigation}: any) => {
  const {language} = useSelector((state: any) => state?.user);
  return (
    <Modal
      transparent={true}
      visible={true}
      style={{zIndex: 1100}}
      animationType="slide"
      className="">
      <View style={styles.modalBackground} className="flex-1 justify-center">
        <View />
        <View className="bg-white mx-3 py-4  rounded-lg px-4 justify-between">
          <View className=" justify-center items-center">
            <Ionicons name="warning-outline" size={50} color="#822BFF" />
            <Text className="px-6 text-base my-3 text-center text-[#822BFF]">
              {/* do you want  to delete image ?  */}
              {language
                ? `
कृपया अपना फ़ोन नंबर अपडेट करें।`
                : `Please update your phone number .`}
            </Text>
          </View>
          <View className="flex-row py-3">
            <TouchableOpacity
              onPress={() => setModal(false)}
              className=" flex-1 py-3 border border-[#822BFF] mx-2 rounded-lg">
              <Text className="text-center text-lg text-[#822BFF]">
                {language ? 'रद्द करना' : 'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationString.UPDATEPROFILE);
                setModal(false);
              }}
              className=" flex-1 py-3 bg-[#822BFF] mx-2 rounded-lg">
              <Text className="text-center text-lg text-white">
                {language ? `अद्यतन` : `update`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});
export default PhoneWarning;
