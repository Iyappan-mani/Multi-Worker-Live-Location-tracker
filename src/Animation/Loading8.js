//import liraries
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Pressable } from 'react-native';

// create a component
const AnimationsView6 = () => {
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
        outputRange: ["360deg", "0deg"],
    });
    const rotateData2 = animationEffcet1.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg", "0deg"],
    });
    const rotateData3 = animationEffcet1.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg", "0deg"],
    });
    useEffect(() => {
     
        startImageRotateFunction1()
      
    })
  
    const startImageRotateFunction1 = () => {
        Animated.spring(animationEffcet1, {
            bounciness:10,
            toValue:3,
            duration: 300,
            easing: Easing.sin,
            useNativeDriver: false,
        }).start(() => { animationEffcet1.setValue(1);startImageRotateFunction3() });

    };
    const startImageRotateFunction3 = () => {
       
        Animated.spring(animationEffcet2, {
            bounciness:10,
            toValue:3,
            duration: 300,
         
            easing: Easing.sin,
            useNativeDriver: false,
        }).start(() => {animationEffcet2.setValue(1); startImageRotateFunction4() });

    };
    const startImageRotateFunction4 = () => {
      
        Animated.spring(animationEffcet3, {
            bounciness:10,
            toValue:3,
            duration: 300,
         
            easing: Easing.sin,
            useNativeDriver: false,
        }).start(() => { animationEffcet3.setValue(1); startImageRotateFunction5() });
    };
    const startImageRotateFunction5 = () => {
        Animated.spring(animationEffcet4, {
            bounciness:10,
            toValue:3,
            duration: 300,
         
            easing: Easing.sin,
            useNativeDriver: false,
        }).start(() => { animationEffcet4.setValue(1); startImageRotateFunction6() });

    }
    const startImageRotateFunction6 = () => {

        Animated.spring(animationEffcet5, {
            bounciness:10,
            toValue:3,
            duration: 300,
         
            easing: Easing.sin,
            useNativeDriver: false,
        }).start(() => {animationEffcet5.setValue(1); startImageRotateFunction1() });

    }

    return (
        <View>
            <Animated.View style={[styles.container]}>
                {/* <Animated.View style={[{ transform: [{ rotate: rotateData },] }, styles.container1]} > */}
                <View style={{ flexDirection: "row" }}>
                    <Animated.View style={[{ transform: [{ scaleY: animationEffcet1 },], height: 10, width: 5, backgroundColor: "green", borderRadius:5,marginHorizontal:3},]} />
                    <Animated.View style={[{ transform: [{ scaleY: animationEffcet2 },], height: 10, width: 5, backgroundColor: "green", borderRadius:5,marginHorizontal:3 },]} />
                    <Animated.View style={[{ transform: [{ scaleY: animationEffcet3 },], height: 10, width: 5, backgroundColor: "green", borderRadius:5 ,marginHorizontal:3},]} />
                    <Animated.View style={[{ transform: [{ scaleY: animationEffcet4 },], height: 10, width: 5, backgroundColor: "green", borderRadius:5,marginHorizontal:3 },]} />
                    <Animated.View style={[{ transform: [{ scaleY: animationEffcet5 },], height: 10, width: 5, backgroundColor: "green", borderRadius:5 ,marginHorizontal:3},]} />
               
                </View>
                {/* </Animated.View> */}
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
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",


    },
});

//make this component available to the app
export default AnimationsView6;
