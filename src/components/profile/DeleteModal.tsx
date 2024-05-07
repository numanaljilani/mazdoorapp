import {
  StyleSheet,
  Modal,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {memo} from 'react';
import {Text} from 'react-native-paper';
import icons from '../../constants/icons';
import { useSelector } from 'react-redux';

const DeleteModal = ({
  setModal,
  deleteFunc,
}: {
  setModal: any;
  deleteFunc: any;
}) => {
  const { language} = useSelector(
    (state: any) => state?.user,
  );
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
          <View className=" justify-center items-center ">
            <Image
              source={icons.delete}
              className="w-12 h-12"
              resizeMode="contain"
              tintColor={'#312651'}
            />
            <Text className="px-6 text-base my-3 text-center text-[#312651]">
              {/* do you want  to delete image ?  */}
             {language ?  `आप इमेज को हटाना चाहते हैं।` : ` Do you want  to delete image ?`}
            </Text>
          </View>
          <View className="flex-row py-3">
            <TouchableOpacity onPress={()=>setModal(false)} className=" flex-1 py-3 border border-[#312651] mx-2 rounded-lg">
              <Text className="text-center text-lg text-[#312651]">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteFunc} className=" flex-1 py-3 bg-[#312651] mx-2 rounded-lg">
              <Text className="text-center text-lg text-white">{language ? `मिटाना`: `Delete`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(DeleteModal);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});
