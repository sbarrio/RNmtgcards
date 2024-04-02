import {
    Dimensions
} from 'react-native';

const window = Dimensions.get("window");
export const DeviceWidth = window.width;
export const DeviceHeight = window.height;

export class Color {

    static White = "#FFFFFF";
    static GreyishWhite = "#EFEFEF";
    static DarkerGreyishWhite = "#DFDFDF";
    static Red = "#FF0000";
    static Green = "#00FF00";
    static Blue = "#0000FF";
    static TextBlue = "#0099EE";
    static LoadingBlue = "#0044EE";
    static LightGrey = "#CDCDCD";
    static Grey = "#8C8C8C";
    static Black = "#000000";

    // Color Bubble for Cards (yes, they are the official colors ;) )
    static BubbleRed = "#d3202a";
    static BubbleGreen = "#00733d";
    static BubbleBlue = "#0e67ab";
    static BubbleWhite = "#f9faf4";
    static BubbleBlack = "#150b00";

}

export class DeviceSize {

    static smallScreenWidth = 320;
    
}