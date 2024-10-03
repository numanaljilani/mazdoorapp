import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactUsBtn from '../../components/profile/ContactUsBtn';

const HelpCenter = () => {
  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: 15}}>
      <View>
        <View className="mt-4 py-3 flex-row gap-x-3 items-center">
          <Ionicons name="arrow-back" size={30} color={'#000000'} />

          <Text className="text-black  font-[Poppins-Medium] text-lg">
            {'Help Center'}
          </Text>
        </View>
        <View className="flex-row py-4">
          <TouchableOpacity
            className={`flex-1  justify-center items-center ${
              true
                ? 'border-b-4 border-[#822BFF] '
                : 'border-b-4 border-gray-300'
            }`}>
            <Text
              className={`font-[Poppins-Medium] text-lg text-gray-400 ${
                true ? ' text-[#822BFF] ' : ' text-gray-300 '
              }`}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1  justify-center items-center border-b-4  ${
              false ? ' border-[#822BFF] ' : 'border-gray-300 '
            }`}>
            <Text
              className={`font-[Poppins-Medium] text-lg text-gray-400 ${
                false ? ' text-[#822BFF] ' : ' text-gray-400 '
              }`}>
              Contact us
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ContactUsBtn text="Customer Service" icon={'headset'}  onPress={()=>{
            Linking.openURL('https://www.mazdur.in/contact');
          }}/>
          <ContactUsBtn text="WhatsApp" icon={'logo-whatsapp'} />
          <ContactUsBtn text="Website" icon={'planet-outline'} />
          <ContactUsBtn text="Facebook" icon={'logo-facebook'} />
          <ContactUsBtn text="Twitter" icon={'logo-twitter'} />
          <ContactUsBtn text="Instagram" icon={'logo-instagram'} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HelpCenter;


// mazdur@123