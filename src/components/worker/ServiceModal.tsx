import {StyleSheet, Modal, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import { memo } from 'react';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';


const ServiceModal = ({data ,  setSericeModal  , setServcie} : {data : any ,setSericeModal : any , setServcie : any }) => {
  const { language } = useSelector((state: any) => state?.user);
  console.log(data)
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      style={{zIndex: 1100}}
      onRequestClose={() => {}}
      className=""
      >
      <View style={styles.modalBackground} className="flex-1 flex-col justify-end">
        <View className="bg-white w-full rounded-lg h-2/3  mt-10 px-4 ">
         <FlatList
          data={data}
          keyExtractor={(itme , index) =>index.toString()} 
          renderItem={({item})=> (  <TouchableOpacity onPress={()=>{
            setServcie(item)
            setSericeModal(false)}} className='py-3  px-5 border-b border-gray-200'>
          <Text className='text-lg font-semibold text-[#312651]'>{language ? item.hindi :item.english}</Text>
       </TouchableOpacity>)}
          contentContainerStyle={{paddingBottom: 10}}
        />
       <TouchableOpacity className="  py-3 bg-[#312651] mx-2 rounded-lg" onPress={()=>setSericeModal(false)}>
        <Text className="text-center text-lg text-white">{language ? `रद्द करना` :`Cancel`}</Text>
       </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ServiceModal);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },

});
