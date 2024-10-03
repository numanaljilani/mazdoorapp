import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Animated,
  Image,
} from 'react-native';
import images from '../../constants/images';
import icons from '../../constants/icons';
import {Avatar, Button, Icon, IconButton, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import {
  CONTRACTORDETAILS,
  CONTRACTORPOSTS,
} from '../../graphql/mutation/contractor';
import env from '../../env';
import navigationString from '../../constants/navigation';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CREATEPOSTS, GETPOSTS} from '../../graphql/mutation/post';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useUploadPostMutation} from '../../service/api/userApi';
import SeeMore from '../../components/seemore/SeeMore';
import {ADDTOBOOKMARK} from '../../graphql/mutation/bookmark';
import {showMessage} from 'react-native-flash-message';
import {Linking} from 'react-native';
import ProfileDetailsLoading from '../../components/loading/ProfileDetailsLoading';

const WorkDetails = ({navigation, route}: any) => {
  const {id, bookmarked, canPost} = route?.params;
  console.log(bookmarked, canPost);
  const {width, height}: any = useWindowDimensions();
  const [contractorDetails, setContractorDetails] = useState<any>();
  let scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmark1, setBookmark1] = useState<boolean>(bookmarked);
  const [skip, setSkip] = useState(0);
  const [rating, setRating] = useState<number>(1);
  const [text, setText] = useState<string>('');
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [skLoading, setSkLoading] = useState<boolean>(false);
  const [reviewsData, setReviewsData] = useState<[]>([]);
  const [posts, setPosts] = useState<any>([]);
  const slideRef: any = useRef(null);
  const [details, {data, error}] = useMutation(CONTRACTORDETAILS);
  const [contractorposts] = useMutation(CONTRACTORPOSTS);
  const [postReviwApi] = useMutation(CREATEPOSTS);
  const [getAllReviewApi] = useMutation(GETPOSTS);

  const {userData, token, language} = useSelector((state: any) => state?.user);
  const [uploadPost] = useUploadPostMutation();

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  console.log(route.params?.canPost);
  console.log(contractorDetails);
  const [bookmark] = useMutation(ADDTOBOOKMARK);

  const addToBookmarks = async () => {
    console.log('inside addToBookmarks');
    const res = await bookmark({
      variables: {contractorId: id, isBookmark: bookmark1},
      context: {headers},
    });

    if (res?.data) {
      showMessage({
        description: 'Successfully bookmarks',
        message: res?.data?.addToBookmark?.bookmark?.message,
        type: 'success',
        icon: 'success',
      });
      setBookmark1(!bookmark1);
    }
  };

  const onboardingCard = [
    {
      id: 1,
      image: contractorDetails?.image
        ? {uri: `${env.storage}${contractorDetails?.image}`}
        : images.OnBoardinImage2,
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

  // console.log(userData.id === id )
  const getDetails = async () => {
    setSkLoading(true)
    const res = await details({variables: {id}, context: {headers}});
    console.log(res?.data?.contractorDetails.contractor, 'response');
    if (res?.data?.contractorDetails.contractor) {
      setContractorDetails(res?.data?.contractorDetails.contractor);
      getThisReviews();
    }
    setSkLoading(false)
  };

  const onBoardingCards = ({item}: any) => {
    return (
      <View
        style={{
          width,
          height: height * 0.6,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
    );
  };

  interface ReadMoreTextProps {
    children: string;
    maxChars: number;
  }

  const ReadMoreText: React.FC<ReadMoreTextProps> = ({children, maxChars}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedText =
      children && children?.length > maxChars
        ? children?.slice(0, maxChars) + '...'
        : children;

    return (
      <View>
        <Text style={{color: '#3b3941', fontSize: 14}}>
          {isExpanded ? children : truncatedText}
        </Text>
        {children.length > maxChars && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={{color: '#007BFF', fontSize: 14}}>
              {isExpanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  interface ButtonGroupProps {
    values: string[];
    isPressed: string | null;
    handlePress: (value: string) => void;
  }

  const [isPressed, setIsPressed] = useState<string | null>(null);

  const handlePress = (buttonName: string) => {
    setIsPressed(prevState => (buttonName === prevState ? null : buttonName));
  };

  const ButtonGroup: React.FC<ButtonGroupProps> = ({
    values,
    isPressed,
    handlePress,
  }) => {
    const handleClick = (value: string) => {
      if (isPressed !== value) {
        handlePress(value);
      }
    };

    return (
      <ScrollView
        className="py-2"
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.buttonContainer}>
        {values.map((value, index) => (
          <Button
            key={index}
            mode="outlined"
            style={[styles.button, isPressed === value && styles.activeButton]}
            onPress={() => handleClick(value)}>
            <Text
              className="text-xs"
              style={[
                styles.buttonText,
                isPressed === value && styles.activeButtonText,
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
      name: 'Lauralee Quintero',
      imageSource: images.Male,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤',
      star: 3,
      likes: 724,
      date: '3 weeks ago',
    },
    {
      id: 2,
      name: 'Samadhan Quintero',
      imageSource: images.Google,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤',
      star: 4,
      likes: 724,
      date: '3 weeks ago',
    },
    {
      id: 3,
      name: 'Vishal Quintero',
      imageSource: images.Male,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia magnam ex reiciendis dolorum repellat voluptatibus ❤❤❤',
      star: 5,
      likes: 724,
      date: '3 weeks ago',
    },
  ];

  const [likedComments, setLikedComments] = useState<number[]>([]);

  const handleLike = (commentId: number) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(prevLikedComments =>
        prevLikedComments.filter(id => id !== commentId),
      );
    } else {
      setLikedComments(prevLikedComments => [...prevLikedComments, commentId]);
    }
  };

  const postReviw = async () => {
    console.log(rating, text);
    const res = await postReviwApi({
      variables: {
        contractorId: contractorDetails?.id,
        rating: rating?.toString(),
        serviceId: '123444',
        text,
      },
      context: {headers},
    });
    console.log(res?.data, 'Post review');
    if (res?.data) {
      getThisReviews();
    }
  };

  console.log(contractorDetails?.id, 'Contractor Id');
  const getThisReviews = async () => {
    const response = await getAllReviewApi({
      variables: {
        contractorId: id,
        take: 20,
        skip: 0,
      },
      context: {headers},
    });
    if (response.data) {
      console.log(response.data.getPosts);
      setReviewsData(response.data.getPosts);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const [image, setImage] = useState<any>();
  const uploadImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo', // Limit selection to one image
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('user cancel the image pikker');
        return;
      } else if (response.errorCode) {
        console.log(response.errorMessage);
        return;
      }

      console.log('image ', response?.assets);

      if (response.assets) {
        const file = {
          uri: response.assets[0].uri,
          type: response.assets[0].type || 'image/jpeg', // Default to JPEG if type is not provided
          name: response.assets[0].fileName || 'image.jpg', // Default to 'image.jpg' if filename is not provided
        };
        setImage(file);
        uploadImageOnServer();
        //
      }
    });
  };

  const uploadImageOnServer = async () => {
    const inputFormData = new FormData();
    userData?.id && inputFormData.append('userId', userData.id);
    image &&
      inputFormData.append('file', {
        uri: image.uri,
        name: 'image.png',
        fileName: 'image',
        // type: 'image/png',
        type: 'application/octet-stream',
      });
    const res = await uploadPost({
      body: inputFormData,
      token: userData.accessToken,
    });
    console.log(res, 'Image upload response');
  };

  const getPosts = async () => {
    const res = await contractorposts({
      variables: {contractorId: id},
      context: {headers},
    });
    if (res.data) {
      console.log(res.data?.images);
      setPosts(res.data?.images);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleCall = () => {
    Linking.openURL(`tel:${contractorDetails?.phone}`);
  };

  return (
   <ScrollView>
      {skLoading ? <ProfileDetailsLoading/> :<View style={{flex: 1, marginTop: -1, backgroundColor: 'white'}}>
        <View style={{position: 'absolute', top: 10, left: 10, zIndex: 1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconButton icon={icons.back} iconColor="black" />
          </TouchableOpacity>
        </View>
        <View className=" ">
          <FlatList
            data={onboardingCard}
            renderItem={onBoardingCards}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id.toString()}
            viewabilityConfig={viewConfig}
            ref={slideRef}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
        </View>

        <ScrollView className="px-5">
          <View className="flex-row justify-between items-center ">
            <Text className="text-black text-3xl font-[Poppins-Medium]">
              {contractorDetails ? contractorDetails?.service : '-'}
            </Text>
            <TouchableOpacity onPress={addToBookmarks}>
              <IconButton
                size={30}
                iconColor="#822BFF"
                icon={!bookmark1 ? icons.bookmark1 : icons.bookmark}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#8d51e1]  text-base mr-3 font-[Poppins-SemiBold]">
              {contractorDetails ? contractorDetails?.fullname : '-'}
            </Text>
            <View className="flex-row items-center gap-2">
              <Image className="h-6 w-6" source={icons.star} />
              <Text className="text-[#3b3941] font-[Poppins-Regular]">
                {contractorDetails?.rating ? contractorDetails?.rating : 5} ({contractorDetails?.rewies ? contractorDetails?.rewies : 0 } reviews)
              </Text>
            </View>
          </View>
          <View className="py-2 flex-row items-center">
            <Text className="text-[#8d51e1] text-center  rounded-lg p-1 text-xs bg-[#dcc5fd] font-[Poppins-Regular]">
              {contractorDetails ? contractorDetails?.service : ''}
            </Text>
            <View className="flex-row items-center">
              <IconButton iconColor="#822BFF" size={20} icon={icons.location} />
              <Text className="text-[#3b3941] text-xs font-[Poppins-Regular]">
                {contractorDetails ? contractorDetails?.address : '-'}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="text-[#8d51e1] text-4xl font-[Poppins-SemiBold]">
              ₹ {contractorDetails ? contractorDetails?.price : ''}
            </Text>
            <Text className="text-sm text-[#3b3941] font-[Poppins-Regular]">
              ({contractorDetails ? contractorDetails?.unit : ''})
            </Text>
          </View>

          <View
            className="py-2"
            style={{borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}}></View>

          {/* About */}

          <View className="py-2">
            <Text className="text-[#3b3941] text-lg mb-2 font-[Poppins-SemiBold]">
              About me
            </Text>
            <View>
              <ReadMoreText maxChars={80}>
                {contractorDetails ? contractorDetails?.about : ''}
              </ReadMoreText>
            </View>
          </View>

          {/* Photos And Videos */}

          <View className="py-2">
            <View className=" flex-row justify-between items-center">
              <Text className="text-[#3b3941]  text-lg mb-2 font-[Poppins-SemiBold]">
                Photos & Videos
              </Text>
              {posts.length > 0 && (
                <TouchableOpacity onPress={() => setSeeMore(true)}>
                  <Text className="text-[#8d51e1] font-[Poppins-SemiBold]">
                    See all
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-row flex-wrap justify-center gap-2">
              {posts?.map((item: any, index: number) => {
                return index > 4 ? (
                  <View key={index}></View>
                ) : (
                  <View
                    key={index}
                    className="flex-row  gap-3 justify-center items-center">
                    {/* <View> */}
                    {/* Left Image */}
                    {/* <Image
                    className="rounded-xl object-contain"
                    style={{height: 260, width: 150}}
                    source={{uri: item}}
                  /> */}
                    {/* </View> */}
                    <View className="flex-col gap-2">
                      {/* Top Right Image */}
                      <Image
                        className="rounded-xl object-contain"
                        style={{height: 130, width: 150}} // Adjust dimensions as needed
                        source={{uri: `${env.storage}${item?.imageurl}`}}
                      />
                      {/* Bottom Right Image */}
                      {/* <Image
                    className="rounded-xl object-contain"
                    style={{height: 130, width: 150}} // Adjust dimensions as needed
                    source={{uri: item.image3}}
                  /> */}
                    </View>
                  </View>
                );
              })}
            </View>
            {userData.id == id && (
              <View className=" flex-row px-5 justify-end py-2">
                <TouchableOpacity
                  className="bg-gray-200 w-1/2 rounded-lg "
                  onPress={uploadImage}>
                  <Text className="text-gray-400 text-5xl text-center">+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Reviews */}

          <View className="py-6">
            <View className=" flex-row justify-between items-center">
              <View className="flex-row items-center gap-1">
                <Image className="h-8 w-8 mb-2" source={icons.star} />
                <Text className="text-[#3b3941] font-[Poppins-SemiBold] text-lg mb-2">
                {contractorDetails?.rating ? contractorDetails?.rating : 5} ({contractorDetails?.rewies ? contractorDetails?.rewies : 0} reviews)
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-[#8d51e1] font-[Poppins-SemiBold]">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            {/* <ButtonGroup
            values={['All', '5', '4', '3', '2', '1']}
            isPressed={isPressed}
            handlePress={handlePress}
          /> */}
            {canPost && (
              <View className="border border-gray-400 p-3 rounded-3xl">
                <View className="flex-row">
                  <TouchableOpacity onPress={() => setRating(1)}>
                    <AntDesign
                      size={25}
                      color={'#822BFF'}
                      name={rating >= 1 ? 'star' : 'staro'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(2)}>
                    <AntDesign
                      size={25}
                      color={'#822BFF'}
                      name={rating >= 2 ? 'star' : 'staro'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(3)}>
                    <AntDesign
                      size={25}
                      color={'#822BFF'}
                      name={rating >= 3 ? 'star' : 'staro'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(4)}>
                    <AntDesign
                      size={25}
                      color={'#822BFF'}
                      name={rating >= 4 ? 'star' : 'staro'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(5)}>
                    <AntDesign
                      size={25}
                      color={'#822BFF'}
                      name={rating >= 5 ? 'star' : 'staro'}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  mode="outlined"
                  textColor="#28282B"
                  className={`mt-5 font-[Poppins-Regular]  ${'bg-gray-100'}`}
                  placeholder="Post your comment"
                  onChangeText={text => setText(text)}
                  value={text}
                />
                <TouchableOpacity
                  onPress={postReviw}
                  className="bg-[#8d51e1] py-3 w-1/3 self-end mx-3 mt-3 rounded-xl">
                  <Text className="text-center font-[Poppins-SemiBold] text-base tracking-wider text-white">
                    Post
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="px-3 mt-5 pb-6">
              {reviewsData.map((item: any, index) => (
                <View key={index}>
                  <View className="flex-row justify-between " key={index}>
                    <View className="flex-row  items-center gap-3">
                      <Image
                        className="h-8 w-8 rounded-full"
                        source={
                          item?.user?.image
                            ? {uri: `${env.storage}${item?.user?.image}`}
                            : icons.avatar
                        }
                      />
                      <Text className="text-black font-[Poppins-Regular]">
                        {item?.user?.fullname}
                      </Text>
                    </View>
                    <View className="flex-row  items-center px-5">
                      <Button
                        icon="star"
                        mode="outlined"
                        textColor="#8d51e1"
                        className="w-10 h-10  text-xs font-[Poppins-Regular]"
                        style={{borderColor: '#8d51e1'}}
                        onPress={() => console.log('pressed')}>
                        {item.rating}
                      </Button>
                      {/* <IconButton iconColor='black' icon="dots-horizontal-circle-outline" ></IconButton> */}
                    </View>
                  </View>
                  <Text className="text-black">{item.text}</Text>
                  <View className="flex-row items-center gap-5">
                    {/* <View className="flex-row items-center">
                    <IconButton
                      icon="heart"
                      iconColor={
                        likedComments.includes(item.id) ? 'red' : 'black'
                      }
                      onPress={() => handleLike(item.id)}
                    />

                    <Text className="text-black">{item.likes}</Text>
                  </View> */}
                    <Text className="text-black text-xs mt-1 font-[Poppins-SemiBold]">
                      {/* {item.date} */}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View
              className="py-2"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
              }}></View>
          </View>
        </ScrollView>
        <View className="py-5 justify-center absolute w-full bottom-0 px-4 bg-white mt-2">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}
            className="gap-x-3">
            <TouchableOpacity
              onPress={handleCall}
              className="border flex-row  py-3  border-[#822BFF] rounded-full flex-1 justify-center items-center">
              <Image
                source={icons.phone}
                className="w-5 h-5 mr-2"
                tintColor={'#822BFF'}
              />
              <Text className=" text-[#822BFF] text-base tracking-wider">
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationString.BOOK, {
                  contractor: contractorDetails.id,
                  price: contractorDetails.price,
                })
              }
              className=" bg-[#822BFF] rounded-full flex-1 justify-center items-center">
              <Text className=" text-white text-base tracking-wider">
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <ActivityIndicatorComponent />}
        <SeeMore setModal={setSeeMore} modal={seeMore} posts={posts} />
      </View>}
    </ScrollView>
  );
};

export default WorkDetails;

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderColor: '#822BFF',
    borderWidth: 2,
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
