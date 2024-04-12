//import liraries
import React, { useEffect, useRef, } from 'react';
import { View, Text, Animated, Easing, StyleSheet, TouchableOpacity, Image, } from 'react-native';

// create a component
const Animations = () => {

    const animated = new Animated.Value(0);

    const rotate = animated.interpolate({ inputRange: [0, 2], outputRange: ['0deg', '90deg'] });
    const rotate1 = animated.interpolate({ inputRange: [0, 2], outputRange: ['0deg', '-90deg',] });
    const rotate2 = animated.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-90deg',] });
    useEffect(() => {
        animate()
    }, [])
    const animate = () => {
        Animated.spring(animated, {
            toValue: 1,
            duration: 15000,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start()

    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.item, , { transform: [{ rotate: "-90deg" }, { rotate: rotate },] }]}>
                <Animated.View style={[styles.dot,]}>
                    <Text style={styles.text}>Test</Text>
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.item1, { transform: [{ rotate: "90deg" }, { rotate: rotate1 },] }, {}]}>
                <Animated.View style={[styles.dot1,]}>
                    <Text style={styles.text}>Test</Text>
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.item1, { transform: [{ rotate: "90deg" }, { rotate: rotate2 },] }, {}]}>
                <Animated.View style={[styles.dot1, { backgroundColor: 'blue', }]}>
                    <Text style={styles.text}>Test</Text>
                </Animated.View>
            </Animated.View>
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
        height: 350, // this is the diameter of circle
    },
    item1: {
        position: 'absolute',
        width: 100,
        height: 350, // this is the diameter of circle
    },
    dot: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot1: {
        width: 80,
        height: 80,
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
export default Animations;
