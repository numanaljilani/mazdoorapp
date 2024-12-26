import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import images from '../constants/images';
import { Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import UpcomingScreen from '../screens/booking/UpcomingScreen';
import CompletedScreen from '../screens/booking/CompletedScreen';
import CancelledScreen from '../screens/booking/CancelledScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { bg_color } from '../constants/color';


const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();
const BookinTabs = ({ navigation } : any) => {
  const {language , dark} = useSelector((state: any) => state?.user);
  return (
    <View style={styles.container} className={`${bg_color(dark)}`}>
      <Appbar.Header style={styles.appbarHeader} className={`${bg_color(dark)}`}>
        <Appbar.Action
          icon={() => <Image source={images.logo} style={styles.logo} />}
          onPress={() => {}}
        />
        <Appbar.Content title={<Text style={[styles.title , {color : dark ? "white" : "black"}]}>{language ? "मेरी बुकिंग":"My Bookings"}</Text>} />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {/* <Appbar.Action
          icon="dots-horizontal-circle-outline"
          onPress={() => {}}
        /> */}
      </Appbar.Header>

      {/* <NavigationContainer independent={false}> */}
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarActiveTintColor: '#822BFF', // Change to your desired focused color
            tabBarInactiveTintColor: 'gray',
            tabBarContentContainerStyle : {
              backgroundColor : dark ? "#1F1F1F" : "white",
       
            },
            tabBarIndicatorStyle: {
              backgroundColor: dark ? "black":'#822BFF',
              borderWidth: 2,
              borderColor: '#822BFF',
              borderCurve: 'circular',
            },
           
            
            
            tabBarLabelStyle: {
              fontFamily: 'Poppins-SemiBold',
              // backgroundColor : dark ? "#1F1F1F" : "white"
            },
          })}>
          <Tab.Screen name={language ?"आगामी": "Upcoming" } component={UpcomingScreen} />
          <Tab.Screen name={language ?"पुरा होना।": "Completed" } component={CompletedScreen} />
          <Tab.Screen name={language ? "रद्द":"Cancelled"} component={CancelledScreen} />
        </Tab.Navigator>
      {/* </NavigationContainer> */}
    </View>
  )
}

export default BookinTabs

const styles = StyleSheet.create({
    container: {
      flex: 1
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