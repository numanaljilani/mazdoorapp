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


const Worker = ({navigation}: any) => {
  const [service, setServcie] = useState<string>('');
  const [services, setServices] = useState<string[]>([
    'Electrician',
    'Plumber',
    'Carpenter',
    'Handyman',
    'Painter',
    'HVAC Technician',
    'Landscaper/Gardener',
    'Cleaning Service',
    'Roofing Specialist',
    'Flooring Specialist',
    'Locksmith',
    'Pest Control',
    'Appliance Repair Technician',
    'Interior Designer',
    'Moving and Packing Service',
    'Home Security Specialist',
    'Renovation Contractor',
    'Masonry/Bricklayer',
    'Window and Door Installation/Repair',
    'Pool Maintenance/Repair',
  ]);
  const [units, setUnites] = useState<string[]>([
    'Square Feet',
    'Square Meters',
    'Square Yards',
    'Acres',
    'Hectares',
    'Per Point',
  ]);
  const [unit, setUnit] = useState<string>('select the unit');
  const [tags, setTags] = useState<string>('');
  const [location, setLoacation] = useState<string>('');
  const [available, setAvailable] = useState<string>('');
  const [serviceModal, setServcieModal] = useState<boolean>(false);
  const [unitModal, setUnitModal] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [profile, setProfile] = useState<any>();

  const dispatch = useDispatch();

  const {userData, token} = useSelector((state: any) => state?.user);
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
      setProfile(response.assets[0]);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setUser(data));
      navigation.goBack();
    }
  }, [isSuccess]);

  const completeProfile = async () => {
    console.log(!tags, !location, !available, !price);
    if (!tags || !location || !available || !price) {
      showMessage({
        type: 'danger',
        message: 'all fields are required',
      });
    }

    if (profile) {
      const inputFormData = new FormData();
      inputFormData.append('file', {
        uri: profile.uri,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      inputFormData.append('service', service);
      inputFormData.append('cost', price);
      inputFormData.append('unit', unit);
      inputFormData.append('tags', tags);
      inputFormData.append('location', location);
      inputFormData.append('available', available);
      becomeWorker({body: inputFormData, token});
    }
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
          <Text className="text-[#FF7754]"> Unlock new opportunities </Text> by
          sharing your services with others.
        </Text>
        <View className="px-4 ">
          <View className=" rounded-lg py-3 bg-white shadow shadow-blue-500 px-3">
            <TouchableOpacity
              onPress={() => setServcieModal(true)}
              className="py-3 px-5 rounded-md shadow-lg shadow-black bg-white">
              <Text className=" font-normal">
                {service ? service : 'select the service'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-4 py-4">
              <TextInput
                className="flex-1"
                activeOutlineColor="#312651"
                onChangeText={text => setPrice(text)}
                mode="outlined"
                label={'Price'}
                keyboardType="number-pad"
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
                className="py-2 px-5 mt-5 rounded-md shadow-lg shadow-black bg-white">
                <Text className="my-auto font-normal">{unit}</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-xs font-normal">
              Please enter the hash tags (e.g : #electician
              #Industrialelectrician)
            </Text>
            <TextInput
              className="flex-1"
              activeOutlineColor="#312651"
              mode="outlined"
              label={'Hash tags'}
              onChangeText={text => setTags(text)}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon source={icons.hashtag} size={22} color="#312651" />
                  )}
                />
              }
            />
          </View>

          <View className=" py-3 my-4 rounded-lg bg-white shadow shadow-blue-500 px-3 ">
            <TextInput
              className="flex-1"
              activeOutlineColor="#312651"
              mode="outlined"
              label={'Location'}
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
              className="flex-1 mt-2"
              activeOutlineColor="#312651"
              mode="outlined"
              label={'Availability'}
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
            <Text className="text-base font-light">Add Sample work image</Text>
          </View>

          <View className="flex-row gap-5 mt-5">
            <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-white border-[#312651] border-2  flex-1 py-3 rounded-lg mt-5">
              <Text className="text-[#312651] text-center text-lg font-medium">
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#312651] flex-1  py-3 rounded-lg mt-5"
              onPress={completeProfile}>
              <Text className="text-white text-center text-lg font-medium">
                Continue
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
            data={units}
          />
        )}
        {isLoading && <ActivityIndicatorComponent />}
      </View>
    </ScrollView>
  );
};

export default Worker;
