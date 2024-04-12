
import { Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

let widthScal = width > 600    // >600 =>tab , <300 => mobile
export const deviceType = widthScal ? "Tab" : "Mobile"
export const smallText = widthScal ? 15 : 10
export const normalText = widthScal ? 18 : 14
export const largeText = widthScal ? 25 : 18
export const iconSize = widthScal ? 30 : 25
export const mediumText = widthScal ? 20 : 15
export const labelText = widthScal ? 18 : 10

export const shadowStyle={
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius:1,
    elevation:1
}