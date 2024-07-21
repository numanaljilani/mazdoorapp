import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Button, Card, IconButton, Paragraph, TextInput, Title} from 'react-native-paper';
import MyCalender from '../../components/Calender/MyCalender';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/common/Button';
import RazorpayCheckout from 'react-native-razorpay';
import {BOOKANAPPOINTMENT, MYDATEAPPOINTMENT} from '../../graphql/mutation/appointment';
import {useMutation} from '@apollo/client';
import navigationString from '../../constants/navigation'
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import NotFound from '../../components/notFound/NotFound';
import NotFoundBooking from '../../components/common/NotFoundBookings';
import env from '../../env';
import { formatedDateFunction } from '../../utils/dateFinction';



const MyCalenderBookings = ({ navigation} : any) => {

    const [date, setDate] = React.useState(new Date());
    const [workingHours, setWorkinghours] = React.useState(2);
    const [time, setTime] = React.useState<string>('09:00 AM');
    const [loading , setLoading] = useState<boolean>(false)
    const [bookings , setBookings ] = useState<[]>([])
    const [text, setText] = React.useState('');

    const {userData, token, language} = useSelector((state: any) => state?.user);
    // console.log(time)
    const headers = {
      authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
    };
  
    const [myAppointment, { error, data}] =
      useMutation(MYDATEAPPOINTMENT);
  
  
    interface ButtonGroupProps {
      values: string[];
      isPressed: string | null;
      handlePress: (value: string) => void;
    }
  

  
    const bookAnAppointment = async () => {
      setLoading(false)
      console.log(new Date(date).getTime())
      const res = await myAppointment({
        variables: {
          date: new Date(date).getTime() ,
          take : 20,
          skip : 0
        },
        context: {headers},
      });
      console.log(res)
      setBookings(res?.data?.myAppointmentByDate)

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
        <ScrollView contentContainerStyle={{backgroundColor: "white"}}>
          <Appbar.Header className="bg-transparent">
            <Appbar.BackAction onPress={() => navigation.navigate.goBack()} />
            <Appbar.Content title="My Bookings" color="black" />
           
          </Appbar.Header>
  
          <View className="px-5">
            {/* Calender */}
  
            <View className="pb-2 ">
              <Text className="text-black font-extrabold mb-5 text-base">
                Select Date
              </Text>
              <MyCalender date={date} setDate={setDate} />
            </View>
            <View className='bg-white min-h-screen'>

          
            {bookings.length > 0 ? (
          bookings.map((booking: any, index: any) => (
            <TouchableOpacity key={index} className='bg-white' onPress={()=> navigation.navigate(navigationString.CONTRACTORDETAILS , { id : booking.contractor.id})}>
            <Card className="bg-white"  style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image
                  source={{uri: `${env.storage}${booking?.contractor?.image}`}}
                  style={styles.cardImage}
                />

                <View style={styles.cardDetails}>
                  <View>
                    <Title className="text-black font-[Poppins-SemiBold]">
                      {booking?.contractor?.service
                        ? booking?.contractor?.service
                        : '-'}
                    </Title>
                    <Paragraph className="mb-2 text-black font-[Poppins-Regular]">
                      {booking?.contractor?.fullname
                        ? booking?.contractor?.fullname
                        : '-'}
                    </Paragraph>
                    <Text style={styles.upcomingStatus}>{booking?.status ? booking?.status : "-" }</Text>
                  </View>
                  <View style={styles.messageIcon}>
                    <View>
                      <View className="bg-orange-200 px-2 py-1 rounded-lg">
                        <Text className="text-orange-600 text-xs font-[Poppins-Medium] tracking-wide">
                          {formatedDateFunction(booking?.date)}
                        </Text>
                      </View>
                      <View className="bg-purple-200 px-2 py-1 rounded-lg mt-1">
                        <Text className="text-purple-600 text-xs font-[Poppins-Medium] tracking-wide ">
                          {booking?.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card.Content>


             
            </Card>
            </TouchableOpacity>
          ))
        ) : (
          <NotFoundBooking desc={'No scheduled orders currently at this date.'} />
        )}
  </View>
            {/* <NotFoundBooking des="No scheduled orders currently at this date "/> */}
          </View>
        </ScrollView>
        {loading && <ActivityIndicatorComponent/>}
      </>
    );
}

export default MyCalenderBookings

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
    },container: {
      flex: 1,
      backgroundColor: 'white',
    },
    appbarHeader: {
      backgroundColor: 'transparent',
    },
    logo: {
      width: 20,
      height: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    scrollView: {
      padding: 10,
    },
    card: {
      // marginBottom: 20,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardImage: {
      width: 100,
      height: 100,
      marginRight: 10,
      borderRadius: 20,
    },
    cardDetails: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button2: {
      height: 30,
      width: 100,
    },
    messageIcon: {
      position: 'relative',
      bottom: -25,
      right: 12,
    },
    statusContainer: {
      backgroundColor: '#f1f1f1',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    upcomingStatus: {
      color: '#fff',
      // fontWeight: 'bold',
      backgroundColor: '#822BFF',
      width: 100,
      textAlign: 'center',
      borderRadius: 10,
      paddingVertical: 5,
      fontFamily: 'Poppins-Regular',
    },
    completedStatus: {
      color: '#fff',
      fontWeight: 'bold',
      // backgroundColor: "green",
      width: 100,
      textAlign: 'center',
      borderRadius: 10,
      paddingVertical: 5,
    },
    cancelledStatus: {
      color: '#fff',
      fontWeight: 'bold',
      // backgroundColor: "red",
      width: 100,
      textAlign: 'center',
      borderRadius: 10,
      paddingVertical: 5,
    },
    separator: {
      marginTop: 20,
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
    },
  });