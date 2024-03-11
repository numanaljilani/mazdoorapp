import { View, Text } from 'react-native'
import React from 'react'
import { showMessage } from 'react-native-flash-message';

const FlashMesage = () => {
  return (
    showMessage({
        message: "My message title",
        description: "My message description",
        type: "success",
        backgroundColor: "purple", // background color
        color: "#606060", // text color
      })
  )
}

export default FlashMesage