import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Color, DeviceWidth, DeviceSize } from '../style/Common';



const ColorBubble = (props) => {

  colorStyle = function(color) {

    switch(color) {
        case "Red" : return {backgroundColor: Color.BubbleRed};
        case "Green" : return {backgroundColor: Color.BubbleGreen};
        case "Blue" : return {backgroundColor: Color.BubbleBlue};
        case "White" : return {backgroundColor: Color.BubbleWhite};
        case "Black" : return {backgroundColor: Color.BubbleBlack};
        default: return {backgroundColor: Color.TextBlue};
    }
    
  } 
  
  return (
    <View style={[styles.container, this.colorStyle(props.color)]}></View>
  );
}

export default ColorBubble;

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({

    container : {
        width: DeviceWidth <= DeviceSize.smallScreenWidth ? 15 : 20,
        height: DeviceWidth <= DeviceSize.smallScreenWidth ? 15 : 20,
        borderRadius : DeviceWidth <= DeviceSize.smallScreenWidth ? 15 : 20,
        backgroundColor : Color.Red,
        borderWidth : 1,
        borderColor : Color.LightGrey,
        marginRight: 5,
    }
})
