import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useRef, useState} from 'react';
import {memo} from 'react';
import {Switch, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../service/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SucessfullOrder = ({
  title,
  desc,
  setModal,
  modal,
}: //     
//     logout,
{
  title: string;
  desc: string;
      setModal: any;
  //     logout: any;
      modal: boolean;
}) => {
  const {language} = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  return (
    <Modal
      transparent={true}
      visible={modal}
      // visible={logoutModal}
      style={{zIndex: 1100}}
      //   animationType="slide"
      animationType="fade"
      className=""
      // onRequestClose={setModal}
    >
      <View
        style={styles.modalBackground}
        className="flex-1 justify-center px-10">
        <View />
        <View className="bg-white w-full mt-10 px-4 justify-between rounded-3xl">
          {/* <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " /> */}
          <View className="pb-7">
            <View className="flex-row justify-center py-6">
              <View className="bg-[#822BFF]/95 flex-row p-8 rounded-full relative">
              <View className="bg-[#822BFF]/50 w-5 h-5 -top-3 rounded-full absolute"/>
              <View className="bg-[#822BFF]/50 w-5 h-5 -bottom-2 rounded-full absolute"/>
              <View className="bg-[#822BFF]/50 w-2 h-2 top-1 -right-2 rounded-full absolute"/>
              <View className="bg-[#822BFF]/50 w-7 h-7 -bottom-8 right-5 rounded-full absolute"/>
                <Ionicons size={70} color={'#ffff'} name="checkbox" />
              </View>
            </View>

            <Text className="text-lg   text-center mt-4 text-[#822BFF]  font-[Poppins-SemiBold]">
              {title}
            </Text>
            <Text className="text-lg   text-center my-4 text-gray-500 font-[Poppins-Regular]">
              {desc}
            </Text>
            <View className="flex-row">
              {/* <TouchableOpacity
                  className="   bg-[#832bff42] rounded-full mx-2 flex-1 py-4"
                  onPress={ setModal}
                  >
                  <Text className="text-center text-lg text-[#822BFF] font-[Poppins-SemiBold]">
                    {language ? `रद्द करें` : `Cancel`}
                  </Text>
                </TouchableOpacity> */}
              <TouchableOpacity
                className="flex-1 py-4 bg-[#822BFF] mx-2 rounded-full"
                  onPress={setModal}
              >
                <Text className="px-6 text-lg text-center text-white font-[Poppins-SemiBold]">
                  {language ? 'लॉग आउट' : `Ok`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(SucessfullOrder);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});
