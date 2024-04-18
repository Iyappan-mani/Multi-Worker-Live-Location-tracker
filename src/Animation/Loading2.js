//import liraries
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing, Pressable } from 'react-native';

// create a component
const AnimationsView = () => {
    const [Count, setCount] = useState(2);
    const rotatevalue = new Animated.Value(0)
    const rotatevalue1 = new Animated.Value(0)

    const rotateData = rotatevalue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "720deg"],
    });
    const rotateData1 = rotatevalue1.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg","720deg"],
    });

    const [counter, setCounter] = useState(1);
    const MAX_DOTS = 3;

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCounter((counter % MAX_DOTS) + 1);
        }, 750);
        return () => clearInterval(intervalID);
    }, [counter]);

    const dots = '.'.repeat(counter);
    const spaces = ' '.repeat(MAX_DOTS - counter);
    useEffect(() => {
        startImageRotate()
        startImageRotate1()
    })
    const startImageRotate = () => {
        rotatevalue.setValue(0);
        Animated.timing(rotatevalue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,

        }).start(() => { startImageRotate() });
    };
    const startImageRotate1 = () => {
        rotatevalue1.setValue(0);
        Animated.timing(rotatevalue1, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,

        }).start(() => { startImageRotate1() });
    };



    return (
        <View>

            <Animated.View onPressIn={() => { setCount(Count + 1) }} style={[{ transform: [{ rotateX: rotateData },] }, styles.container]} />
            <Animated.View onPressIn={() => { setCount(Count + 1) }} style={[{ transform: [{ rotateY: rotateData1 },] }, styles.container1]} >
            </Animated.View>
            <View style={{flexDirection: 'row',marginTop: 12,alignSelf: "center"}}>
                <Text>Loading</Text>
                <Text>{dots + spaces}</Text>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container1: {
        height: 52,
        width: 52,
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 100,
        borderColor: "red"

    },
    container: {
        height: 50, width: 50,
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 100,
        position: "absolute",
        borderColor: "blue"

    },
});

//make this component available to the app
export default AnimationsView;
