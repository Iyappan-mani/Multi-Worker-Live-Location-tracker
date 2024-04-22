//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Animations from './src/screen/Animation';
import Animations1 from './src/screen/Animation1';
import TestAnimation from './src/screen/TestAnimation';
import Map from './src/screen/Map';
import color from './src/styles/color';

// create a component
const App = () => {
    return (
        <>
            <StatusBar backgroundColor={color.white} hidden />
            <Map />
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

//make this component available to the app
export default App;
