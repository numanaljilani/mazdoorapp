import {StyleSheet, Modal, View, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import { memo } from 'react';
import { Text } from 'react-native-paper';

const ServiceModal = ({ data , setSericeModal  , setServcie} : {data : string[] , setSericeModal : any , setServcie : any }) => {
  const [modalVal, setModalVal] = useState(true);
  const [services , setServices] = useState<string[]>([
    "Electrician",
    "Plumber",
    "Carpenter",
    "Handyman",
    "Painter",
    "HVAC Technician",
    "Landscaper/Gardener",
    "Cleaning Service",
    "Roofing Specialist",
    "Flooring Specialist",
    "Locksmith",
    "Pest Control",
    "Appliance Repair Technician",
    "Interior Designer",
    "Moving and Packing Service",
    "Home Security Specialist",
    "Renovation Contractor",
    "Masonry/Bricklayer",
    "Window and Door Installation/Repair",
    "Pool Maintenance/Repair"
  ])
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={modalVal}
      style={{zIndex: 1100}}
      onRequestClose={() => {}}
      className=""
      >
      <View style={styles.modalBackground} className="flex-1 flex-col justify-end">
        <View className="bg-white w-full rounded-lg h-2/3  mt-10 px-4 ">
         <FlatList
          data={services}
          keyExtractor={(itme , index) =>index.toString()} 
          renderItem={({item})=> (  <TouchableOpacity onPress={()=>{
            setServcie(item)
            setSericeModal(false)}} className='py-3  px-5 border-b border-gray-200'>
          <Text className='text-lg font-semibold text-[#312651]'>{item}</Text>
       </TouchableOpacity>)}
          contentContainerStyle={{paddingBottom: 10}}
        />
       <TouchableOpacity className="  py-3 bg-[#312651] mx-2 rounded-lg" onPress={()=>setSericeModal(false)}>
        <Text className="text-center text-lg text-white">Cancel</Text>
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
