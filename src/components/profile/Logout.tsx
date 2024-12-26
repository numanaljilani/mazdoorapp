import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {memo} from 'react';
import {Switch, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../service/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bg_color, bg_color2 } from '../../constants/color';

const Logout = ({
  setModal,
  logout,
  logoutModal,
}: {
  setModal: any;
  logout: any;
  logoutModal: boolean;
}) => {
  const {language , dark} = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  return (
    <Modal
      transparent={true}
      visible={logoutModal}
      style={{zIndex: 1100}}
    //   animationType="slide"
      animationType="fade" 
      className=""
      onRequestClose={setModal}>
      <View style={styles.modalBackground} className="flex-1 justify-end ">
        <View />
        <View className={`${bg_color2(dark)} w-full mt-10 px-4 justify-between rounded-t-3xl`}>
        <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " />
          <View className='pb-7'>
           
            <Text className="text-2xl mt-4 font-[Poppins-SemiBold] text-center text-red-500">
              {!language ?  `Logout` : `लॉग आउट`}
            </Text>
            <View className="border-t border-gray-200  mx-10 mt-5" />
            <Text className="text-lg   text-center my-8 text-gray-500 font-[Poppins-SemiBold]">
              {!language ?`Are you sure you want to log out?` : `क्या आप लॉग आउट करना चाहते हैं?`}
            </Text>
            <View className="flex-row">
              <TouchableOpacity
                className="   bg-[#832bff42] rounded-full mx-2 flex-1 py-4"
                onPress={ setModal}>
                <Text className="text-center text-lg text-[#822BFF] font-[Poppins-SemiBold]">
                  {language ? `रद्द करें` : `Cancel`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-4 bg-[#822BFF] mx-2 rounded-full"
                onPress={logout}>
                <Text className="px-6 text-lg text-center text-white font-[Poppins-SemiBold]">
                  {language ? 'लॉग आउट' : `Yes ,Logout`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(Logout);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});
