import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Button,
  Badge,
  IconButton,
  Divider,
  Icon,
} from 'react-native-paper';
import images from '../../constants/images';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {
  CONTRACTORAPPOITMENTS,
  MYAPPOINTMENT,
  REJECTCONTRACTORAPPOITMENTS,
} from '../../graphql/mutation/appointment';
import {useMutation} from '@apollo/client';
import NotFound from '../../components/notFound/NotFound';
import NotFoundBooking from '../../components/common/NotFoundBookings';
import {formatedDateFunction} from '../../utils/dateFinction';
import env from '../../env';
import RejectOrderModal from '../../components/OrdersModals/RejectOrderModal';
import OrderSuccessfullModal from '../../components/worker/OrderSuccessfullModal';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import icons from '../../constants/icons';
import { Linking } from 'react-native';
import ListLoading from '../../components/loading/ListLoading';

const Tab = createMaterialTopTabNavigator();

const ContractorOrders = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Action
          icon={() => <Image source={images.logo} style={styles.logo} />}
          onPress={() => {}}
        />
        <Appbar.Content
          title={<Text style={styles.title}>My Contracts</Text>}
        />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {/* <Appbar.Action
          icon="dots-horizontal-circle-outline"
          onPress={() => {}}
        /> */}
      </Appbar.Header>

      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarActiveTintColor: '#822BFF', // Change to your desired focused color
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: {
              backgroundColor: '#822BFF',
              borderWidth: 2,
              borderColor: '#822BFF',
              borderCurve: 'circular',
            },
            tabBarLabelStyle: {
              fontFamily: 'Poppins-SemiBold',
            },
          })}>
          <Tab.Screen name="Pending" component={Upcoming} />
          <Tab.Screen name="Completed" component={Completed} />
          <Tab.Screen name="Cancelled" component={Cancelled} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default ContractorOrders;

const Upcoming = () => {
  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {error, data}] = useMutation(CONTRACTORAPPOITMENTS);
  const [reject_appointment] = useMutation(REJECTCONTRACTORAPPOITMENTS);
  const [skip , setSkip] = useState(0)

  const upcomingAppointments = async () => {
    console.log('inside upcomingAppointments');
    if(skip < 20) setSkLoading(true)
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'upcoming'},
      context: {headers},
    });
    console.log(res?.data?.contractorAppointment, '>>>>>><<<<<<<<<<<<<<<<<<<<<<<');
    if (res?.data?.contractorAppointment) {
      setBookings(res?.data?.contractorAppointment);
    }
    setSkLoading(false)
  };

  useEffect(() => {
    upcomingAppointments();
  }, []);
  const [bookings, setBookings] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [order, setOrder] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [skLoading, setSkLoading] = useState<boolean>(false);

  const RejectBooking = async () => {
    setModal(false);
    setLoading(true);
    console.log(order.id, '>>>>');
    const res = await reject_appointment({
      variables: {id: order?.id},
      context: {headers},
    });
    // console.log(res.data)

    if (res.data) {
      setModal(false);
      setSuccess(true);
      upcomingAppointments;
    }
    setLoading(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    upcomingAppointments();
    setRefreshing(false);
  }, []);
  const handleCall = (phone : any) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView          refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } style={styles.scrollView}>
      {skLoading? <ListLoading/> :
      
      bookings.length > 0 ? (
        bookings.map((booking: any, index: any) => (
          <Card className="bg-white mx-2 mt-3" key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Image source={{uri :booking?.user?.image?.includes('google') ?booking?.user?.image :`${env.storage}${booking?.user?.image}`}} style={styles.cardImage} />
              <View style={styles.cardDetails}>
                <View>
                  <Title className="text-black font-extrabold">
                    {/* {booking?.contractor?.service
                      ? booking?.contractor?.service
                      : '-'} */}
                        {booking?.user?.fullname
                      ? booking?.user?.fullname
                      : '-'}
                  </Title>
                  {/* <Paragraph className="mb-2 text-black">
                    {booking?.user?.fullname
                      ? booking?.user?.fullname
                      : '-'}
                  </Paragraph> */}
                  <Text style={styles.upcomingStatus}>{booking?.status}</Text>
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

            <View className=" flex-row justify-end gap-x-5 px-4">
              {/* <IconButton size={35} icon="chevron-down" /> */}
              <TouchableOpacity
                onPress={()=>handleCall(booking?.user?.phone)}
                // onPress={()=>navigation.navigate(navigationString.CONTRACTORDETAILS,{ id : booking?.contractor.id, canPost : true})}
                className="px-6 py-3 my-2 rounded-lg flex-row  items-center justify-center bg-green-200">
                  <Image source={icons.phone} className='w-5 h-5 mr-2' tintColor={'#16a34a'}/>
                <Text className="text-xs text-green-600 font-[Poppins-SemiBold]">
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                  setOrder(booking);
                }}
                // onPress={()=>navigation.navigate(navigationString.CONTRACTORDETAILS,{ id : booking?.contractor.id, canPost : true})}
                className="px-6 py-3 my-2 rounded-lg bg-red-200">
                <Text className="text-xs text-red-600 font-[Poppins-SemiBold]">
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))
      ) : (
        <NotFoundBooking desc={'No scheduled orders currently.'} />
      )}
      <RejectOrderModal
        setModal={setModal}
        modal={modal}
        cancelBooking={RejectBooking}
      />
      <OrderSuccessfullModal
        desc="You have rejected this order"
        modal={success}
        setModal={setSuccess}
        title="Successfully rejected"
      />
      {loading && <ActivityIndicatorComponent />}
    </ScrollView>
  );
};

