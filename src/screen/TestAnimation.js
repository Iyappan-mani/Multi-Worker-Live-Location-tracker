//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import AnimatedLoading from '../Animation/Loading1';
import AnimationsView from '../Animation/Loading2';
import AnimationsView1 from '../Animation/Loading3';
import AnimationsView2 from '../Animation/Loading4';
import AnimationsView3 from '../Animation/Loading5';
import AnimationsView4 from '../Animation/Loading6';
import AnimationsView6 from '../Animation/Loading8';
import AnimationsView5 from '../Animation/Loading7';
import AnimationsView7 from '../Animation/Loading9';


// create a component
const TestAnimation
 = () => {
    return (
        <View style={styles.container}>
            <StatusBar  backgroundColor={"white"}/>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimatedLoading />
            </View>

            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView1 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView2 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView3 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView4 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
            <AnimationsView6 />
            </View>

            <View style={{ width: "30%", height: 100, margin: 10 }}>
            <AnimationsView5 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>
                <AnimationsView7 />
            </View>
            <View style={{ width: "30%", height: 100, margin: 10 }}>

            </View>




        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
        marginTop:50


    },
});

//make this component available to the app
export default TestAnimation
;
