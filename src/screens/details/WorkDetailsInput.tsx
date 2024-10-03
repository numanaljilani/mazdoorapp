import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Card, TextInput, Button, Provider, Icon} from 'react-native-paper';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import MultiSelect from 'react-native-multiple-select';
import {Picker} from '@react-native-picker/picker';
import {services} from '../../constants/services';
import {useSelector} from 'react-redux';
import ButtonGroup from '../../components/common/ButtonGroup';
import icons from '../../constants/icons';
import {units} from '../../constants/unit';
import {BECOMEACONTRACTOR, CONTRACTORDETAILS} from '../../graphql/mutation/contractor';
import {useMutation} from '@apollo/client';
import {showMessage} from 'react-native-flash-message';
import {useCompleteContractorRegistrationMutation} from '../../service/api/userApi';
import navigationString from '../../constants/navigation';
import ActivityIndicatorComponent from '../../components/common/ActivityIndicatorComponent';
import PhoneWarning from '../../components/updateModal/PhoneWarning';

type SubService = {
  id: string;
  name: string;
};

const WorkDetailsInput = ({navigation}: any) => {
  const {userData, token, posts, language} = useSelector(
    (state: any) => state?.user,
  );
  const [service, setService] = useState('');
  const [unit, setUnit] = useState('');
  const [contractorDetails, setContractorDetails] = useState<any>();
  const [price, setPrice] = useState<string>(contractorDetails?.price ||'');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [about, setAbout] = useState('');
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const [phoneModal, setPhoneModal] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  // const [becomeContractor, {data, loading}] = useMutation(BECOMEACONTRACTOR);
  const [becomeContractor, {data, isSuccess, isError, error}] =
    useCompleteContractorRegistrationMutation();

  var subServices = services.filter(sub => sub.english == service);
  // console.log(subServices)

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };
  const [details] = useMutation(CONTRACTORDETAILS);

  const pickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const firstAsset: Asset = response.assets[0];
        if (firstAsset?.uri) {
          setImageUri(firstAsset.uri);
        }
      }
    });
  };

  console.log(userData , "user data")
  const removeImage = () => {
    setImageUri(null);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const registerContractor = async () => {
    if(!userData.phone){
      setPhoneModal(true)
      return
    }
    if (!service || !price || !unit || !subServices) {
      showMessage({
        message: 'All fields are required',
        type: 'danger',
      });
    }
    const inputFormData = new FormData();
    service && inputFormData.append('service', service);
    subServices &&
      inputFormData.append('subServices', [
        subServices.length > 0 ? subServices?.map(sub => sub.english) : service,
      ]);
    price && inputFormData.append('price', price);
    unit && inputFormData.append('unit', unit);
    about && inputFormData.append('about', about);
    inputFormData.append('token', userData.accessToken);

    setIsLoading(true);
    const res :any = await becomeContractor({
      body: inputFormData,
      token: userData.accessToken,
    });
    setIsLoading(false);
    if(res.data){
      navigation.navigate(navigationString.CONTRACTORDETAILS, {
        id: res?.data?.user.id,
      });
    }else{
      navigation.goBack();
    }
  };

  const getDetails = async () => {
    if(userData.isContractor){
      const res = await details({variables: {id : userData.id}, context: {headers}});
      
      if (res?.data?.contractorDetails.contractor) {
        setContractorDetails(res?.data?.contractorDetails.contractor);
      
      }
    }
       
  };

  useEffect(()=>{
    getDetails()
  },[])
  useEffect(()=>{
    if(contractorDetails?.price){

      setPrice(contractorDetails?.price)
    }
  },[contractorDetails])
const profile = async () =>{
  navigation.navigate(navigationString.CONTRACTORDETAILS, {
    id: userData.id,
  });
}


  return (
    <>
      
       
          <ScrollView style={styles.container}>
            <View className="min-h-screen ">
              <View className="bg-white justify-center py-6 px-5">
                <Text className="text-xl font-[Poppins-SemiBold] text-center  text-purple-700 ">
                  {language ? "ठेकेदार पंजीकरण" : "Contractor Registration"}
                </Text>
                <Text className="text-sm font-[Poppins-Regular] text-center  text-gray-500 ">
                {language ? "अपनी पहुंच बढ़ाने, ग्राहकों को आसानी से प्रबंधित करने और अपने व्यवसाय को सहजता से बढ़ाने के लिए एक सेवा प्रदाता के रूप में हमसे जुड़ें।" :"Join us as a service provider to expand your reach, manage clients easily, and grow your business effortlessly."}
                </Text>
              </View>
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={service}
                      onValueChange={itemValue => setService(itemValue)}
                      style={styles.picker}>
                      <Picker.Item label={userData.isContractor ? contractorDetails?.service:"Select Service"} value="" />
                      {services.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={language ? item.english : item.english}
                          value={item.english}
                        />
                      ))}
                    </Picker>
                  </View>
                  {
                  // subServices[0] && (
                    // <View style={styles.multiSelectContainer}>
                    //   <MultiSelect
                    //     items={subServices[0]?.subservices}
                    //     uniqueKey="english"
                    //     onSelectedItemsChange={selectedItems => {
                    //       console.log(selectedItems, 'selected items');
                    //       setSelectedSubServices(selectedItems);
                    //     }}
                    //     selectedItems={selectedSubServices}
                    //     selectText="Select Sub-Services"
                    //     searchInputPlaceholderText="Search Sub-Services..."
                    //     onChangeInput={text => console.log(text, '>>>>')}
                    //     displayKey={language ? 'english' : 'english'}
                    //     submitButtonText="Add"
                    //     styleMainWrapper={styles.multiSelect}
                    //     styleListContainer={styles.multiSelectList}
                    //     styleDropdownMenuSubsection={styles.multiSelectDropdown}
                    //     styleTextDropdown={styles.multiSelectTextDropdown}
                    //     styleSelectorContainer={
                    //       styles.multiSelectSelectorContainer
                    //     }
                    //     submitButtonColor="#822BFF"
                    //   />
                    //   {/* <View style={styles.selectedItemsContainer}>
                    //                 {selectedSubServices.map((serviceId) => {
                    //                     const service = subServices.find(s => s.id === serviceId);
                    //                     return (
                    //                         <View key={serviceId} style={styles.selectedItem}>
                    //                             <Text style={styles.selectedItemText}>{service?.name}</Text>
                    //                             <TouchableOpacity onPress={() => deselectSubService(serviceId)}>
                    //                                 <Icon ico size={20} source="delete-outline" />
                    //                             </TouchableOpacity>
                    //                         </View>
                    //                     );
                    //                 })}
                    //             </View> */}
                    // </View>
                  // )
                  }
                  <TextInput
                    label={ "Price"}
                    textColor="#28282B"
                    mode="outlined"
                    value={price}
                    keyboardType="number-pad"
                    onChangeText={text => setPrice(text)}
                    className="bg-white border-gray-300 mb-3"
                  />
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={unit}
                      onValueChange={itemValue => setUnit(itemValue)}
                      style={styles.picker}>
                      <Picker.Item label={userData.isContractor ? contractorDetails?.unit :"Select Unit"} value={unit} />
                      {units.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={language ? item.english : item.english}
                          value={item.english}
                        />
                      ))}
                    </Picker>
                  </View>

                  <TextInput
                    label={userData.isContractor ? contractorDetails?.about : "About"}
                    textColor="#28282B"
                    mode="outlined"
                    value={about}
                    onChangeText={text => setAbout(text)}
                    style={styles.textArea}
                    multiline
                    numberOfLines={3}
                  />
                  <TouchableOpacity
                    onPress={registerContractor}
                    className="bg-[#822BFF]  py-3 rounded-full my-2">
                    <Text className="text-white font-[Poppins-Medium] tracking-widest text-center text-lg ">
                      Continue
                    </Text>
                  </TouchableOpacity>
                  {userData.isContractor && <TouchableOpacity
                    onPress={profile}
                    className="bg-[#822BFF]  py-3 rounded-full my-2">
                    <Text className="text-white font-[Poppins-Medium] tracking-widest text-center text-lg ">
                      View Profile
                    </Text>
                  </TouchableOpacity>}
                </Card.Content>
              </Card>
            </View>
            {isLoading && <ActivityIndicatorComponent />}
          </ScrollView>
        {phoneModal &&  <PhoneWarning navigation={navigation} setModal={setPhoneModal}/>}
        
      
    </>
  );
};

export default WorkDetailsInput;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#87CEEB',
    // justifyContent: 'center',
    // padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    minHeight: 1000,
    padding: 10,
  },
  imageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
  },
  imageInputText: {
    flex: 1,
    color: '#999',
  },
  imageIcon: {
    width: 24,
    height: 24,
    tintColor: '#999',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  removeButton: {
    marginVertical: 15,
    backgroundColor: '#822BFF',
    color: 'white',
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  textArea: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  multiSelectContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    // flexDirection : "row",
    color: 'black',
  },
  multiSelect: {
    borderWidth: 0,
    padding: 5,
  },
  multiSelectList: {
    maxHeight: 150,
  },
  multiSelectDropdown: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  multiSelectTextDropdown: {
    color: '#000',
  },
  multiSelectSelectorContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  selectedItem: {
    // backgroundColor: '#d3d3d3',
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 4,
    margin: 5,
    flexDirection: 'row',
  },
  selectedItemText: {
    color: '#000',
  },
});
