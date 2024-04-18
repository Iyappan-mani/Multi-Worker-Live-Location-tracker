//import liraries
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Animated,  Easing, Pressable } from 'react-native';

// create a component
const AnimationsView4 = () => {
    const animationEffcet = new Animated.Value(0)
    const animationEffcet1 = new Animated.Value(1)
    const animationEffcet2 = new Animated.Value(1)

    const animationEffcet3 = new Animated.Value(1)
    const animationEffcet4 = new Animated.Value(1)
    const animationEffcet5 = new Animated.Value(1)


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
        startImageRotateFunction4()
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
    const startImageRotateFunction4 = () => {
        animationEffcet5.setValue(1);
        Animated.timing(animationEffcet3, {
            toValue: 1.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(()=>{  animationEffcet3.setValue(1);startImageRotateFunction5()});
    };
    const startImageRotateFunction5=()=>{
        Animated.timing(animationEffcet4, {
            toValue: 1.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(()=>{animationEffcet4.setValue(1);startImageRotateFunction6()});
        
    }
    const startImageRotateFunction6=()=>{
        
        Animated.timing(animationEffcet5, {
            toValue: 1.5,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(()=>{startImageRotateFunction4()});

    }

    return (
        <View>
            <Animated.View style={[styles.container]}>
                <Animated.View style={[{ transform: [{ rotate: rotateData },] }, styles.container1]} >

                    <Animated.View style={[{ transform: [{ scale:animationEffcet3  },{ rotate: rotateData1 }], height: 10, width: 10, backgroundColor: "blue",borderRadius:100 },]} />

                    <View style={{ flexDirection: "row" }}>
                        <Animated.View style={[{ transform: [{ scale:animationEffcet4  },{ rotate: rotateData2 },], height: 10, width: 10, backgroundColor: "green", margin: 3,borderRadius:100 },]} />
                        <Animated.View style={[{ transform: [{ scale:animationEffcet5  },{ rotate: rotateData3 },], height: 10, width: 10, backgroundColor: "red", margin: 3,borderRadius:100 },]} />
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
export default AnimationsView4;
