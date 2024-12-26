import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import icons from '../../constants/icons';
import {Image} from 'react-native';
import navigationStrings from '../../constants/navigation';
import {useSelector} from 'react-redux';
import images from '../../constants/images';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { bg_color, text_color } from '../../constants/color';

const MoreSerices = ({navigation}: any) => {
  const {userData, token, language , dark} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  return (
    <View className={`${bg_color(dark)} min-h-screen`}>
      <View className="mt-3">
        <View className="flex-row gap-x-5 px-5 py-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.back} className="w-7 h-7" />
          </TouchableOpacity>
          <Text className={`text-xl ${text_color(dark)} font-[Poppins-Medium]`}>
            All Services
          </Text>
        </View>

        <View className="flex-row gap-x-3 gap-y-3 flex-wrap justify-center">
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Helper',
                })
              }
              className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
              <FontAwesome5Icon size={40} color={'#00BCD2'} name="boxes" />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
              {!language ? 'Helper' : 'सहायक'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Plumbing',
                })
              }
              className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#4CAC58'}
                name="face-woman-shimmer-outline"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
              {!language ? 'Maid' : 'नौकरानी'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Cleaning',
                })
              }
              className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
              <MaterialIcons
                size={40}
                color={'#822BFF'}
                name="cleaning-services"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Cleaning' : 'सफाई'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Repairing',
                })
              }
              className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#FE971E'}
                name="hammer-screwdriver"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Repairing' : 'सामान्य बनाना'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Painter',
                })
              }
              className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#1A96F0'}
                name="format-paint"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Painter' : 'पेंटर'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Laundery',
                })
              }
              className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#FDC02D'}
                name="washing-machine"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Laundery' : 'धोबी'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Appliances',
                })
              }
              className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#E94032'}
                name="microwave"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Appliances' : 'उपकरण'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Moving and Packing',
                })
              }
              className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
              <MaterialCommunityIcons
                size={40}
                color={'#00BCD2'}
                name="truck"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Moving and Packing' : 'मूविंग और पैकिंग'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Plumbing',
                })
              }
              className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
              <MaterialIcons size={40} color={'#4CAC58'} name="plumbing" />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Plumbing' : 'नलकार'}
            </Text>
          </View>

          {/* Second Section */}
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Electrician',
                })
              }
              className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialIcons
                size={40}
                color={'#822BFF'}
                name="cleaning-services"
              /> */}
              <Image
                source={icons.electrical}
                className="w-9 h-9"
                tintColor={'#822BFF'}
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Electrician' : 'बिजलीवाला'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Carpenter',
                })
              }
              className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#FE971E'}
                name="hammer-screwdriver"
              /> */}
              <Image
                source={icons.carpenter}
                className="w-9 h-9"
                tintColor={'#FE971E'}
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Carpenter' : 'कारपेंटर'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'HVAC',
                })
              }
              className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#1A96F0'}
                name="format-paint"
              /> */}
              <Image
                source={icons.hvac}
                className="w-10 h-12"
                tintColor={'#1A96F0'}
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'HVAC' : 'एचवीएसी'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Gardener',
                })
              }
              className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#FDC02D'}
                name="washing-machine"
              /> */}
              <Image
                source={icons.gardener}
                className="w-12 h-12"
                tintColor={'#FDC02D'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Gardener' : 'बागवान'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Roofing',
                })
              }
              className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#E94032'}
                name="microwave"
              /> */}
              <Image
                source={icons.roofing}
                className="w-12 h-12"
                tintColor={'#E94032'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Roofing' : 'छत विशेषज्ञ'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Flooring',
                })
              }
              className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#00BCD2'}
                name="truck"
              /> */}
              <Image
                source={icons.flooring}
                className="w-12 h-12"
                tintColor={'#00BCD2'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Flooring' : 'फ़्लोरिंग'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Locksmith',
                })
              }
              className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialIcons size={40} color={'#4CAC58'} name="plumbing" /> */}
              <Image
                source={icons.locksmith}
                className="w-12 h-12"
                tintColor={'#4CAC58'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Locksmith' : 'लॉकस्मिथ'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Pest Control',
                })
              }
              className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <FontAwesome5Icon size={40} color={'#00BCD2'} name="boxes" /> */}
              <Image
                source={icons.pest}
                className="w-12 h-12"
                tintColor={'#00BCD2'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
              {!language ? 'Pest Control' : 'कीट नियंत्रण'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Interior',
                })
              }
              className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#4CAC58'}
                name="face-woman-shimmer-outline"
              /> */}
              <Image
                source={icons.Interior}
                className="w-12 h-12"
                tintColor={'#4CAC58'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
              {!language ? 'Interior' : 'इंटीरियर'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Security',
                })
              }
              className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialIcons
                size={40}
                color={'#822BFF'}
                name="Security-services"
              /> */}
               <Image
                source={icons.guard}
                className="w-12 h-12"
                tintColor={'#822BFF'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Security' : 'सुरक्षा'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Renovation',
                })
              }
              className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#FE971E'}
                name="hammer-screwdriver"
              /> */}
               <Image
                source={icons.renovation}
                className="w-12 h-12"
                tintColor={'#FE971E'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Renovation' : 'नवीनीकरण'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Masonry',
                })
              }
              className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full overflow-hidden">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#1A96F0'}
                name="format-paint"
              /> */}
               <Image
                source={icons.brickwork}
                className="w-12 h-12"
                tintColor={'#1A96F0'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Masonry' : 'ईंट बाँधनेवाला'}
            </Text>
          </View>

          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Window and Door',
                })
              }
              className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#FDC02D'}
                name="washing-machine"
              /> */}
              <Image
                source={icons.door}
                className="w-12 h-12"
                tintColor={'#FDC02D'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Window and Door' : 'ईंट बाँधनेवाला'}
            </Text>
          </View>
          <View className=" w-1/5 aspect-w-1 aspect-h-1">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.SUBCATEGORIES, {
                  service: 'Pool',
                })
              }
              className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
              {/* <MaterialCommunityIcons
                size={40}
                color={'#E94032'}
                name="microwave"
              /> */}
              <Image
                source={icons.pool}
                className="w-12 h-12"
                tintColor={'#E94032'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className={`${text_color(dark)} font-[Poppins-Medium] text-center text-medium`}>
            {!language ? 'Pool' : 'पूल'}
            </Text>
          </View>

        
        </View>
      </View>
    </View>
  );
};

export default MoreSerices;
