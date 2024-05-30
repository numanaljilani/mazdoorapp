import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, useWindowDimensions, Animated, Image } from 'react-native';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Avatar, Button, Icon, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { CONTRACTORDETAILS } from '../../graphql/mutation/contractor';
import env from '../../env';

const WorkDetails = ({ navigation , route }: any) => {
    const { width, height }: any = useWindowDimensions();
    const [contractorDetails, setContractorDetails] = useState<any>()
    let scrollX = useRef(new Animated.Value(0)).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const [details , { data , loading , error }] = useMutation(CONTRACTORDETAILS);
    const slideRef: any = useRef(null);

    const {userData, token, language} = useSelector((state: any) => state?.user);

    const headers = {
      authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
    };
    const { id } = route.params;

    console.log(route.params)

    const onboardingCard = [
        {
            id: 1,
            image:contractorDetails?.image ? {uri :  `${env.storage}${contractorDetails?.image}` } :images.OnBoardinImage2 ,
        },
        {
            id: 2,
            image: images.OnBoardinImage2,
        },
        {
            id: 3,
            image: images.SplashScreen,
        },
    ];

    const getDetails = async () => {
        const res = await details({variables : { id } ,       context: {headers},});
        console.log(res?.data?.contractorDetails.contractor , "response")
        if(res?.data?.contractorDetails.contractor){
            setContractorDetails(res?.data?.contractorDetails.contractor)
        }
    }

    useEffect(()=>{
        getDetails();
    },[])

    const aboutImages = [
        {
            image1: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image2: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image3: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            image1: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image2: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image3: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ]

    const onBoardingCards = ({ item }: any) => {
        return (
            <View style={{ width, height: height * 0.6, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
            </View>
        );
    };


    interface ReadMoreTextProps {
        children: string;
        maxChars: number;
    }

    const ReadMoreText: React.FC<ReadMoreTextProps> = ({ children , maxChars }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const truncatedText = children && children?.length > maxChars ? children?.slice(0, maxChars) + '...' : children;

        return (
            <View>
                <Text style={{ color: '#3b3941', fontSize: 14 }}>
                    {isExpanded ? children : truncatedText}
                </Text>
                {children.length > maxChars && (
                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                        <Text style={{ color: '#007BFF', fontSize: 14 }}>
                            {isExpanded ? 'Read less' : 'Read more'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }



    interface ButtonGroupProps {
        values: string[];
        isPressed: string | null;
        handlePress: (value: string) => void;
    }

    const [isPressed, setIsPressed] = useState<string | null>(null);

    const handlePress = (buttonName: string) => {
        setIsPressed(prevState => (buttonName === prevState ? null : buttonName));
    };


    const ButtonGroup: React.FC<ButtonGroupProps> = ({ values, isPressed, handlePress }) => {
        const handleClick = (value: string) => {
            if (isPressed !== value) {
                handlePress(value);
            }
        }

        return (
            <ScrollView
                className='py-2'
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.buttonContainer}
            >
                {values.map((value) => (
                    <Button
                        key={value}
                        mode='outlined'
                        style={[
                            styles.button,
                            isPressed === value && styles.activeButton,
                        ]}
                        onPress={() => handleClick(value)}
                    >
                        <Text className='text-xs' style={[
                            styles.buttonText,
                            isPressed === value && styles.activeButtonText
                        ]}>
                            {value}
                        </Text>
                    </Button>
                ))}
            </ScrollView>
        );
    };


    // Comment


    const commentsData = [
        {
            id: 1,
            name: "Lauralee Quintero",
            imageSource: images.Male,
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤",
            star: 3,
            likes: 724,
            date: "3 weeks ago"
        },
        {
            id: 2,
            name: "Samadhan Quintero",
            imageSource: images.Google,
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤",
            star: 4,
            likes: 724,
            date: "3 weeks ago"
        },
        {
            id: 3,
            name: "Vishal Quintero",
            imageSource: images.Male,
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤",
            star: 5,
            likes: 724,
            date: "3 weeks ago"
        }
    ];



    const [likedComments, setLikedComments] = useState<number[]>([]);

    const handleLike = (commentId: number) => {
        if (likedComments.includes(commentId)) {
            setLikedComments(prevLikedComments => prevLikedComments.filter(id => id !== commentId));
        } else {
            setLikedComments(prevLikedComments => [...prevLikedComments, commentId]);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconButton icon={icons.back} iconColor='black'/>
                </TouchableOpacity>
            </View>
            <View className='h-72 '>
                <FlatList
                    data={onboardingCard}
                    renderItem={onBoardingCards}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id.toString()}
                    viewabilityConfig={viewConfig}
                    ref={slideRef}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                />
            </View>
            <View className='flex flex-row justify-center relative bottom-10'>
                {onboardingCard.map((_, i: any) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i.toString()}
                            style={{
                                height: 10,
                                width: dotWidth,
                                marginHorizontal: 5,
                                borderRadius: 5,
                                backgroundColor: '#822BFF',
                                opacity,
                            }}
                        />
                    );
                })}
            </View>
            <ScrollView className='px-5 py-5'>
                <View className='flex-row justify-between items-center '>
                    <Text className='text-black text-3xl font-[Poppins-Medium]'>{contractorDetails ? contractorDetails?.service : "-" }</Text>
                    <TouchableOpacity>
                        <IconButton size={30} iconColor='#822BFF' icon={icons.bookmark} />
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center'>
                    <Text className='text-[#8d51e1]  text-base mr-3 font-[Poppins-SemiBold]'>{contractorDetails ? contractorDetails?.fullname : "-" }</Text>
                    <View className='flex-row items-center gap-2'>
                        <Image className='h-6 w-6' source={icons.star} />
                        <Text className='text-[#3b3941] font-[Poppins-Regular]'>
                            4.8 (4,479 reviews)
                        </Text>
                    </View>
                </View>
                <View className='py-2 flex-row items-center'>
                    <Text className='text-[#8d51e1] text-center  rounded-lg p-1 text-xs bg-[#dcc5fd] font-[Poppins-Regular]'>{contractorDetails ? contractorDetails?.service : "" }</Text>
                    <View className='flex-row items-center'>
                        <IconButton iconColor='#822BFF' size={20} icon={icons.location} />
                        <Text className='text-[#3b3941] text-xs font-[Poppins-Regular]'>{contractorDetails ? contractorDetails?.address : "-" }</Text>
                    </View>
                </View>

                <View className='flex-row items-center gap-2'>
                    <Text className='text-[#8d51e1] text-4xl font-[Poppins-SemiBold]'>${contractorDetails ? contractorDetails?.price : "" }</Text>
                    <Text className='text-sm text-[#3b3941] font-[Poppins-Regular]'>({contractorDetails ? contractorDetails?.unit : "" })</Text>
                </View>

                <View className='py-2' style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}></View>

                {/* About */}

                <View className='py-2'>
                    <Text className='text-[#3b3941] text-lg mb-2 font-[Poppins-SemiBold]'>About me</Text>
                    <View>
                        <ReadMoreText maxChars={80} >
                           {contractorDetails ? contractorDetails?.about : "" }
                        </ReadMoreText>
                    </View>
                </View>


                {/* Photos And Videos */}


                <View className='py-2'>
                    <View className=' flex-row justify-between items-center'>
                        <Text className='text-[#3b3941]  text-lg mb-2 font-[Poppins-SemiBold]'>Photos & Videos</Text>
                        <TouchableOpacity>
                            <Text className='text-[#8d51e1] font-[Poppins-SemiBold]'>See all</Text>
                        </TouchableOpacity>
                    </View>


                    {
                        aboutImages.map((item, index) => <View key={index} className='flex-row gap-3 justify-center items-center'>
                            <View>
                                {/* Left Image */}
                                <Image
                                    className='rounded-xl object-contain'
                                    style={{ height: 260, width: 150 }}
                                    source={{ uri: item.image1 }}
                                />
                            </View>
                            <View className='flex-col gap-2'>
                                {/* Top Right Image */}
                                <Image
                                    className='rounded-xl object-contain'
                                    style={{ height: 130, width: 150 }} // Adjust dimensions as needed
                                    source={{ uri: item.image2 }}
                                />
                                {/* Bottom Right Image */}
                                <Image
                                    className='rounded-xl object-contain'
                                    style={{ height: 130, width: 150 }} // Adjust dimensions as needed
                                    source={{ uri: item.image3 }}
                                />
                            </View>
                        </View>)
                    }

                </View>

                {/* Reviews */}

                <View className='py-6'>
                    <View className=' flex-row justify-between items-center'>
                        <View className='flex-row items-center gap-1'>
                            <Image className='h-8 w-8 mb-2' source={icons.star} />
                            <Text className='text-[#3b3941] font-[Poppins-SemiBold] text-lg mb-2'>
                                4.8 (4,479 reviews)
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text className='text-[#8d51e1] font-[Poppins-SemiBold]'>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ButtonGroup
                        values={['All', '5', '4', '3', '2', '1']}
                        isPressed={isPressed}
                        handlePress={handlePress}
                    />


                    <View className='px-3 mt-5'>
                        {
                            commentsData.map(item => <>
                                <View className='flex-row justify-between '>
                                    <View className='flex-row  items-center gap-3'>
                                        <Image className='h-10 w-10 rounded-full' source={item.imageSource} />
                                        <Text className='text-black font-[Poppins-Regular]'>{item.name}</Text>
                                    </View>
                                    <View className='flex-row  items-center'>
                                        <Button
                                            icon="star"
                                            mode='outlined'
                                            textColor='#8d51e1'
                                            className='w-10 h-10  text-xs font-[Poppins-Regular]'
                                            style={{ borderColor: "#8d51e1" }}
                                            onPress={() => console.log("pressed")}
                                        >
                                            {item.star}
                                        </Button>
                                        <IconButton iconColor='black' icon="dots-horizontal-circle-outline" ></IconButton>
                                    </View>
                                </View>
                                <Text className='text-black'>
                                    {item.text}
                                </Text>
                                <View className='flex-row items-center gap-5'>
                                    <View className='flex-row items-center'>
                                        <IconButton
                                            icon="heart"
                                            iconColor={likedComments.includes(item.id) ? 'red' : 'black'}
                                            onPress={() => handleLike(item.id)}
                                        />

                                        <Text className='text-black'>{item.likes}</Text>
                                    </View>
                                    <Text className='text-black'>
                                        {item.date}
                                    </Text>
                                </View>
                            </>)
                        }
                    </View>

                    <View className='py-2' style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}></View>

                    <View className='py-5 justify-center '  >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }}>
                            <Button
                                mode='outlined'
                                textColor='#822BFF'
                                style={{ flex: 1, marginRight: 5, borderColor: "#822BFF" , paddingVertical : 5 , alignContent :'center' }}
                                onPress={() => console.log("pressed")}
                            >
                                Message
                            </Button>
                            <Button
                                mode='outlined'
                                textColor='white'
                                style={{ flex: 1, marginLeft: 5, borderColor: "#822BFF", backgroundColor: "#822BFF" , alignContent :'center' , justifyContent : 'center'}}
                                className='font-[Poppins-Regular]'
                                onPress={() => console.log("pressed")}
                                
                            >
                                Book Now
                            </Button>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default WorkDetails;

const styles = StyleSheet.create({

    buttonContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',

    },
    button: {
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
        borderColor: '#822BFF',
        borderWidth: 2
    },
    buttonText: {
        color: '#822BFF',
        fontSize: 16,
    },
    activeButton: {
        backgroundColor: '#822BFF',
    },
    activeButtonText: {
        color: 'white',
    },


});

