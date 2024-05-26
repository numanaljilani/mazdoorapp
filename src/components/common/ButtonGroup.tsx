import React, { useRef } from 'react';
import { ScrollView, View, Text, NativeSyntheticEvent, LayoutChangeEvent } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface ButtonGroupProps {
    values: string[];
    selectedValue: string | null;
    handlePress: (value: string | null) => void;
    showStarIcon?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ values, selectedValue, handlePress, showStarIcon = false }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const handleClick = (value: string) => {
        handlePress(value === selectedValue ? null : value);
    };

    const onButtonLayout = (event: any, index: number) => {
        if (selectedValue === values[index]) {
            const layout = event.nativeEvent.layout;
            scrollViewRef.current?.scrollTo({ x: layout.x - 10, animated: true });
        }
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.buttonContainer}
        >
            {values.map((value, index) => (
                <Button
                    key={value}
                    mode='outlined'
                    style={[
                        styles.button,
                        selectedValue === value && styles.activeButton,
                    ]}
                    onPress={() => handleClick(value)}
                    onLayout={(event) => onButtonLayout(event, index)}
                >
                    {showStarIcon ? (
                        <View style={styles.ratingButtonContent}>
                            <Icon source='star' size={16} color={selectedValue === value ? 'white' : 'blue'} />
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedValue === value && styles.activeButtonText
                                ]}
                            >
                                {value}
                            </Text>
                        </View>
                    ) : (
                        <Text
                            style={[
                                styles.buttonText,
                                selectedValue === value && styles.activeButtonText
                            ]}
                        >
                            {value}
                        </Text>
                    )}
                </Button>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonText: {
        color: 'blue',
        fontSize: 16,
    },
    activeButton: {
        backgroundColor: 'blue',
    },
    activeButtonText: {
        color: 'white',
    },
    ratingButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ButtonGroup;
