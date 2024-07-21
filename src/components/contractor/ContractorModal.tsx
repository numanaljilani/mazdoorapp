import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCompleteContractorRegistrationMutation} from '../../service/api/userApi';
import {services} from '../../constants/services';
import {showMessage} from 'react-native-flash-message';
import navigationString from '../../constants/navigation';
import {Card, Provider, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';
import ActivityIndicatorComponent from '../common/ActivityIndicatorComponent';
import {Picker} from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';
import {units} from '../../constants/unit';

import {Dropdown} from 'react-native-element-dropdown';

import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateContractorModal = ({
  setModal,
  create,
  contractorModal,
  navigation,
}: {
  setModal: any;
  create: any;
  contractorModal: boolean;
  navigation: any;
}) => {
  const dispatch = useDispatch();
  const {userData, token, posts, language} = useSelector(
    (state: any) => state?.user,
  );
  const [service, setService] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [about, setAbout] = useState('');
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  // const [becomeContractor, {data, loading}] = useMutation(BECOMEACONTRACTOR);
  const [becomeContractor, {data, isSuccess, isError, error}] =
    useCompleteContractorRegistrationMutation();

  var subServices = services.filter(sub => sub.english == service);
  // console.log(subServices)

  const headers = {
    authorization: userData.accessToken ? `Bearer ${userData.accessToken}` : '',
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const registerContractor = async () => {
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
        subServices.map(sub => sub.english),
      ]);
    price && inputFormData.append('price', price);
    unit && inputFormData.append('unit', unit);
    about && inputFormData.append('about', about);
    inputFormData.append('token', userData.accessToken);

    if (!subServices || !price || !unit || !about) {
      showMessage({
        type: 'danger',
        message: 'All Fields are reuired.',
        icon: 'warning',
        position: 'top',
      });
      return;
    }

    setIsLoading(true);
    const res = await becomeContractor({
      body: inputFormData,
      token: userData.accessToken,
    });
    setIsLoading(false);

    console.log(res, 'response');
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(navigationString.CONTRACTORDETAILS, {
        id: data.user.id,
      });
    }
  }, [isSuccess]);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.service === service && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={contractorModal}
      style={{zIndex: 1100}}
      onDismiss={() => setModal(false)}
      //   animationType="slide"
      animationType="fade"
      className=""
      onRequestClose={setModal}>
      <View style={styles.modalBackground} className="flex-1 justify-end ">
        <View />
        {/* <ScrollView> */}
        <View className="bg-white w-full h-3/4  mt-10 px-4  rounded-t-3xl">
          <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " />
          <View className="pb-7">
            <Text className="text-xl mt-4 font-[Poppins-SemiBold] text-center text-[#822BFF]">
              {!language ? `Register as a contractor` : `लॉग आउट`}
            </Text>
            <View className="border-t border-gray-200  mx-4 mt-2" />

            <Provider>
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                  <View className="min-h-screen">
                    <View style={styles.card} className="bg-white mt-4">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={services}
                        search
                        maxHeight={300}
                        labelField="id"
                        valueField="english"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={service}
                        onChange={(item: any) => {
                          setService(item.english);
                        }}
                        renderLeftIcon={() => (
                          <AntDesign
                            style={styles.icon}
                            color="black"
                            name="Safety"
                            size={20}
                          />
                        )}
                        renderItem={renderItem}
                      />
                      <Card.Content>
                        <View style={styles.pickerContainer}>
                          <Picker
                            selectedValue={service}
                            onValueChange={itemValue => setService(itemValue)}
                            style={styles.picker}>
                            <Picker.Item label="Select Service" value="" />
                            {services.map((item, index) => (
                              <Picker.Item
                                key={index}
                                label={language ? item.english : item.hindi}
                                value={item.english}
                              />
                            ))}
                          </Picker>
                        </View>
                        {subServices[0] && (
                          <View style={styles.multiSelectContainer}>
                            <MultiSelect
                              items={subServices[0]?.subservices}
                              uniqueKey="english"
                              onSelectedItemsChange={selectedItems => {
                                console.log(selectedItems, 'selected items');
                                setSelectedSubServices(selectedItems);
                              }}
                              selectedItems={selectedSubServices}
                              selectText="Select Sub-Services"
                              searchInputPlaceholderText="Search Sub-Services..."
                              onChangeInput={text => console.log(text, '>>>>')}
                              displayKey={language ? 'english' : 'hindi'}
                              submitButtonText="Add"
                              styleMainWrapper={styles.multiSelect}
                              styleListContainer={styles.multiSelectList}
                              styleDropdownMenuSubsection={
                                styles.multiSelectDropdown
                              }
                              styleTextDropdown={styles.multiSelectTextDropdown}
                              styleSelectorContainer={
                                styles.multiSelectSelectorContainer
                              }
                              submitButtonColor="#822BFF"
                            />
                            {/* <View style={styles.selectedItemsContainer}>
                                    {selectedSubServices.map((serviceId) => {
                                        const service = subServices.find(s => s.id === serviceId);
                                        return (
                                            <View key={serviceId} style={styles.selectedItem}>
                                                <Text style={styles.selectedItemText}>{service?.name}</Text>
                                                <TouchableOpacity onPress={() => deselectSubService(serviceId)}>
                                                    <Icon ico size={20} source="delete-outline" />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View> */}
                          </View>
                        )}
                        <TextInput
                          label="Price"
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
                            <Picker.Item label="Select Unit" value={unit} />
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
                          label="About"
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
                      </Card.Content>
                    </View>
                  </View>
                  {isLoading && <ActivityIndicatorComponent />}
                </View>
              </TouchableWithoutFeedback>
            </Provider>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
};

export default memo(CreateContractorModal);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    flex: 1,
    zIndex: 1000,
  },
  container: {
    // flex: 1,
    // backgroundColor: '#87CEEB',
    // justifyContent: 'center',
    // padding: 10,
  },
  card: {
    // backgroundColor: '#fff',
    // minHeight: 1000,
    // padding: 10,
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

  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
