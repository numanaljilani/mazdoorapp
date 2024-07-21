import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import icons from '../../constants/icons';
import { Image } from 'react-native';
import navigationStrings from '../../constants/navigation';
import { useSelector } from 'react-redux';

const MoreSerices = ({ navigation } : any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  return (
    <View>
        <View className="mt-3">
        <View className='flex-row gap-x-5 px-5 py-5'>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Image source={icons.back} className="w-7 h-7" />
        </TouchableOpacity>
            <Text className="text-xl text-black font-[Poppins-Medium]">
            All Services
          </Text>
            </View>

          <View className="flex-row gap-x-3 gap-y-3 flex-wrap justify-center">
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST ,{ service : 'Cleaning'})} className="bg-[#822BFF]/10 w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons
                  size={40}
                  color={'#822BFF'}
                  name="cleaning-services"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Cleaning
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST,{ service : 'Repairing'})}  className="bg-[#FE971E]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FE971E'}
                  name="hammer-screwdriver"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Repairing
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST, {
      service : "Painting"
    })}  className="bg-[#1A96F0]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#1A96F0'}
                  name="format-paint"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Painting
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST, {
      service : "Laundery"
    })}  className="bg-[#FDC02D]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#FDC02D'}
                  name="washing-machine"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Laundery
              </Text>
            </View>
            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST, {
      service : "Appliances"
    })}  className="bg-[#E94032]/10 aspect-w-1 aspect-h-1  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#E94032'}
                  name="microwave"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Appliances
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST, {
      service : "Plumbing"
    })}  className="bg-[#00BCD2]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialCommunityIcons
                  size={40}
                  color={'#00BCD2'}
                  name="truck"
                />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Shifting
              </Text>
            </View>

            <View className=" w-1/5 aspect-w-1 aspect-h-1">
              <TouchableOpacity onPress={()=> navigation.navigate(navigationStrings.CONTRACTORLIST, {
      service : "Plumbing"
    })}  className="bg-[#4CAC58]/10  w-16 h-16 justify-center items-center rounded-full">
                <MaterialIcons size={40} color={'#4CAC58'} name="plumbing" />
              </TouchableOpacity>
              <Text className="text-black font-[Poppins-Medium] text-center text-medium">
                Plumbing
              </Text>
            </View>


            
          </View>
        </View>
    </View>
  )
}

export default MoreSerices