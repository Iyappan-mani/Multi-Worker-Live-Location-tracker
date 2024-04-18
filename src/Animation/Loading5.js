//import liraries
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Animated,  Easing, Pressable } from 'react-native';

// create a component
const AnimationsView3 = () => {
    const animationEffcet = new Animated.Value(0)
    const animationEffcet1 = new Animated.Value(1)
    const animationEffcet2 = new Animated.Value(1)


    const rotateData = animationEffcet.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    
    const rotateData1 = animationEffcet1.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg","0deg"],
    });
    const rotateData2 = animationEffcet1.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg","0deg"],
    });
    const rotateData3 = animationEffcet1.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg","0deg"],
    });
    useEffect(() => {
        startImageRotateFunction()
        startImageRotateFunction1()
        startImageRotateFunction2()
        startImageRotateFunction3()
    })
    const startImageRotateFunction = () => {
        animationEffcet.setValue(0);
        Animated.timing(animationEffcet, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
         
        }).start(() => { startImageRotateFunction() });

    };
    const startImageRotateFunction1 = () => {
        animationEffcet1.setValue(0);
        Animated.timing(animationEffcet1, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction1() });

    };
    const startImageRotateFunction2 = () => {
        animationEffcet2.setValue(0);
        Animated.timing(animationEffcet2, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction2() });

    };
    const startImageRotateFunction3 = () => {
        animationEffcet2.setValue(0);
        Animated.timing(animationEffcet2, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction3() });

    };

    return (
        <View>

            <Animated.View style={[styles.container]}>
                <Animated.View style={[{ transform: [{ rotate: rotateData },] }, styles.container1]} >

                    <Animated.View style={[{ transform: [{ rotate: rotateData1 },], height: 15, width: 15, backgroundColor: "blue" },]} />

                    <View style={{ flexDirection: "row" }}>
                        <Animated.View style={[{ transform: [{ rotate: rotateData2 },], height: 15, width: 15, backgroundColor: "blue", margin: 5 },]} />
                        <Animated.View style={[{ transform: [{ rotate: rotateData3 },], height: 15, width: 15, backgroundColor: "blue", margin: 5 },]} />
                    </View>
                </Animated.View>

            </Animated.View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100

    },
    container1: {
        height: 60,
        width: 60,
        // borderStartWidth: 0.6,
        // borderStartColor: "green",
        // // borderBottomWidth:2,
        justifyContent:"center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",


    },
   
   
});

//make this component available to the app
export default AnimationsView3;
