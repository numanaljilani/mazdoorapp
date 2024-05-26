import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Badge, IconButton, Divider, Icon } from 'react-native-paper';
import images from '../../constants/images';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'


const Tab = createMaterialTopTabNavigator();


const MyBooking = () => {

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbarHeader}>
                <Appbar.Action
                    icon={() => (
                        <Image
                            source={images.logo}
                            style={styles.logo}
                        />
                    )}
                    onPress={() => { }}
                />
                <Appbar.Content
                    title={<Text style={styles.title}>My Bookings</Text>}
                />
                <Appbar.Action icon="magnify" onPress={() => { }} />
                <Appbar.Action icon="dots-horizontal-circle-outline" onPress={() => { }} />
            </Appbar.Header>

            <NavigationContainer independent={true}>
                <Tab.Navigator>
                    <Tab.Screen name="Upcoming" component={Upcoming} />
                    <Tab.Screen name="Completed" component={Completed} />
                    <Tab.Screen name="Cancelled" component={Cancelled} />
                </Tab.Navigator>
            </NavigationContainer>

        </View>
    );
}

export default MyBooking;


const Upcoming = () => {
    const bookings = [
        {
            title: 'House Cleaning',
            name: 'Jenny Wilson',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Garage Cleaning',
            name: 'Florencio Dorrance',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Painting the Walls',
            name: 'Benny Spanbauer',
            image: images.OnBoardinImage2,
        },
    ];
    return (
        <ScrollView style={styles.scrollView}>
            {bookings.map((booking, index) => (
                <Card className='bg-white' key={index} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Image source={booking.image} style={styles.cardImage} />
                        <View style={styles.cardDetails}>
                            <View>
                                <Title className='text-black font-extrabold'>{booking.title}</Title>
                                <Paragraph className='mb-2 text-black'>{booking.name}</Paragraph>
                                <Text style={styles.upcomingStatus}>Upcoming</Text>
                            </View>
                            <View style={styles.messageIcon}>
                                <View className='bg-purple-300 rounded-full'>
                                    <IconButton iconColor='blue' size={30} icon="chat-processing" />
                                </View>
                            </View>
                        </View>
                    </Card.Content>

                    <View style={styles.separator}></View>

                    <View className=' flex-row justify-center'>
                        <IconButton size={35} icon="chevron-down" />
                    </View>

                </Card>
            ))}
        </ScrollView>
    );
}

const Completed = () => {
    const bookings = [
        {
            title: 'House Cleaning',
            name: 'Jenny Wilson',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Garage Cleaning',
            name: 'Florencio Dorrance',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Painting the Walls',
            name: 'Benny Spanbauer',
            image: images.OnBoardinImage2,
        },
    ];
    return (
        <ScrollView style={styles.scrollView}>
            {bookings.map((booking, index) => (
                <Card className='bg-white' key={index} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Image source={booking.image} style={styles.cardImage} />
                        <View style={styles.cardDetails}>
                            <View>
                                <Title className='text-black font-extrabold'>{booking.title}</Title>
                                <Paragraph className='mb-2 text-black'>{booking.name}</Paragraph>
                                <Text style={styles.completedStatus}>Completed</Text>
                            </View>
                            <View style={styles.messageIcon}>
                                <View className='bg-purple-300 rounded-full'>
                                    <IconButton iconColor='blue' size={30} icon="chat-processing" />
                                </View>
                            </View>
                        </View>
                    </Card.Content>

                    <View style={styles.separator}></View>

                    <View className=' flex-row justify-center'>
                        <IconButton size={35} icon="chevron-down" />
                    </View>

                </Card>
            ))}
        </ScrollView>
    );
}

const Cancelled = () => {
    const bookings = [
        {
            title: 'House Cleaning',
            name: 'Jenny Wilson',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Garage Cleaning',
            name: 'Florencio Dorrance',
            image: images.OnBoardinImage2,
        },
        {
            title: 'Painting the Walls',
            name: 'Benny Spanbauer',
            image: images.OnBoardinImage2,
        },
    ];
    return (
        <ScrollView style={styles.scrollView}>
            {bookings.map((booking, index) => (
                <Card className='bg-white' key={index} style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Image source={booking.image} style={styles.cardImage} />
                        <View style={styles.cardDetails}>
                            <View>
                                <Title className='text-black font-extrabold'>{booking.title}</Title>
                                <Paragraph className='mb-2 text-black'>{booking.name}</Paragraph>
                                <Text style={styles.cancelledStatus}>Cancelled</Text>
                            </View>
                            <View style={styles.messageIcon}>
                                <View className='bg-purple-300 rounded-full'>
                                    <IconButton iconColor='blue' size={30} icon="chat-processing" />
                                </View>
                            </View>
                        </View>
                    </Card.Content>

                    <View style={styles.separator}></View>

                    <View className=' flex-row justify-center'>
                        <IconButton size={35} icon="chevron-down" />
                    </View>

                </Card>
            ))}
        </ScrollView>
    );
}



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
        padding: 20,
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
        right: 12
    },
    statusContainer: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    upcomingStatus: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: "blue",
        width: 100,
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: 5
    },
    completedStatus: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: "green",
        width: 100,
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: 5
    },
    cancelledStatus: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: "red",
        width: 100,
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: 5
    },
    separator: {
        marginTop: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
});
