//import liraries
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing, Pressable } from 'react-native';
const heightVal = 8

// create a component
const AnimationsView2 = () => {

    const [Count, setCount] = useState(2);
    const animationEffcet = new Animated.Value(0)
    const animationEffcet1 = new Animated.Value(1)
    const animationEffcet2 = new Animated.Value(1)
    const animationEffcet3 = new Animated.Value(1)
    const animationEffcet4 = new Animated.Value(1)
    const animationEffcet5 = new Animated.Value(1)
    const animationEffcet6 = new Animated.Value(1)

    const rotateData = animationEffcet.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    useEffect(() => {
        startImageRotateFunction()
        startImageRotateFunction1()

    })
    const startImageRotateFunction = () => {
        animationEffcet.setValue(0);
        Animated.timing(animationEffcet, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
            bounciness: 10
        }).start(() => { startImageRotateFunction() });

    };
    const startImageRotateFunction1 = () => {
        Animated.timing(animationEffcet1, {
            toValue: -5,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet2, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet3, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet4, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet5, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet6, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        Animated.timing(animationEffcet1, {
            toValue: 1,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction2() });

    };
    const startImageRotateFunction2 = () => {
        // animationEffcet2.setValue(0);
        Animated.timing(animationEffcet2, {
            toValue: 3,
            duration: 50,
            easing: Easing.linear,
            useNativeDriver: false,



        }).start(() => { startImageRotateFunction3() });

    };
    const startImageRotateFunction3 = () => {
        // animationEffcet3.setValue(0);
        Animated.timing(animationEffcet3, {
            toValue: 5,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,



        }).start(() => { startImageRotateFunction4() });

    };
    const startImageRotateFunction4 = () => {
        // animationEffcet4.setValue(0);
        Animated.timing(animationEffcet4, {
            toValue: 7,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,


        }).start(() => { startImageRotateFunction5() });

    };
    const startImageRotateFunction5 = () => {
        // animationEffcet4.setValue(0);
        Animated.timing(animationEffcet5, {
            toValue: 9,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction6() });

    };
    const startImageRotateFunction6 = () => {
        // animationEffcet4.setValue(0);
        Animated.timing(animationEffcet6, {
            toValue: 13,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => { startImageRotateFunction1() });

    };

    return (
        <View>

            <Animated.View style={[styles.container]}>
                <Animated.View style={[{ transform: [{ rotate: rotateData },] }, styles.container1]} >

          
                <Animated.View style={[{ transform: [{ scale: animationEffcet1 },] }, styles.container2]} />
                <Animated.View style={[{ transform: [{ scale: animationEffcet2 },] }, styles.container3]} />
                <Animated.View style={[{ transform: [{ scale: animationEffcet3 },] }, styles.container4]} />
                <Animated.View style={[{ transform: [{ scale: animationEffcet4 },] }, styles.container5]} />
                <Animated.View style={[{ transform: [{ scale: animationEffcet5 },] }, styles.container6]} />
                <Animated.View style={[{ transform: [{ scale: animationEffcet6 },] }, styles.container7]} />
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
        borderStartWidth: 0.3,
        borderStartColor: "green",
        // borderBottomWidth:2,
        // borderEndColor: "blue",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        // borderBottomColor:"green"


    },
    container2: {
        height: heightVal-2,
        width: heightVal-2,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
    },
    container3: {
        height: heightVal,
        width: heightVal,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        opacity: 0.3
    },
    container4: {
        height: heightVal,
        width: heightVal,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        opacity: 0.2
    },
    container5: {
        height: heightVal,
        width: heightVal,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        opacity: 0.1
    },
    container6: {
        height: heightVal,
        width: heightVal,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        opacity: 0.05
    },
    container7: {
        height: heightVal,
        width: heightVal,
        backgroundColor: "green",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        opacity: 0.05
    },
});

//make this component available to the app
export default AnimationsView2;
