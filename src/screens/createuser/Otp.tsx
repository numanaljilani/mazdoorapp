import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useVerifyOtpMutation} from '../../service/api/userApi';
import {useSelector} from 'react-redux';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
const Otp = ({navigation}: {navigation: any}) => {
  const {language , token} = useSelector((state: any) => state?.user);
  const [verifyOtp, {data, isSuccess, error, isError, isLoading}] =
    useVerifyOtpMutation();

  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const otp1Ref = useRef<any>(null);
  const otp2Ref = useRef<any>(null);
  const otp3Ref = useRef<any>(null);
  const otp4Ref = useRef<any>(null);

  const handleOTPChange = (text: any, ref: any) => {
    if (ref === otp1Ref && text.length === 1) {
      otp2Ref?.current.focus();
    } else if (ref === otp2Ref && text.length === 1) {
      otp3Ref.current.focus();
    } else if (ref === otp3Ref && text.length === 1) {
      otp4Ref.current.focus();
    }
    // Update the state based on the input field
    switch (ref) {
      case otp2Ref:
        setOTP2(text);
        break;
      case otp3Ref:
        setOTP3(text);
        break;
      case otp4Ref:
        setOTP4(text);
        break;
      default:
        setOTP1(text);
    }
  };

  const handleVerifyOTP = async () => {
    // Combine the OTP digits to form the OTP
    const otp = otp1 + otp2 + otp3 + otp4;
    // Implement your OTP verification logic here
    console.log('Verifying OTP:', otp);
    verifyOtp({token, body: {otp}});
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('CompleteProfile');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error, '>>>>>>>>');
    }
  }, [isError]);

  return (
    <View className=" flex-1 items-center px-4 my-5 py-5 bg-gray-100">
      <MaterialIcons size={50} name="security" color={'#312651'} />
      <Text style={styles.title} className="text-[#312651]">
        {language ? `ओटीपी दर्ज करें`:`Enter OTP`}
      </Text>
      <Text className="text-center my-3">
        {language ? `कृपया वह ओटीपी दर्ज करें जिसे हमने अभी प्रक्रिया के लिए भेजा है` :`Please Enter the otp we just sent  to proced`}
      </Text>
      <View className="flex-row gap-4">
        <TextInput
          style={styles.input}
          value={otp1}
          onChangeText={text => handleOTPChange(text, otp1Ref)}
          keyboardType="numeric"
          ref={otp1Ref}
          maxLength={1}
        />
        <TextInput
          style={styles.input}
          value={otp2}
          onChangeText={text => handleOTPChange(text, otp2Ref)}
          keyboardType="numeric"
          maxLength={1}
          ref={otp2Ref}
        />
        <TextInput
          style={styles.input}
          value={otp3}
          onChangeText={text => handleOTPChange(text, otp3Ref)}
          keyboardType="numeric"
          maxLength={1}
          ref={otp3Ref}
        />
        <TextInput
          style={styles.input}
          value={otp4}
          onChangeText={text => handleOTPChange(text, otp4Ref)}
          keyboardType="numeric"
          maxLength={1}
          ref={otp4Ref}
        />
      </View>
      <TouchableOpacity
        onPress={handleVerifyOTP}
        className=" bg-[#312651]  w-3/4 mt-3 rounded-lg items-center py-3">
        <Text className="text-base font-semibold text-white">{language ? `जारी रखना`:`Continue`}</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicatorComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: '15%',
    height: 40,
    // borderColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderBottomColor: 'gray',
  },
});

export default Otp;
