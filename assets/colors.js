import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();


export const getfontSize = (width, number, widthPhone, sizePhone ) => {
    if(isTablet){
        return width/number
    }else{
        return widthPhone/sizePhone
    }
}

export const getIconSize = (width, number,  widthPhone, sizePhone ) => {
    if(isTablet){
        return width/number
    }else{
        return widthPhone/sizePhone
    }
}

export const getHeight = (width, number, widthPhone, sizePhone ) => {
    if(isTablet){
        return width/number
    }else{
        return widthPhone/sizePhone
    }
}

export const getWidth = (width, number,  widthPhone, sizePhone ) => {
    if(isTablet){
        return width/number
    }else{
        return widthPhone/sizePhone
    }
}


export default colors = {
    bgPublic:'#FFA726',
    bgPrivate:"#FFC26C",
    bgOrange:"#F24E1E",
    subTitle: "#97592B",
    titlePublic: "white",
    titlePrivate: 'black',
    MarronDark: '#5A1C00',
}
