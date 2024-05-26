import { View, StyleSheet } from 'react-native';
import React from 'react';
import DateTimePicker from 'react-native-ui-datepicker';

const MyCalender = ({ date, setDate }: any) => {

    return (
        <View className="bg-[#822BFF]/10 rounded-xl ">
            <DateTimePicker
                mode="single"
                date={date}
                onChange={(params: any) => {
                    setDate(params.date);
                }}
                selectedItemColor="#822BFF"
                todayTextStyle={{ color: 'black' }}
                calendarTextStyle={{ color: 'black' }}
                headerTextStyle={{
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '600',
                    fontSize: 20,
                }}
                weekDaysTextStyle={{
                    color: 'black',
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '700',
                    fontSize: 13,
                }}
                headerButtonsPosition="right"
                headerButtonSize={22}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        borderRadius: 30,
    }
});

export default MyCalender;
