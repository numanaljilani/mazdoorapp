import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
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
import {MYAPPOINTMENT} from '../../graphql/mutation/appointment';
import {useMutation} from '@apollo/client';
import NotFound from '../../components/notFound/NotFound';
import NotFoundBooking from '../../components/common/NotFoundBookings';

const Tab = createMaterialTopTabNavigator();

const MyBooking = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Action
          icon={() => <Image source={images.logo} style={styles.logo} />}
          onPress={() => {}}
        />
        <Appbar.Content title={<Text style={styles.title}>My Bookings</Text>} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action
          icon="dots-horizontal-circle-outline"
          onPress={() => {}}
        />
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
          <Tab.Screen name="Upcoming" component={Upcoming} />
          <Tab.Screen name="Completed" component={Completed} />
          <Tab.Screen name="Cancelled" component={Cancelled} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MyBooking;

const Upcoming = () => {
  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);

  const upcomingAppointments = async () => {
    console.log('inside upcomingAppointments');
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'upcoming'},
      context: {headers},
    });
    console.log(res, '>>>>>>>>');
    if (res?.data?.myAppointment) {
        setBookings(res?.data?.myAppointment)
    }
  };

  useEffect(() => {
    upcomingAppointments();
  }, []);
  const [bookings, setBookings] = useState<any>([  ]);
  return (
    <ScrollView style={styles.scrollView}>
      { bookings.length > 0 ? bookings.map((booking: any, index: any) => (
        <Card className="bg-white" key={index} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image source={booking.image} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <View>
                <Title className="text-black font-extrabold">
                  {booking?.contractor?.service ? booking?.contractor?.service : "-"}
                </Title>
                <Paragraph className="mb-2 text-black">
                  {booking?.contractor?.fullname ? booking?.contractor?.fullname : "-"}
                </Paragraph>
                <Text style={styles.upcomingStatus}>Upcoming</Text>
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
      )) : <NotFoundBooking desc={"No scheduled orders currently."}/>}
    </ScrollView>
  );
};

const Completed = () => {
  const [bookings, setBookings] = useState<any>([
  ]);

  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);

  const completedAppointments = async () => {
    console.log('inside upcomingAppointments');
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'completed'},
      context: {headers},
    });
    console.log(res, '>>>>>>>>');
    if (res?.data?.myAppointment) {
        setBookings(res?.data?.myAppointment)
    }
  };

  useEffect(() => {
    completedAppointments();
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      {bookings.length > 0 ?  bookings.map((booking: any, index: any) => (
        <Card className="bg-white" key={index} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image source={booking.image} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <View>
                <Title className="text-black font-extrabold">
                  {booking?.contractor?.service ? booking?.contractor?.service : "-"}
                </Title>
                <Paragraph className="mb-2 text-black">
                  {booking?.contractor?.fullname ? booking?.contractor?.fullname : "-"}
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
      )) : <NotFoundBooking des={"No upcompleted orders found."}/>}
    </ScrollView>
  );
};

const Cancelled = () => {
  const {userData, token, language} = useSelector((state: any) => state?.user);

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [my_appointment, {loading, error, data}] = useMutation(MYAPPOINTMENT);
  const [bookings, setBookings] = useState<any>([

  ]);

  const cancelAppointments = async () => {
    console.log('inside upcomingAppointments');
    const res = await my_appointment({
      variables: {take: 20, skip: 0, status: 'completed'},
      context: {headers},
    });
    console.log(res, '>>>>>>>>');
    if (res?.data?.myAppointment) {
        setBookings(res?.data?.myAppointment)
    }
  };

  useEffect(() => {
    cancelAppointments();
  }, []);
  return (
    <ScrollView style={styles.scrollView}>
      {bookings.length > 0 ? bookings.map((booking: any, index: any) => (
        <Card className="bg-white" key={index} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image source={booking.image} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <View>
                <Title className="text-black font-extrabold">
                  {booking?.contractor?.service ? booking?.contractor?.service : "-"}
                </Title>
                <Paragraph className="mb-2 text-black">
                  {booking?.contractor?.fullname ? booking?.contractor?.fullname : "-"}
                </Paragraph>
                <Text style={styles.cancelledStatus} className="bg-red-500">
                  Cancelled
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
      ) ) : <NotFoundBooking des={"No canceled orders at the moment."}/>}
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
