import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import images from '../../constants/images';

const NotFound = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                right={() => <IconButton icon="filter-outline" iconColor='rgba(130, 43, 255, 10)' />}
            />

            <View style={styles.resultInfo}>
                <Text style={styles.resultText}>
                    Results For "<Text style={styles.highlightedText}>Cleaninn</Text>"
                </Text>
                <Text style={styles.resultCount}>0 found</Text>
            </View>

            <View style={styles.notFoundContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={images.notfound} />
                </View>
                <Text style={styles.notFoundTitle}>Not Found</Text>
                <Text style={styles.notFoundMessage}>
                    Sorry, the keyword you entered cannot be found, please check again or search with another keyword.
                </Text>
            </View>
        </View>
    );
};

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
    highlightedText: {
        color: 'rgba(130, 43, 255, 10)',
    },
    resultCount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(130, 43, 255, 10)',
    },
    notFoundContainer: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: 300,
    },
    notFoundTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    notFoundMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
    },
});

export default NotFound;
