import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Button, IconButton, TextInput} from 'react-native-paper';
import MyCalender from '../../components/Calender/MyCalender';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/common/Button';
import RazorpayCheckout from 'react-native-razorpay';
import {BOOKANAPPOINTMENT, MYDATEAPPOINTMENT} from '../../graphql/mutation/appointment';
import {useMutation} from '@apollo/client';
import navigationString from '../../constants/navigation'
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';



const CalenderBookings = ({ navigation} : any) => {

    const [date, setDate] = React.useState(new Date());
    const [workingHours, setWorkinghours] = React.useState(2);
    const [time, setTime] = React.useState<string>('09:00 AM');
    const [loading , setLoading] = useState<boolean>(false)
    const [text, setText] = React.useState('');

    const {userData, token, language} = useSelector((state: any) => state?.user);
    // console.log(time)
    const headers = {
      authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
    };
  
    const [myAppointment, { error, data}] =
      useMutation(MYDATEAPPOINTMENT);
  
    const decrementWorkingHours = () => {
      if (workingHours > 2) {
        setWorkinghours(workingHours - 1);
      }
    };
  
    interface ButtonGroupProps {
      values: string[];
      isPressed: string | null;
      handlePress: (value: string) => void;
    }
  
    const [isPressed, setIsPressed] = useState<string | null>(null);
  
    const handlePress = (buttonName: string) => {
      setIsPressed(prevState => (buttonName === prevState ? null : buttonName));
    };
  
  
    const bookAnAppointment = async () => {
      setLoading(true)
      const res = await myAppointment({
        variables: {
          date: date,
          take : 20,
          skip : 0
        },
        context: {headers},
      });
      console.log(res)

    };

    useEffect(()=>{
      bookAnAppointment()
    },[date])
    const ButtonGroup: React.FC<ButtonGroupProps> = ({
      values,
      isPressed,
      handlePress,
    }) => {
      const handleClick = (value: string) => {
        if (isPressed !== value) {
          handlePress(value);
          setTime(value);
        }
      };
  
      return (
        <ScrollView
          className="py-2"
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.buttonContainer}>
          {values.map(value => (
            <Button
              key={value}
              mode="outlined"
              style={[styles.button, isPressed === value && styles.activeButton]}
              onPress={() => handleClick(value)}>
              <Text
                className="text-xs"
                style={[
                  styles.buttonText,
                  isPressed === value && styles.activeButtonText,
                ]}>
                {value}
              </Text>
            </Button>
          ))}
        </ScrollView>
      );
    };
  
    return (
      <>
        <ScrollView>
          <Appbar.Header className="bg-transparent">
            <Appbar.BackAction onPress={() => navigation.navigate.goBack()} />
            <Appbar.Content title="Details Details" color="black" />
            
          </Appbar.Header>
  
          <View className="px-5">
            {/* Calender */}
  
            <View className="pb-2 ">
              <Text className="text-black font-extrabold mb-5 text-base">
                Select Date
              </Text>
              <MyCalender date={date} setDate={setDate} />
            </View>
  
            {/* Working Hours */}
  
            <View className="mb-3 rounded-2xl px-4 py-1 bg-white flex-row items-center justify-between">
              <View className="flex flex-col">
                <Text className="text-xl mb-1 text-black font-extrabold">
                  Working Hours
                </Text>
                <Text className="text-xs font-bold text-gray-400">
                  Cost increase after 2 hrs of work.
                </Text>
              </View>
              <View className="flex-row items-center">
                <IconButton
                  onPress={e => setWorkinghours(workingHours + 1)}
                  size={40}
                  iconColor="rgba(130, 43, 255, 0.7)"
                  icon="plus-circle"
                />
                <Text className="font-extrabold text-black text-xl">
                  {workingHours}
                </Text>
                <IconButton
                  onPress={decrementWorkingHours}
                  size={40}
                  iconColor="rgba(130, 43, 255, 0.7)"
                  icon="minus-circle"
                />
              </View>
            </View>
  
            {/* Start Time */}
  
            <View className="mb-2">
              <Text className="text-black font-extrabold text-base">
                Choose Start Time
              </Text>
              <ButtonGroup
                values={[
                  '09:00 AM',
                  '10:00 AM',
                  '11:00 AM',
                  '13:00 PM',
                  '14:00 PM',
                  '15:00 PM',
                ]}
                isPressed={isPressed}
                handlePress={handlePress}
              />
            </View>
  
            {/* Promo Code */}
  
            {/* <View>
              <Text className="text-black font-extrabold text-base mb-2">
                Promo Code
              </Text>
              <View className="flex-row justify-between items-center w-full h-12">
                <TextInput
                  className="rounded-2xl w-10/12 h-12"
                  placeholder="Enter Promo Code"
                  value={text}
                  onChangeText={text => setText(text)}
                  underlineColor="transparent"
                />
                <IconButton
                  onPress={() => console.log('Promo code press')}
                  size={30}
                  iconColor="rgba(130, 43, 255, 0.7)"
                  icon="plus-circle"
                />
              </View>
            </View> */}
            {/* <View
              className="mt-4"
              style={{borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}}></View>
            <View className="py-2">
              <CustomButton
                text={`You have to pay ₹ ${route?.params?.price}`}
                onPressFunction={completeThePayment}
              />
            </View> */}
          </View>
        </ScrollView>
        {loading && <ActivityIndicatorComponent/>}
      </>
    );
}

export default CalenderBookings

const styles = StyleSheet.create({
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      borderRadius: 20,
      backgroundColor: '#fff',
      marginRight: 10,
      borderColor: 'blue',
      borderWidth: 2,
    },
    buttonText: {
      color: 'blue',
      fontSize: 14,
    },
    activeButton: {
      backgroundColor: 'blue',
    },
    activeButtonText: {
      color: 'white',
    },
  });