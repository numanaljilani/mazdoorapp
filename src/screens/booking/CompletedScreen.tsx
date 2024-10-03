import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { MYAPPOINTMENT } from '../../graphql/mutation/appointment';
import { ScrollView } from 'react-native';
import { Card, IconButton, Paragraph, Title } from 'react-native-paper';
import { Image } from 'react-native';
import NotFoundBooking from '../../components/common/NotFoundBookings';
import env from '../../env';
import { TouchableOpacity } from 'react-native';
import navigationString from '../../constants/navigation';
import { formatedDateFunction } from '../../utils/dateFinction';
import ListLoading from '../../components/loading/ListLoading';

const CompletedScreen = ({navigation } : any) => {
    const [bookings, setBookings] = useState<any>([]);
    const [skLoading, setSkLoading] = useState<boolean>(false);

    const {userData, token, language} = useSelector((state: any) => state?.user);
  
    const headers = {
      authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
    };
    const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);
  
    const completedAppointments = async () => {
      console.log('inside upcomingAppointments');
      setSkLoading(true)
      const res = await my_appointment({
        variables: {take: 20, skip: 0, status: 'completed'},
        context: {headers},
      });
      console.log(res?.data?.myAppointment, '>>>>>>>> completed appointments');
      if (res?.data?.myAppointment) {
        setBookings(res?.data?.myAppointment);
      }
      setSkLoading(false)
    };
console.log(`${env.storage}${bookings[0]?.contractor?.image}`)
    useEffect(() => {
      completedAppointments();
    }, []);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // Simulate a network request
      completedAppointments();
      setRefreshing(false);
    }, []);

  

    return (
      <ScrollView          refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } style={styles.scrollView}>
        { skLoading ? <ListLoading/>:bookings.length > 0 ? (
          bookings.map((booking: any, index: any) => (
            <Card className="bg-white " key={index} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image source={{uri : `${env.storage}${booking?.contractor?.image}`}} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <View>
                    <Title className="text-black font-extrabold">
                      {booking?.contractor?.service
                        ? booking?.contractor?.service
                        : '-'}
                    </Title>
                    <Paragraph className="mb-2 text-black">
                      {booking?.contractor?.fullname
                        ? booking?.contractor?.fullname
                        : '-'}
                    </Paragraph>
                    <Text style={styles.completedStatus} className="bg-green-500">
                      Completed
                    </Text>
                  </View>
                  {/* <View style={styles.messageIcon}>
                    <View className="bg-purple-300 rounded-full">
                   <IconButton
                        iconColor="#822BFF"
                        size={30}
                        icon="chat-processing"
                      />
                    </View>
                  </View> */}
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
              </Card.Content>
  
              <View style={styles.separator}></View>
  
              <View className=" flex-row justify-end px-4">
                {/* <IconButton size={35} icon="chevron-down" /> */}
                <TouchableOpacity
                onPress={()=>navigation.navigate(navigationString.CONTRACTORDETAILS,{ id : booking?.contractor.id, canPost : true})}
                  className="px-6 py-3 my-2 rounded-lg bg-purple-200">
                  <Text className="text-xs text-purple-600 font-[Poppins-SemiBold]">
                    View Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        ) : (
          <NotFoundBooking des={'No upcompleted orders found.'} />
        )}
      </ScrollView>
    );
}

export default CompletedScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,    backgroundColor: 'white',
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
      marginBottom: 20,
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
    button: {
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