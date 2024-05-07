import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Profile from '../screens/profile/Profile';
import Search from '../screens/search/Search';
import Liked from '../screens/liked/Liked';
import icons from '../constants/icons';

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
          
          tabBarIcon: ({focused}) => {
            return (
              <View className={`  h-full w-full items-center justify-center`}>
                <Image source={icons.home} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'}/>
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
          tabBarIcon: ({focused}) => {
            return (
              <View className={`border-t-2 ${ focused ?"border-[#312651]" : "border-transparent"} mx-2 h-full w-full items-center justify-center`}>
                <AntDesign  size={28} color={ focused ? "#312651" :  "#555555"} name="search1" />
              </View>
            )
          },
          // tabBarLabel: 'Search',
        }}
        initialParams={{ tabIndex: 1 }}
        name="New"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (<View className={`border-t-2 ${ focused ?"border-[#312651]" : "border-transparent"} mx-2 h-full w-full items-center justify-center`}>
              <AntDesign  size={28} color={ focused ? "#312651" :  "#555555"}   name="hearto" />
            </View>)
          },
          // tabBarLabel: 'Liked',
        }}
        initialParams={{ tabIndex: 2 }}
        name="All"
        component={Liked}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View className={` mx-2 h-full w-full items-center justify-center`}>
                 <Image source={icons.profile} className={`w-8 h-8`} tintColor={focused ? '#822BFF' : '#848482'}/>
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
