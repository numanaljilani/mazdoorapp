import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/profile/Profile';
import icons from '../constants/icons';
import MyBooking from '../screens/booking/MyBooking';
import { IconButton } from 'react-native-paper';
import Calender from '../components/Calender/Calender';
import Booking from '../screens/booking/BookingDetails';
import ContractorOrders from '../screens/contractorOrders/ContractorOrders';
import BookinTabs from './BookinTabs';
import { useSelector } from 'react-redux';
import MyCalenderBookings from '../screens/CalenderBookings/MyCalenderBookings';

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}: any) => {
  const {userData , dark} = useSelector((state: any) => state?.user);
  return (
    <Tab.Navigator
 
    screenOptions={
     (route)=>( {
      headerShown :false,
      tabBarLabel : () => null,  
      tabBarStyle:{
        // backgroundColor : "#2E2E2E"
        borderTopColor : "",
        backgroundColor : dark ? "#1F1F1F" : "white"
      }   
    })
    }
    >
      <Tab.Screen
        options={{

          tabBarIcon: ({ focused }) => {
            return (
              <View className={`  h-full w-full items-center justify-center`}>
                <Image source={icons.home} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'} />
              </View>
            );
          },
          // tabBarLabel: 'Home',
          // tabBarStyle : {
          //   borderTopWidth :0
          // }
        }}
        initialParams={{ tabIndex: 0 }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={`  h-full w-full items-center justify-center`}>
              <Image source={icons.text} className={`w-7 h-7`} tintColor={focused ? '#822BFF' : '#848482'} />
            </View>
            )
          },
          // tabBarLabel: 'Search',
        }}
        initialParams={{ tabIndex: 1 }}
        name="Booking"
        component={BookinTabs}
      />


      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={`  h-full w-full items-center justify-center`}>
              <Image source={icons.calendar} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'} />
            </View>
            )
          },
          // tabBarLabel: 'Search',
        }}
        initialParams={{ tabIndex: 1 }}
        name="Calender"
        component={MyCalenderBookings}
      />

      {userData?.isContractor && <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (    <View className={`  h-full w-full items-center justify-center`}>
            <Image source={icons.suitcase} className={`w-7 h-7`} tintColor={focused ? '#822BFF' : '#848482'} />
          </View>)
          },
          // tabBarLabel: 'Liked',
        }}
        initialParams={{ tabIndex: 2 }}
        name="All"
        component={ContractorOrders}
      />}

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={` mx-2 h-full w-full items-center justify-center`}>
                <Image source={icons.profile} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'} />
              </View>
            );
          },
        }}
        initialParams={{ tabIndex: 3 }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
