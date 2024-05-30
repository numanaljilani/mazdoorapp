import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/profile/Profile';
import Liked from '../screens/liked/Liked';
import icons from '../constants/icons';
import MyBooking from '../screens/booking/MyBooking';
import { IconButton } from 'react-native-paper';
import Calender from '../components/Calender/Calender';
import Booking from '../screens/booking/BookingDetails';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
 
    screenOptions={
     (route)=>( {
      headerShown :false,
      tabBarLabel : () => null,     
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
          //   borderTopWidth :5
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
        component={MyBooking}
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
        component={Booking}
      />

      {/* <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (    <View className={`  h-full w-full items-center justify-center`}>
            <Image source={icons.home} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'} />
          </View>)
          },
          // tabBarLabel: 'Liked',
        }}
        initialParams={{ tabIndex: 2 }}
        name="All"
        component={Liked}
      /> */}

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
