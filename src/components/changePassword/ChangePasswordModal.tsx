import {StyleSheet, Modal, View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, TextInput} from 'react-native-paper';
import icons from '../../constants/icons';
import { showMessage } from 'react-native-flash-message';

const ChangePasswordModal = ({
  setModal,
  modal,
}: {
  setModal: any;
  modal: boolean;
}) => {
  const {language} = useSelector((state: any) => state?.user);
  const [show , setShow] = useState<boolean>(false)
  const [confirmShow , setConfirmShow] = useState<boolean>(false)
  const [password , setPassword] = useState<string>('')
  const [cpassword , setCPassword] = useState<string>('')
  const changePassword = async () => {
    console.log(password , cpassword)
    if(password !== cpassword){
        showMessage({ 
            message : "Passowrd and confirm password must be  same.", 
            icon : 'danger',
            type : 'danger',
            position : 'top'
        })
    }
    else if(password.length < 5 || cpassword.length < 5){
        showMessage({ 
            message : "Passowrd and confirm password lenght must be  greather then 5.", 
            icon : 'danger',
            type : 'danger',
            position : 'top'
        })
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modal}
      style={{zIndex: 1100}}
      //   animationType="slide"
      animationType="fade"
      className=""
      // onRequestClose={}
    >
      <View style={styles.modalBackground} className="flex-1 justify-end ">
        <View />
        <View className="bg-white w-full mt-10 px-4 justify-between rounded-t-3xl">
          <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " />
          <View className="pb-7">
            <Text className="text-xl mt-4 font-[Poppins-Medium] text-center text-red-500">
              Change Password
            </Text>
            <View className="border-t border-gray-200  mx-10 mt-3" />
            <Text className="text-sm   text-center my-4 text-gray-500 font-[Poppins-Meduim]">
              Are you sure you want to change the password?
            </Text>
            <View className='gap-y-4 py-6 px-4'>
              <TextInput
                className="bg-white border-gray-500 text-black"
                mode="outlined"
                activeOutlineColor="#822BFF"
                placeholder={'Password'}
                // outlineColor="transparent"
                secureTextEntry = {show ? true :false}
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}
                right={
                    true && (
                      <TextInput.Icon
                        icon={() => <Icon source={!show ? icons.show : icons.hide} size={22} color={show ? "#822BFF" : "#D3D3D3"} />}
                        onPress={()=>setShow(!show)}
                      />
                    )
                  }
              />
              <TextInput
                className="bg-white border-gray-500 text-black"
                mode="outlined"
                activeOutlineColor="#822BFF"
                autoCapitalize='none'
                // outlineColor="transparent"
                onChangeText={(text) => setCPassword(text)}
                placeholder={'Confirm Password'}
                secureTextEntry = {confirmShow ? true :false}
                right={
                    true && (
                      <TextInput.Icon
                        icon={() => <Icon source={!confirmShow ? icons.show : icons.hide} size={22} color={confirmShow ? "#822BFF" : "#D3D3D3"} />}
                        onPress={()=>setConfirmShow(!confirmShow)}
                      />
                    )
                  }
              />
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="   bg-[#832bff42] rounded-full mx-2 flex-1 py-4"
                onPress={() => setModal(false)}>
                <Text className="text-center text-base text-[#822BFF] font-[Poppins-Meduim]">
                  {language ? `रद्द करें` : `Cancel`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" py-4 bg-[#822BFF] mx-2 rounded-full"
                onPress={changePassword}>
                <Text className="px-6 text-base text-center text-white font-[Poppins-Meduim]">
                  {language ? 'लॉग आउट' : `Change password`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});
