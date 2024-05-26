import { View, Text, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';

const Calender = ({ date, setDate, setCalenderModal, calenderModal }: any) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={calenderModal}
      style={{ zIndex: 1100 }}
      onRequestClose={() => { }}>
      <View style={styles.modalBackground}>
        <View
          style={styles.activityIndicatorWrapper}
          className="bg-white overflow-hidden">
          <View className="bg-[#822BFF]/20">
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params: any) => {
                setCalenderModal(false);
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
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    marginHorizontal: 10,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Calender;
