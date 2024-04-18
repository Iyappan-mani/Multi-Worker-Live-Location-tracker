//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import color from '../styles/color';
import { height, normalText } from '../styles/CustomFontStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
const AnimatedLoading = () => {
    useEffect(() => {
        startImageRotateFunction()

    }, [])
    let rotateValueHolder = new Animated.Value(0)

    const startImageRotateFunction = () => {
        rotateValueHolder.setValue(0);
        Animated.timing(rotateValueHolder, {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
            useNativeDriver: false,

        }).start(()=>{ startImageRotateFunction()});
       
    };
    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });

    const rotateData1 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['720deg', '0deg'],
    });
    const rotateData2 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg',],
    });
    const rotateData3 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['720deg', '0deg',],
    });
    const rotateData4 = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg',],
    });
    return (
        <View style={{ borderRadius: 10, paddingVertical: height * 0.01, }}>
            <Animated.View style={{ transform: [{ rotateZ: "45deg" }, { rotateX: rotateData3 },], height: 60, width: 60, borderRadius: 100, borderWidth: 0.9, marginTop: 17, borderColor: "red", alignItems: "center", justifyContent: "center", position: "absolute", alignSelf: "center" }} />
            <Animated.View style={{ transform: [{ rotateZ: "45deg" }, { rotateY: rotateData4 },], height: 60, width: 60, borderRadius: 100, borderWidth: 0.9, marginTop: 17, borderColor: "blue", alignItems: "center", justifyContent: "center", position: "absolute", alignSelf: "center" }} />
            <Animated.View style={{ transform: [{ rotateY: rotateData1, },], height: 60, width: 60, borderRadius: 100, borderWidth: 0.7, marginTop: 17, borderColor: color.yellow, alignItems: "center", justifyContent: "center", position: "absolute", alignSelf: "center" }} />
            <Animated.View style={{ transform: [{ rotateX: rotateData2 },], height: 60, width: 60, borderRadius: 100, borderWidth: 0.9, marginTop: 17, borderColor: color.AppColor, alignItems: "center", justifyContent: "center", position: "absolute", alignSelf: "center" }} />
            <Animated.View style={{ height: 60, width: 60, borderRadius: 100, borderWidth: 0, alignSelf: "center", marginTop: 10, borderColor: color.AppColor, alignItems: "center", justifyContent: "center" }}>
                <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
                    <MaterialCommunityIcons name='electron-framework' size={30} color={color.green} />
                </Animated.View>
            </Animated.View>
            <Text style={{ alignSelf: "center", marginTop: 5, fontSize: normalText, textAlign: 'center', marginLeft: 10 }}>Loading ...</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {


    },

});

//make this component available to the app
export default AnimatedLoading;

