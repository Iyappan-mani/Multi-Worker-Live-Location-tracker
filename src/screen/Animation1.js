//import liraries
import React, { useEffect, useRef, useState, } from 'react';
import { View, Text, Animated, Easing, StyleSheet, TouchableOpacity, Image, StatusBar, ImageBackground, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../styles/color';

// create a component
const Animations1 = () => {

    const [open, setopen] = useState(false);
    const animated = useRef(new Animated.Value(0)).current
    const rotate = animated.interpolate({ inputRange: [0, 2], outputRange: ['0deg', '150deg'] });
    const rotate1 = animated.interpolate({ inputRange: [0, 2], outputRange: ['0deg', '-150deg',] });
    const rotate2 = animated.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-130deg',] });
    const rotate3 = animated.interpolate({ inputRange: [0, 2], outputRange: ['0deg', '-70deg',] });
    const animate = () => {
        Animated.spring(animated, {
            toValue: 1,
            duration: 25000,
            friction: 5,
            isInteraction: true,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start(() => { })
        setopen(true)
    }
    const Reanimate = () => {
        Animated.spring(animated, {
            toValue: 0,
            duration: 25000,
            friction: 5,
            isInteraction: true,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start(() => { })
        setopen(true)
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} />
            <View style={{ position: "absolute", alignSelf: "center", alignItems: "center", bottom: 200 }}>
                <Animated.View style={[styles.item, { transform: [{ rotate: "-130deg" }, { rotate: rotate },] }]}>
                    {/* <Animated.View style={[styles.dot,]}>
                        <MaterialCommunityIcons name='currency-ils' size={20} color={color.white} />
                    </Animated.View> */}
                    <ImageBackground source={require("../images/Box.png")} tintColor={"red"} style={{ height: 120, width: 120, alignItems: "center", }}>
                        <MaterialCommunityIcons name='currency-ils' size={20} color={color.white} style={{ marginTop: "25%" }} />
                    </ImageBackground>
                </Animated.View>
                <Animated.View style={[styles.item1, { transform: [{ rotate: "130deg" }, { rotate: rotate1 },] }, {}]}>
                    {/* <Animated.View style={[styles.dot1, { backgroundColor: "green" }]}>
                        <MaterialCommunityIcons name='account' size={20} color={color.white} />
                    </Animated.View> */}
                    <ImageBackground source={require("../images/Box.png")} tintColor={"green"} style={{ height: 120, width: 120, alignItems: "center", }}>
                        <MaterialCommunityIcons name='account' size={20} color={color.white} style={{ marginTop: "25%" }} />
                    </ImageBackground>
                </Animated.View>
                <Animated.View style={[styles.item2, { transform: [{ rotate: "130deg" }, { rotate: rotate2 },] }, {}]}>
                    {/* <Animated.View style={[styles.dot1, { backgroundColor: 'blue', }]}>
                        <MaterialCommunityIcons name='electron-framework' size={30} color={color.white} />
                    </Animated.View> */}
                    <ImageBackground source={require("../images/Box.png")} tintColor={"blue"} style={{ height: 120, width: 120, alignItems: "center", }}>
                        <MaterialCommunityIcons name='electron-framework' size={30} color={color.white} style={{ marginTop: "25%" }} />
                    </ImageBackground>
                </Animated.View>
            </View>

            <View style={{ height: 55, width: "100%", backgroundColor: color.lightGray, position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "space-around" }}>
                <View style={{ height: "100%", width: 100, alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name='home' size={20} color={color.black} />
                    <Text style={{ color: color.black, fontWeight: "600", marginTop: 5 }}>Home Page</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (open == false) {
                        animate()
                    } else {
                        Reanimate()
                        setopen(false)
                    }
                }} style={{ transform: [{ rotate: "45deg" }], height: 60, width: 60, backgroundColor: "orange", borderRadius: 5, marginTop: -30, alignItems: "center", justifyContent: "center", }}>
                    <Animated.View style={{ transform: [{ rotate: "45deg" }, { rotate: rotate3 }] }}>
                        <MaterialCommunityIcons name='plus' size={30} color={color.white} />
                    </Animated.View>
                </TouchableOpacity>
                <View style={{ height: "100%", width: 100, alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name='view-list' size={20} color={color.black} />
                    <Text style={{ color: color.black, fontWeight: "600", marginTop: 5 }}>List of Users</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    item: {
        position: 'absolute',
        width: 100,
        height: 300,
        alignItems: "center",


    },
    item1: {
        position: 'absolute',
        width: 100,
        height: 300, // this is the diameter of circle
        alignItems: "center",


    },
    item2: {
        position: 'absolute',
        width: 100,
        height: 300, // this is the diameter of circle
        alignItems: "center",

    },
    dot: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot1: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});

//make this component available to the app
export default Animations1;
