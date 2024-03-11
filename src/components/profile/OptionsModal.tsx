import {StyleSheet, Modal, View, ActivityIndicator, TouchableOpacity, FlatList, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import { memo } from 'react';
import { Text } from 'react-native-paper';

const OptionsModal = ({ setModal , navigateToScreen } : {setModal : any , navigateToScreen : any }) => {


  return (
    <Modal
      transparent={true}
      visible={true}
      style={{zIndex: 1100}}
      animationType="slide"
      className=""
      onRequestClose={()=>setModal(false)}
      
      >
      <View style={styles.modalBackground} className="flex-1 justify-end">
        <View/>
        <View className="bg-white w-full h-1/2 rounded-lg  mt-10 px-4 justify-between">
         <View>
       <TouchableOpacity onPress={navigateToScreen} className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg">
        <Text className="px-6 text-lg text-[#312651]">Become a service Provider</Text>
       </TouchableOpacity>
       <TouchableOpacity className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg" onPress={()=>setModal(false)}>
        <Text className="px-6 text-lg text-[#312651]">update Profile</Text>
       </TouchableOpacity>
       <TouchableOpacity className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg" onPress={()=>setModal(false)}>
        <Text className="px-6 text-lg text-[#312651]">Language</Text>
       </TouchableOpacity>
       <TouchableOpacity className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg" onPress={()=>setModal(false)}>
        <Text className="px-6 text-lg text-[#312651]">Logout</Text>
       </TouchableOpacity>

        </View>
        <TouchableOpacity className="  py-3 bg-[#312651] mx-2 rounded-lg" onPress={()=>setModal(false)}>
        <Text className="text-center text-lg text-white">Cancel</Text>
       </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(OptionsModal);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },

});
