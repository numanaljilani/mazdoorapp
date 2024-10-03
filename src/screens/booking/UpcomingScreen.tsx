import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NotFoundBooking from '../../components/common/NotFoundBookings';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  CANCELAPPOINTMENT,
  MYAPPOINTMENT,
} from '../../graphql/mutation/appointment';
import {useMutation} from '@apollo/client';
import {Card, Paragraph, Title} from 'react-native-paper';
import {Image} from 'react-native';
import env from '../../env';
import CancelOrderModal from '../../components/OrdersModals/CancelOrderModal';
import {locale} from 'dayjs';
import {retry} from '@reduxjs/toolkit/query';
import OrderSuccessfullModal from '../../components/worker/OrderSuccessfullModal';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import navigationString from '../../constants/navigation';
import ListLoading from '../../components/loading/ListLoading';

const UpcomingScreen = ({navigation}: any) => {
  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<any>([]);
  const [order, setOrder] = useState<any>({});
  const [skLoading, setSkLoading] = useState<boolean>(false);

  const [cancellSuccessfull, setCancellSuccessfull] = useState<boolean>(false);
  const focused = useIsFocused();
  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);
  const [cancel_appointment] = useMutation(CANCELAPPOINTMENT);
  const upcomingAppointments = async () => {
    console.log('inside upcomingAppointments hello');
    setSkLoading(true)
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'pending'},
      context: {headers},
    });
    console.log(res.data.myAppointment[0], '>>>>>');
    if (res?.data?.myAppointment) {
      setBookings(res?.data?.myAppointment);
    }
    setSkLoading(false)
  };

  useEffect(() => {
    upcomingAppointments();
  }, [focused]);

  const cancelBooking = async () => {
    console.log(order.id, 'cancelBooking');
    // setLoading(true)
    setIsLoading(true);
    setModal(false);
    const res = await cancel_appointment({
      variables: {id: order?.id},
      context: {headers},
    });
    console.log(res, 'response');
    setCancellSuccessfull(true);
    upcomingAppointments();
    setIsLoading(false);
  };

  const formatedDateFunction = (milliseconds: any) => {
    console.log(milliseconds);
    const date1 = new Date(Number(milliseconds)).toLocaleDateString('en-US');
    console.log(date1);
    return date1;
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    upcomingAppointments();
    setRefreshing(false);
  }, []);

  return (
    <>
      <View
>
        { skLoading ? <ListLoading/>: bookings.length > 0 ? (
               <ScrollView
               refreshControl={
                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
               }
               contentContainerStyle={{paddingBottom : 20}}
               style={styles.scrollView}>
          {bookings.map((booking: any, index: any) => (
            <TouchableOpacity
              key={index}
              className="mt-2"
              onPress={() =>
                navigation.navigate(navigationString.CONTRACTORDETAILS, {
                  id: booking.contractor.id,
                })
              }>
              <TouchableOpacity className="bg-white rounded-xl shadow-xl shadow-white" style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <Image
                    source={{
                      uri: `${env.storage}${booking?.contractor?.image}`,
                    }}
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
                      <Text style={styles.upcomingStatus}>Upcoming</Text>
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

                <View style={styles.separator}></View>

                <View className=" flex-row justify-end px-5">
                  {/* <IconButton size={35} icon="chevron-down" />
                   */}
                  <TouchableOpacity
                    onPress={() => {
                      setModal(true);
                      setOrder(booking);
                    }}
                    className="px-6 py-3 my-2 rounded-lg bg-red-200">
                    <Text className="text-xs text-red-600 font-[Poppins-SemiBold]">
                      Cancel Booking
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          </ScrollView>) : (
          <NotFoundBooking desc={'No scheduled orders currently.'} />
        )}
      </View>
      <CancelOrderModal
        setModal={setModal}
        cancelBooking={cancelBooking}
        modal={modal}
      />
      {isLoading && <ActivityIndicatorComponent />}

      <OrderSuccessfullModal
        title={'Cancel Booking Successfull'}
        desc={'you have succesfully cancelled your service booking'}
        setModal={() => setCancellSuccessfull(false)}
        modal={cancellSuccessfull}
      />
    </>
  );
};

export default UpcomingScreen;
const styles = StyleSheet.create({
  container: {
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
    paddingBottom:50
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
