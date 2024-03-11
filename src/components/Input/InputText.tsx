import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Icon, TextInput} from 'react-native-paper';
import images from '../../constants/images';
import icons from '../../constants/icons';

const InputText = ({label , value , setData , keyboard , secure , icon  } : {label : string , value : string , setData? : any , keyboard? : boolean , secure ?: boolean , icon ?: string}) => {
//  console.log("Keyboard type " , keyboard)
  return (
    <TextInput
      label={label}
      value={value}
      className='mt-5'
      mode='outlined'
      theme={{ roundness :10}}
      keyboardType= {keyboard ? `default` : `number-pad` }
      // keyboardType=  {"default"}
      secureTextEntry={secure ? true : false}
      autoCapitalize='none'
     
      activeOutlineColor='#312651'
      onChangeText={setData}
  // left={<Icon source={icons.phone}  size={24}   />}
  left={<TextInput.Icon icon={() => <Icon source={ icon ? icon : icons.phone}  size={22} color='#312651'  />} />}
    />
  );
};

export default InputText;
