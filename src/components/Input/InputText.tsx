import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { Icon, TextInput } from 'react-native-paper';
import icons from '../../constants/icons';
import { bg_color, bg_color2 } from '../../constants/color';
import { useSelector } from 'react-redux';

const MemoizedTextInput = React.memo(TextInput);

const InputText = ({
  label,
  value,
  setData,
  keyboard,
  secure,
  icon,
  right,
  securePass,
  pass,
  flag,
  multiline,
  onChangeState,
  calendar,
  setCalenderModal
}: {
  label: string;
  value: string;
  setData?: any;
  keyboard?: boolean;
  secure?: boolean;
  icon?: string;
  right?: string;
  securePass?: any;
  pass?: boolean;
  flag?: boolean
  multiline?: boolean,
  onChangeState?: any,
  calendar?: boolean,
  setCalenderModal?: any
}) => {
  const [focused, setFocued] = useState(false);
  const {language , dark} = useSelector((state: any) => state?.user);

  const handleTextInputChange = (inputText: any) => {
    setData(inputText);
  };
  return (
    <MemoizedTextInput
      textColor={dark ? "white":"#28282B"}
      label={!focused ? label : ""}
      value={value}
      mode="outlined"
      theme={{ roundness: 10 , colors : {background: dark ? "#2E2E2E" : "#f9fafb", text: dark ? "white" : "#28282B"}}}
      
      keyboardType={keyboard ? `default` : `number-pad`}
      onFocus={() => {

        setFocued(true)
        calendar && setCalenderModal(true)
      }}
      className={`mt-5 font-[Poppins-Regular] ${bg_color(dark)} bg-gray-50 shadow-lg shadow-black el`}
      
      textAlignVertical="center"
      onBlur={() => setFocued(false)}
      secureTextEntry={pass ? true : false}
      autoCapitalize="none"
      activeOutlineColor="#822BFF"
      outlineColor='transparent'
      multiline={multiline && true}
      numberOfLines={multiline ? 3 : 1}

      onChangeText={handleTextInputChange}
      left={
        !flag ? icon && <TextInput.Icon
          icon={() => (
            <Icon
              source={icon ? icon : icons.phone}
              size={22}
              color={focused ? "#822BFF" : "#D3D3D3"}
            />
          )}
        /> :
          <TextInput.Icon
            icon={() => (
              <Icon
                source={icon}
                size={24}

              />
            )}
          />
      }
      right={
        secure && (
          <TextInput.Icon
            icon={() => <Icon source={right} size={22} color={focused ? "#822BFF" : "#D3D3D3"} />}
            onPress={securePass}
          />
        )
      }
    />
  );
};

export default InputText;
