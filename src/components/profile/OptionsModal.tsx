import {StyleSheet, Modal, View, ActivityIndicator, TouchableOpacity, FlatList, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import { memo } from 'react';
import { Switch, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../service/slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OptionsModal = ({ setModal , navigateToScreen ,logout , navigation  } : {setModal : any , navigateToScreen : any , logout :any , navigation : any  }) => {

  const { language} = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  const changeLanguage = async () =>{
    dispatch(setLanguage(!language))
    await AsyncStorage.setItem('language',JSON.stringify(!language) );
  }

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
        <Text className="px-6 text-lg text-[#312651]">{language ? `सेवा प्रदाता बनें` : `Become a service Provider`}</Text>
       </TouchableOpacity>
       <TouchableOpacity  className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg" onPress={()=>{navigation.navigate("UpdateProfile"); 
  setModal(false)
      }}>
        <Text className="px-6 text-lg text-[#312651]">{language ?`प्रोफ़ाइल अपडेट करें`:`update Profile`}</Text>
       </TouchableOpacity>
       <View className="  py-3 flex-row justify-between border-b text-[#312651] border-[#312651] mx-2 rounded-lg" >
        <Text className="px-6 text-lg text-[#312651]">{language ? `भाषा`:`Language`}</Text>
        <Switch value={language} onValueChange={changeLanguage} />
       </View>
       <TouchableOpacity  className="  py-3 border-b text-[#312651] border-[#312651] mx-2 rounded-lg" onPress={logout}>
        <Text className="px-6 text-lg text-[#312651]" >{language ? "लॉग आउट":`Logout`}</Text>
       </TouchableOpacity>

        </View>
        <TouchableOpacity className="  py-3 bg-[#312651] mx-2 rounded-lg" onPress={()=>setModal(false)}>
        <Text className="text-center text-lg text-white">{language ?`रद्द करें`:`Cancel`}</Text>
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
