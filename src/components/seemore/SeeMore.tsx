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
import {Image} from 'react-native-elements';
import icons from '../../constants/icons';
import env from '../../env';

const SeeMore = ({
  setModal,
  modal,
  posts,
}: {
  setModal: any;
  modal: boolean;
  posts: any[];
}) => {
  const dispatch = useDispatch();
  const {userData, token, language} = useSelector((state: any) => state?.user);
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

  return (
    <Modal
      transparent={true}
      visible={modal}
      style={{zIndex: 1100}}
      onDismiss={() => setModal(false)}
      //   animationType="slide"
      animationType="fade"
      className=""
      onRequestClose={setModal}>
      <View style={styles.modalBackground} className="flex-1 justify-end ">
        <View />
        <ScrollView contentContainerStyle={{flex : 1}}>
        <View className="bg-white w-full   mt-10 px-4  rounded-t-3xl">
          <View className="border-2 rounded-full  mt-3 w-10 mx-auto border-gray-200 " />
          <View className="pb-7">
            <Text className="text-xl mt-4 font-[Poppins-SemiBold] text-center text-[#822BFF]">
              {!language ? `Images` : `लॉग आउट`}
            </Text>
            <View className="border-t border-gray-200  mx-4 mt-2" />
            <View className="px-5 py-4">
              {posts?.map(post => (
                <View className=" w-full h-full">
                  <Image
                    source={{uri: `${env.storage}${post?.imageurl}`}}
                    className="w-full h-1/2 "
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default memo(SeeMore);

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    flex: 1,
    zIndex: 1000,
  },
  container: {
    //   flex: 1,
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
});
