import {StyleSheet, Modal, View, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import { memo } from 'react';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const ServiceModal = ({ data , setSericeModal  , setServcie} : {data : string[] , setSericeModal : any , setServcie : any }) => {
  const [modalVal, setModalVal] = useState(true);
  const { language} = useSelector((state: any) => state?.user);
  const unitsOfWork = [
    { english: "Hour", hindi: "घंटा" },
    { english: "Day", hindi: "दिन" },
    { english: "Week", hindi: "सप्ताह" },
    { english: "Piece", hindi: "टुकड़ा" },
    { english: "Meter", hindi: "मीटर" },
    { english: "Cubic Meter", hindi: "क्यूबिक मीटर" },
    { english: "Ton", hindi: "टन" },
    { english: "Gallon", hindi: "गैलन" },
    { english: "Square Meter", hindi: "वर्ग मीटर" },
    { english: "Linear Meter", hindi: "लीनियर मीटर" },
    { english: "Kilogram", hindi: "किलोग्राम" },
    { english: "Square Foot", hindi: "वर्ग फ़ीट" },
    { english: "Cubic Foot", hindi: "क्यूबिक फ़ीट" },
    { english: "Liter", hindi: "लीटर" },
    { english: "Piece Rate", hindi: "टुकड़े की दर" },
    { english: "Man-Day", hindi: "आदमी-दिन" },
    { english: "Tonne", hindi: "टन" },
    { english: "Foot", hindi: "फुट" },
    { english: "Yard", hindi: "गज" },
    // Add more units as needed...
];

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
          data={unitsOfWork}
          keyExtractor={(itme , index) =>index.toString()} 
          renderItem={({item})=> (  <TouchableOpacity onPress={()=>{
            setServcie(item.english)
            setSericeModal(false)}} className='py-3  px-5 border-b border-gray-200'>
          <Text className='text-lg font-semibold text-[#312651]'>{language ?item.hindi :item.english}</Text>
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
