import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

const InputText = ({label , value } : {label : string , value : string}) => {
  const [email, setEmail] = useState('');
  return (
    <TextInput
      label={label}
      value={value}
      className='mt-3'
      mode='outlined'
      theme={{ roundness :50}}
      activeOutlineColor='#312651'
      onChangeText={(text: string) => setEmail(text)}
    />
  );
};

export default InputText;
