import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { bg_color, bg_color2, text_color } from '../../constants/color'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import icons from '../../constants/icons';
import { services } from '../../constants/services';
import navigationString from '../../constants/navigation'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SubCategories = ({navigation , route} : any) => {
    const {service} = route?.params;
    const findByName = (nameToFind : string ) => {
        const serv = services.find((obj : any) => obj.english === nameToFind);
        console.log(serv , "?>>>>");
        return serv
    };
    
    const result = findByName(service)
    console.log(result?.subservices , "result");
    
    
    
    const { language , dark} = useSelector((state: any) => state?.user);
  return (
    <View className={`min-h-screen ${bg_color(dark)}`}>
        <View className={`px-5 py-5 ${bg_color(dark)} flex-row gap-x-3`}>
              <TouchableOpacity onPress={()=> navigation.goBack()}>
      
              <Image source={icons.back} className='h-6 w-6' tintColor={!dark ? "#000000" : "#ffff"}/>
              </TouchableOpacity>
              <Text className={`${text_color(dark)}  font-[Poppins-SemiBold] text-lg shadow-lg shadow-white`}>
                {!language ? `Sub Services` : `उपश्रेणी`}
              </Text>
            </View>

            <View className='px-4'>
            <FlatList
              data={result?.subservices}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}: any) => (
              <TouchableOpacity className={`${bg_color2(dark)} px-5 py-4 mt-4 rounded-lg flex-row justify-between`} onPress={()=> navigation.navigate(navigationString.CONTRACTORLIST , {service : service , sub :  item?.english })}>
                <Text className={`${text_color(dark)} text-lg font-[Poppins-SemiBold]`}>{!language ? item?.english : item?.hindi}</Text>

                 <MaterialIcons name='navigate-next' size={30}       color={'#A4A4A4'}/> 
              </TouchableOpacity>
              )}
              
              showsHorizontalScrollIndicator={false}
            />
          </View>
    </View>
  )
}

export default SubCategories