const Completed = () => {
  const [bookings, setBookings] = useState<any>([]);

  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(
    CONTRACTORAPPOITMENTS,
  );
  const [skLoading, setSkLoading] = useState<boolean>(false);

  const completedAppointments = async () => {
    console.log('inside upcomingAppointments');
    setSkLoading(true)
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'completed'},
      context: {headers},
    });
    console.log(res, '>>>>>>>>');
    if (res?.data?.myAppointment) {
      setBookings(res?.data?.myAppointment);
    }
    setSkLoading(false)
  };

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
      {skLoading ? <ListLoading/>:bookings.length > 0 ? (
        bookings.map((booking: any, index: any) => (
          <Card className="bg-white" key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Image source={booking.image} style={styles.cardImage} />
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
                <View style={styles.messageIcon}>
                  <View className="bg-purple-300 rounded-full">
                    <IconButton
                      iconColor="#822BFF"
                      size={30}
                      icon="chat-processing"
                    />
                  </View>
                </View>
              </View>
            </Card.Content>

            <View style={styles.separator}></View>

            <View className=" flex-row justify-center">
              <IconButton size={35} icon="chevron-down" />
            </View>
          </Card>
        ))
      ) : (
        <NotFoundBooking des={'No upcompleted orders found.'} />
      )}
    </ScrollView>
  );
};

const Cancelled = () => {
  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);
  const [bookings, setBookings] = useState<any>([]);
  const [skLoading, setSkLoading] = useState<boolean>(false);

  const cancelAppointments = async () => {
    console.log('inside upcomingAppointments');
    setSkLoading(true)
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'reject'},
      context: {headers},
    });
    console.log(res, '>>>>>>>>');
    if (res?.data?.myAppointment) {
      setBookings(res?.data?.myAppointment);
      console.log(res?.data?.myAppointment);
    }
    setSkLoading(false)
  };

  useEffect(() => {
    cancelAppointments();
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    cancelAppointments();
    setRefreshing(false);
  }, []);


  return (
    <ScrollView          refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } style={styles.scrollView}>
      {skLoading ? <ListLoading/>: bookings.length > 0 ? (
        bookings.map((booking: any, index: any) => (
          <Card className="bg-white" key={index} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              {/* <Image source={booking.image} style={styles.cardImage} /> */}
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
                  <Text style={styles.cancelledStatus} className="bg-red-500">
                    Cancelled
                  </Text>
                </View>
                <View style={styles.messageIcon}>
                  <View>
                    <View className="bg-orange-200 px-2 py-1 rounded-lg">
                      <Text className="text-orange-600 text-xs font-[Poppins-Medium] tracking-wide">
                        Date : {formatedDateFunction(booking?.date)}
                      </Text>
                    </View>
                    <View className="bg-purple-200 px-2 py-1 rounded-lg mt-1">
                      <Text className="text-purple-600 text-xs font-[Poppins-Medium] tracking-wide ">
                        Time : {booking?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))
      ) : (
        <NotFoundBooking des={'No canceled orders at the moment.'} />
      )}
    </ScrollView>
  );
};

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
    // padding: 20,
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
