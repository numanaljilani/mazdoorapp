import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ButtonGroup from '../common/ButtonGroup';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);

    const handleSliderChange = (values: number[]) => {
        if (values.length === 2) {
            setPriceRange([values[0], values[1]]);
        }
    };

    const resetFilters = () => {
        setSelectedCategory(null);
        setSelectedRating(null);
        setPriceRange([0, 100]);
    };

    return (
        <View style={styles.mcontainer}>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={onClose}
                    contentContainerStyle={styles.modalContainer}
                >
                    <View>
                        <Text style={styles.modalTitle}>Filter</Text>
                        <View style={styles.separator}></View>
                        <View>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Category</Text>
                                <ButtonGroup
                                    values={['All', 'Cleaning', 'Repairing', 'Painting', 'Plumbing']}
                                    selectedValue={selectedCategory}
                                    handlePress={setSelectedCategory}
                                />
                            </View>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Price</Text>
                                <View style={styles.sliderContainer}>
                                    <Text style={styles.leftValueLabel}>${priceRange[0]}</Text>
                                    <MultiSlider
                                        values={priceRange}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValuesChangeFinish={handleSliderChange}
                                        selectedStyle={{ backgroundColor: 'blue' }}
                                        unselectedStyle={{ backgroundColor: '#E0E0E0' }}
                                        trackStyle={{ height: 4 }}
                                        markerStyle={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            backgroundColor: 'blue',
                                            borderWidth: 0,
                                        }}
                                    />
                                    <Text style={styles.rightValueLabel}>${priceRange[1]}</Text>
                                </View>
                            </View>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Rating</Text>
                                <ButtonGroup
                                    values={['All', '5', '4', '3', '2', '1']}
                                    selectedValue={selectedRating}
                                    handlePress={setSelectedRating}
                                    showStarIcon={true}
                                />
                            </View>
                        </View>
                        <View style={styles.separator}></View>
                        <View className='py-4' style={styles.footer}>
                            <Button
                                mode='outlined'
                                textColor='blue'
                                style={[styles.footerButton, styles.resetButton]}
                                onPress={resetFilters}
                            >
                                Reset
                            </Button>
                            <Button
                                mode='contained'
                                textColor='white'
                                style={[styles.footerButton, styles.filterButton]}
                                onPress={() => console.log("Filter pressed")}
                            >
                                Filter
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    mcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    separator: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    filterSection: {
        marginBottom: 10,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    leftValueLabel: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'blue',
        padding: 4,
        borderRadius: 4,
        marginRight: 10,
    },
    rightValueLabel: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'blue',
        padding: 4,
        borderRadius: 4,
        marginLeft: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerButton: {
        flex: 1,
        marginHorizontal: 5,
    },
    resetButton: {
        borderColor: 'blue',
    },
    filterButton: {
        backgroundColor: 'blue',
    },
});
