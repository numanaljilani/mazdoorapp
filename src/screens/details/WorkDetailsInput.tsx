import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Card, TextInput, Button, Provider, Icon } from 'react-native-paper';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import MultiSelect from 'react-native-multiple-select';
import { Picker } from '@react-native-picker/picker';

type SubService = {
    id: string;
    name: string;
};


const WorkDetailsInput = () => {
    const [service, setService] = useState('');
    const [about, setAbout] = useState('');
    const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const subServices = [
        { id: '1', name: 'Sub-Service 1' },
        { id: '2', name: 'Sub-Service 2' },
        { id: '3', name: 'Sub-Service 3' },
        { id: '4', name: 'Sub-Service 4' },
        { id: '5', name: 'Sub-Service 5' },
        { id: '6', name: 'Sub-Service 6' }
    ];

    const services = [
        'Service 1',
        'Service 2',
        'Service 3',
        'Service 4',
        'Service 5',
        'Service 6'
    ];

    const pickImage = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const firstAsset: Asset = response.assets[0];
                setImageUri(firstAsset.uri);
            }
        });
    };

    const removeImage = () => {
        setImageUri(null);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };




    return (
        <Provider>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.container}>
                    <Card style={styles.card}>
                        <Card.Content>
                            {!imageUri ? (
                                <TouchableOpacity style={styles.imageInput} onPress={pickImage}>
                                    <Text style={styles.imageInputText}>
                                        Upload Image
                                    </Text>
                                    <Image
                                        source={{ uri: 'https://img.icons8.com/material-rounded/24/000000/camera--v2.png' }}
                                        style={styles.imageIcon}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={styles.imagePreview}
                                    />
                                    <Button
                                        icon="close"
                                        mode="contained"
                                        onPress={removeImage}
                                        style={styles.removeButton}
                                    >
                                        Remove Image
                                    </Button>
                                </>
                            )}
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={service}
                                    onValueChange={(itemValue) => setService(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select Service" value="" />
                                    {services.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.multiSelectContainer}>
                                <MultiSelect
                                    items={subServices}
                                    uniqueKey="id"
                                    onSelectedItemsChange={(selectedItems) => setSelectedSubServices(selectedItems)}
                                    selectedItems={selectedSubServices}
                                    selectText="Select Sub-Services"
                                    searchInputPlaceholderText="Search Sub-Services..."
                                    onChangeInput={(text) => console.log(text)}
                                    displayKey="name"
                                    submitButtonText="Submit"
                                    styleMainWrapper={styles.multiSelect}
                                    styleListContainer={styles.multiSelectList}
                                    styleDropdownMenuSubsection={styles.multiSelectDropdown}
                                    styleTextDropdown={styles.multiSelectTextDropdown}
                                    styleSelectorContainer={styles.multiSelectSelectorContainer}
                                    submitButtonColor='blue'
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
                            <TextInput
                                label="About"
                                value={about}
                                onChangeText={text => setAbout(text)}
                                style={styles.textArea}
                                multiline
                                numberOfLines={4}
                            />
                        </Card.Content>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        </Provider >
    );
};

export default WorkDetailsInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        justifyContent: 'center',
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
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
        marginBottom: 15,
        backgroundColor: '#ff5252',
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    textArea: {
        height: 100,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
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
    },
    multiSelectContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
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
        backgroundColor: '#d3d3d3',
        padding: 5,
        borderRadius: 4,
        margin: 5,
        flexDirection: "row"
    },
    selectedItemText: {
        color: '#000',
    },
});
