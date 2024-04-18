//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animations from './src/screen/Animation';

// create a component
const App = () => {
    return (
     <Animations/>
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
