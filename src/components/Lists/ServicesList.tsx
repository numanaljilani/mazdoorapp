import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { bg_color, bg_color2 } from '../../constants/color'

const ServicesList = ({setService , item , service , language } : { setService : any ,item : { id : string , english : string , hindi : string} , service : string , language : boolean}) => {

  return (
        <TouchableOpacity
          onPress={() => setService(item.english)}
          className={`rounded-full py-2 px-4 mx-1 border-2 border-[#822BFF]  my-3 bg-${
            item.english === service ? '[#822BFF]' : bg_color("dark")
          }`}>
          <Text
            className={`text-base font-[Poppins-Medium] font-semibold text-gray-100 text-${
              item.english === service ? 'white' : '[#822BFF]'
            }`}>
            {language ? item.hindi : item.english}
          </Text>
        </TouchableOpacity>
      
  )
}

export default ServicesList