import {View, Text} from 'react-native';
import React, { useState } from 'react';
import icons from '../../constants/icons';
import ProfileButton from '../../components/profile/ProfileButton';
import {useSelector} from 'react-redux';
import { Appbar } from 'react-native-paper';
import ChangePasswordModal from '../../components/changePassword/ChangePasswordModal';

const Security = ({navigation} : any) => {
  const {userData, token, posts, language} = useSelector(
    (state: any) => state?.user,
  );

  const [changePassword , setChangePassword ] = useState<boolean>(false)
  return (
    <View className='bg-white flex-1'>
      <Appbar.Header className="bg-transparent">
        <Appbar.BackAction onPress={() => navigation.navigate.goBack()} />
        <Appbar.Content title="Security" color="black" />
       
      </Appbar.Header>
      <ProfileButton
        text={!language ? 'Change Password' : 'सूचनाएं'}
        icon={icons.password}
        onPress={()=> setChangePassword(true)}
      />
      <ChangePasswordModal modal={changePassword} setModal={setChangePassword} />
    </View>
  );
};

export default Security;
