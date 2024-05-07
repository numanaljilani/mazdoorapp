import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, TextInput} from 'react-native-paper';
import image, {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import images from '../../constants/images';
import {useBecomeWorkerMutation} from '../../service/api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import icons from '../../constants/icons';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import {setUser} from '../../service/slice/userSlice';
import ServiceModal from '../../components/worker/ServiceModal';
import {services} from '../../constants/services';
import {configureStore} from '@reduxjs/toolkit';
services;

const Worker = ({navigation}: any) => {
  const [service, setServcie] = useState<{
    id: string;
    english: string;
    hindi: string;
  }>();

  const unitsOfWork = [
    {english: 'Hour', hindi: 'घंटा'},
    {english: 'Day', hindi: 'दिन'},
    {english: 'Week', hindi: 'सप्ताह'},
    {english: 'Piece', hindi: 'टुकड़ा'},
    {english: 'Meter', hindi: 'मीटर'},
    {english: 'Cubic Meter', hindi: 'क्यूबिक मीटर'},
    {english: 'Ton', hindi: 'टन'},
    {english: 'Gallon', hindi: 'गैलन'},
    {english: 'Square Meter', hindi: 'वर्ग मीटर'},
    {english: 'Linear Meter', hindi: 'लीनियर मीटर'},
    {english: 'Kilogram', hindi: 'किलोग्राम'},
    {english: 'Square Foot', hindi: 'वर्ग फ़ीट'},
    {english: 'Cubic Foot', hindi: 'क्यूबिक फ़ीट'},
    {english: 'Liter', hindi: 'लीटर'},
    {english: 'Piece Rate', hindi: 'टुकड़े की दर'},
    {english: 'Man-Day', hindi: 'आदमी-दिन'},
    {english: 'Tonne', hindi: 'टन'},
    {english: 'Foot', hindi: 'फुट'},
    {english: 'Yard', hindi: 'गज'},
    // Add more units as needed...
  ];
  const {userData, token, posts, language} = useSelector(
    (state: any) => state?.user,
  );
  const [unit, setUnit] = useState<{english: string; hindi: string}>({
    english: userData.unit ? userData.unit : 'Select the unit',
    hindi: userData.unit ? userData.unit : `इकाई का चयन करें`,
  });
  const [tags, setTags] = useState<string>('');
  const [location, setLoacation] = useState<string>(userData.location ? userData.location : "");
  const [available, setAvailable] = useState<string>(userData.availablity ? userData.availablity : "");
  const [serviceModal, setServcieModal] = useState<boolean>(false);
  const [unitModal, setUnitModal] = useState<boolean>(false);
  const [price, setPrice] = useState<string>(userData.cost ? userData.cost : "");
  const [profile, setProfile] = useState<any>();

  const dispatch = useDispatch();

  const [becomeWorker, {data, isError, isSuccess, error, isLoading}] =
    useBecomeWorkerMutation();

  const handleImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 600,
      selectionLimit: 1, // Limit selection to one image
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('user cancel the image pikker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      }

      // console.log('image ', response?.assets);
      if (response.assets[0]) {
        setProfile(response.assets[0]);
      }
    });
  };

  useEffect(() => {
    console.log(data);
    if (isSuccess) {
      dispatch(setUser(data));
      navigation.navigate('BottomTabs');
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      navigation.navigate('BottomTabs');
    }
  }, [isError]);

  useEffect(()=>{
    services.map((service: any) => {
      service.english == userData.occupation && setServcie(service);
    });
  
  },[])
 
  const completeProfile = async () => {
    // console.log(!tags, !location, !available, !price);
    // if (!tags || !location || !available || !price) {
    //   showMessage({
    //     type: 'danger',
    //     message: 'all fields are required',
    //   });
    // }
    if (!service?.english) {
      showMessage({
        type: 'danger',
        message: 'Please select the service',
      });
    }


    
      const inputFormData = new FormData();
      profile?.uri && inputFormData.append('file', {
        uri: profile.uri,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      inputFormData.append('service', service?.english);
      price && inputFormData.append('cost', price);
      unit?.english && inputFormData.append('unit', unit.english);
      tags && inputFormData.append('tags', tags?.trim());
      location && inputFormData.append('location', location);
      available && inputFormData.append('available', available);
      await becomeWorker({body: inputFormData, token});
    
  };

  return (
    <ScrollView>
      <View className=" py-3 flex-1 ">
        <Image
          source={icons.service}
          className="w-32 h-32 mx-auto"
          tintColor={'#312651'}
        />
        <Text className="text-2xl font-semibold text-center text-[#312651]   tracking-wide">
          <Text className="text-[#FF7754]">
            {' '}
            {language ? `नए अवसरों को अनलॉक करें` : `Unlock new opportunities `}
          </Text>
          {language
            ? `अपनी सेवाओं को दूसरों के साथ साझा करके।`
            : ` by
          sharing your services with others.`}
        </Text>
        <View className="px-4 ">
          <View className=" rounded-lg py-3 bg-white shadow shadow-blue-500 px-3">
            <TouchableOpacity
              onPress={() => setServcieModal(true)}
              className="py-3 px-5 rounded-md shadow-lg border border-gray-300 shadow-black bg-white">
              <Text className=" font-normal text-[#28282B] text-lg">
                {service
                  ? language
                    ? service.hindi
                    : service.english
                  : language
                  ? `सेवा का चयन करें`
                  : 'select the service'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-4 py-4">
              <TextInput
                className="flex-1 bg-white"
                activeOutlineColor="#312651"
                onChangeText={text => setPrice(text)}
                mode="outlined"
                textColor='#28282B'
                label={language ? 'कीमत' : 'Price'}
                keyboardType="number-pad"
                value={price.toString()}
                left={ 
                  <TextInput.Icon
                    icon={() => (
                      <Icon source={icons.rupee} size={22} color="#312651" />
                    )}
                  />
                }
              />
              <TouchableOpacity
                onPress={() => setUnitModal(true)}
                className="py-2 px-5 mt-5 rounded-md shadow-lg shadow-black text-[#28282B] bg-white">
                <Text className="my-auto font-normal text-[#28282B]">
                  {language ? unit.hindi : unit.english}
                </Text>
              </TouchableOpacity>
            </View>


          </View>
{/* 
          <View className=" py-3 my-4 rounded-lg bg-white shadow shadow-blue-500 px-3 ">
              <Text className="text-xs font-normal">
                {language
                  ? `कृपया हैश टैग दर्ज करें (जैसे: #electrician, #Industrialelectrician)`
                  : ` Please enter the hash tags (e.g : #electrician
              #Industrialelectrician)`}
              </Text>
              <TextInput
                className="flex-1"
                activeOutlineColor="#312651"
                mode="outlined"
                label={language ? `हैश टैग` : 'Hash tags'}
                onChangeText={text => setTags(text)}
                value={tags}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon source={icons.hashtag} size={22} color="#312651" />
                    )}
                  />
                }
              />
            </View> */}

          <View className=" py-3 my-4 rounded-lg bg-white  shadow shadow-blue-500 px-3 ">
            <TextInput
              className="flex-1 bg-white text-[#28282B]"
              activeOutlineColor="#312651"
              mode="outlined"
              textColor='#28282B'
              value={location}
              label={language ? `पता` : 'address'}
              onChangeText={text => setLoacation(text)}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon source={icons.location} size={22} color="#312651" />
                  )}
                />
              }
            />
            <TextInput
              className="flex-1 mt-2 bg-white"
              placeholderTextColor={`#36454F`	}
              activeOutlineColor="#312651"
              textColor='#28282B'
              mode="outlined"
              value={available}
              label={language ? 'उपलब्धता' : 'Availability'}
              onChangeText={text => setAvailable(text)}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon source={icons.calendar} size={22} color="#312651" />
                  )}
                />
              }
            />
          </View>

          {!userData?.isWorker && (
            <View>
              <TouchableOpacity
                className="w-36 h-36  border-[#312651d8]   my-3 overflow-hidden justify-center items-center"
                onPress={handleImage}>
                {profile?.uri ? (
                  <Image
                    source={profile ? {uri: `${profile.uri}`} : images.Male}
                    className="w-40 h-40"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-1 bg-[#31265148]  w-full">
                    <Text className="text-center my-auto text-6xl font-thin text-[#312651d8]">
                      +
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text className="text-base font-light">
                {language ? `नमूना कार्य छवि जोड़ें` : `Add Sample work image`}
              </Text>
            </View>
          )}

          <View className="flex-row gap-5 mt-5">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white border-[#312651] border-2  flex-1 py-3 rounded-lg mt-5">
              <Text className="text-[#312651] text-center text-lg font-medium">
                {language ? `पीछे` : `Back`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#312651] flex-1  py-3 rounded-lg mt-5"
              onPress={completeProfile}>
              <Text className="text-white text-center text-lg font-medium">
                {language ? `जारी रखना` : `Continue`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {serviceModal && (
          <ServiceModal
            setSericeModal={setServcieModal}
            setServcie={setServcie}
            data={services}
          />
        )}
        {unitModal && (
          <ServiceModal
            setSericeModal={setUnitModal}
            setServcie={setUnit}
            data={unitsOfWork}
          />
        )}
        {isLoading && <ActivityIndicatorComponent />}
      </View>
    </ScrollView>
  );
};

export default Worker;
