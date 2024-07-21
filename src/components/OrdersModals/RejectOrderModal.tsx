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

const RejectOrderModal = ({
    setModal,
    cancelBooking,
    modal,
  }: {
    setModal: any;
    cancelBooking: any;
    modal: boolean;
  }) => {
    const {language} = useSelector((state: any) => state?.user);
    const dispatch = useDispatch();
  
    return (
      <Modal
        transparent={true}
        // visible={true}
        visible={modal}
        style={{zIndex: 1100}}
      //   animationType="slide"
        animationType="fade" 
        className=""
        // onRequestClose={}
        >
        <View style={styles.modalBackground} className="flex-1 justify-end ">
          <View />
          <View className="bg-white w-full mt-10 px-4 justify-between rounded-t-3xl">
          <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " />
            <View className='pb-7'>
             
              <Text className="text-xl mt-4 font-[Poppins-Medium] text-center text-red-500">
                Reject Booking
              </Text>
              <View className="border-t border-gray-200  mx-10 mt-3" />
              <Text className="text-lg   text-center my-4 text-gray-500 font-[Poppins-Meduim]">
                Are you sure you want to reject this  booking?
              </Text>
              <View className="flex-row">
                <TouchableOpacity
                  className="   bg-[#832bff42] rounded-full mx-2 flex-1 py-4"
                  onPress={()=>setModal(false) }
                  >
                  <Text className="text-center text-base text-[#822BFF] font-[Poppins-Meduim]">
                    {language ? `रद्द करें` : `Cancel`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className=" py-4 bg-[#822BFF] mx-2 rounded-full"
                  onPress={cancelBooking}
                  >
                  <Text className="px-6 text-base text-center text-white font-[Poppins-Meduim]">
                    {language ? 'लॉग आउट' : `Yes ,Reject Booking`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
}

export default RejectOrderModal

const styles = StyleSheet.create({
    modalBackground: {
      backgroundColor: '#rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
  });