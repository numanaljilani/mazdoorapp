import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import FilterModal from '../../components/filter/FilterModal';

const Searchh = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const openFilterModal = () => setFilterModalVisible(true);
    const closeFilterModal = () => setFilterModalVisible(false);

    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                right={() => <IconButton
                    onPress={openFilterModal}
                    icon="filter-outline"
                    iconColor='rgba(130, 43, 255, 10)' />}
            />

            <View style={styles.resultInfo}>
                <Text style={styles.resultText}>
                    Recent
                </Text>
                <Text style={styles.resultCount}>Clear All</Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}></View>
            {/* Recent search */}
            <Recent />
            {/* Recent search */}

            <FilterModal visible={filterModalVisible} onClose={closeFilterModal} />

        </View>
    );
};



const Recent = () => {
    const [recentItems, setRecentItems] = React.useState([
        { id: 1, text: 'Motorcycle repairing' },
        { id: 2, text: 'Painting the walls' },
        { id: 3, text: 'Wash A Car' },
        { id: 4, text: 'Wash A Car' },
        { id: 5, text: 'Wash A Car' },
        { id: 6, text: 'Wash A Car' },
        { id: 7, text: 'Wash A Car' },
        { id: 8, text: 'Wash A Car' },
        { id: 9, text: 'Wash A Car' },
        { id: 10, text: 'Wash A Car' },
    ]);

    return <>
        <ScrollView >
            <View>
                {recentItems.map(item => (
                    <View key={item.id} style={styles.recentContainer}>
                        <Text style={{ fontSize: 14, color: "grey" }}>{item.text}</Text>
                        <IconButton
                            style={{ paddingTop: 10 }}
                            iconColor='grey'
                            icon="delete-circle"
                            size={23}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    searchBar: {
        backgroundColor: 'rgba(240, 240, 240, 1)',
        marginBottom: 20,
    },
    resultInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    resultCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(130, 43, 255, 10)',
    },
    recentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


});

export default Searchh;
