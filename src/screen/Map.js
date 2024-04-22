import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, Platform, PermissionsAndroid, ToastAndroid, ActivityIndicator, TouchableOpacity, Image, Animated, Easing, StatusBar, } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import notifee from '@notifee/react-native';
import MapView, { MapCircle, MapOverlay, Marker } from 'react-native-maps';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../styles/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Map = () => {
    const netInfo = useNetInfo();
    // const [location, setLocation] = useState(null);
    const animatioBottom = useRef(new Animated.Value(200)).current
    const [ListValue, setListValue] = useState([
        { lat: "12.9219", long: "79.1325", name: "Iyappan", image: require("../images/user2.jpg") },
        { lat: "12.9219", long: "79.1325", name: "Suresh", image: require("../images/user1.jpg") },
        { lat: "12.9351", long: "79.1501", name: "Ajith", image: require("../images/user3.jpg") },
        { lat: "12.9422", long: "79.1860", name: "Santhosh", image: require("../images/user4.jpg") },
    ]);
    const watchId = useRef(null);
    const [Loading, setLoading] = useState(true);
    const [LiveButton, setLiveButton] = useState(false);

    // Enter first time only call getLocation this is return one time current location only
    useEffect(() => {
        getLocation();
    }, []);


    notifee.registerForegroundService(() => {
        return new Promise(() => {
            // Long running task...
            notifee.onBackgroundEvent((({ type, detail }) => {
                console.log('Received background event:', detail.notification.body);

                return Promise.resolve();
            }))
        });
    });

    // sart watch live location next on press end button this work three states (forground , kill , background ) ,and also work off in mobile 
    const startLocationTracking = async () => {
        await getLocation();
        getLocationUpdates();
        startForegroundService();
        setLiveButton(true)
        await AsyncStorage.setItem('Live', JSON.stringify(true));
    };

    // get current location
    const getLocation = async () => {
        const value = await AsyncStorage.getItem('Live');
        if (value == "true") setLiveButton(true)
        const hasPermission = await hasLocationPermission();
        if (!hasPermission) {
            return;
        }
        Geolocation.getCurrentPosition(
            position => {
                // setLocation(position);
                setListValue((prevMarkers) => {
                    return prevMarkers.map((marker, index) => {
                        if (index == 0) {
                            // Update the specific marker's properties
                            return { lat: position.coords.latitude, long: position.coords.longitude, name: marker.name, image: marker.image };
                        }
                        return marker;
                    });
                });
                setLoading(false)
                Animated.timing(animatioBottom, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 2000,
                    easing: Easing.linear
                }).start()
                console.log(`latitude: ${position.coords.latitude} | longitude: ${position.coords.longitude}`);
            },
            error => {
                Alert.alert(`Error getting location: ${error.message}`);
                // setLocation(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 20000,
            }
        );
    };

    // ask and check permission
    const hasLocationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };


    // this main function watch live location
    const getLocationUpdates = () => {
        watchId.current = Geolocation.watchPosition(
            position => {
                // setLocation(position);
                setListValue((prevMarkers) => {
                    return prevMarkers.map((marker, index) => {
                        if (index == 0) {
                            // Update the specific marker's properties
                            return { lat: position.coords.latitude, long: position.coords.longitude, name: marker.name, image: marker.image };
                        }
                        return marker;
                    });
                });

                console.log(position.coords.latitude, "watchPosition");
            },
            error => {
                // setLocation(null);
                console.log(`Error watching position: ${error.message}`);
            },
            {
                enableHighAccuracy: false,
                distanceFilter: 0,
                interval: 20000, // customize
                fastestInterval: 2000,
            }
        );
    };

    // notification trigger
    const startForegroundService = async () => {
        await notifee.requestPermission()
        try {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Demo Channel',
            });

            await notifee.displayNotification({
                title: 'Live Location 1',
                body: 'Location Lat Long Value Send Api',
                android: { channelId, asForegroundService: true },
            });
            await AsyncStorage.setItem('channelId', JSON.stringify(channelId));

        } catch (error) {
            console.error('Error starting foreground service:', error);
        }
    };



    // onpress end button call this function this close all live location prosess
    const stopLocationUpdates = async () => {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
        setLiveButton(false)
        let value = await AsyncStorage.getItem('channelId');
        await notifee.stopForegroundService(JSON.parse(value));
        try {
            await AsyncStorage.setItem('Live', JSON.stringify(false));
        } catch (error) {
            // Error saving data
        }
    };

    // this is update data in notification , change body text to data its update all states (if you need uncomment)

    // useEffect(() => {
    //     if (location?.coords?.latitude !== null && location?.coords?.longitude !== null) {
    //         showNotification();
    //     }
    // }, [location]);

    // const showNotification = async () => {
    //     try {
    //         await notifee.displayNotification({
    //             title: 'Live Location',
    //             body: 'Live Location send Api',
    //         });
    //     } catch (error) {
    //         console.error('Error displaying notification:', error);
    //     }
    // };

    if (netInfo?.isConnected == false)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>{JSON.stringify(netInfo?.isConnected)} "No Internet"</Text>
            </View>
        )
    else return (

        <View style={{ flex: 1 }}>

            {Loading ?
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <ActivityIndicator />
                </View>
                :
                <>
                    <View
                        style={{ flex: 1, }}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: Number(ListValue[0]?.lat),
                                longitude: Number(ListValue[0]?.long),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,

                            }}
                        >
                            <MapCircle
                                center={{
                                    latitude: Number(ListValue[0]?.lat),
                                    longitude: Number(ListValue[0]?.long),
                                }}
                                radius={50}
                                strokeWidth={0.5}
                                strokeColor="#3399ff"
                                fillColor="rgba(61, 136, 205, 0.2)"
                                lineJoin='bevel'

                            />

                            <MapCircle
                                center={{
                                    latitude: Number(ListValue[0]?.lat),
                                    longitude: Number(ListValue[0]?.long),
                                }}
                                radius={20}
                                strokeWidth={0.5}
                                strokeColor="#3399ff"
                                fillColor="rgba(61, 136, 205, 0.2)"
                                lineJoin='bevel'

                            />
                            {ListValue.map((item, index) =>

                                <Marker
                                    style={{ overflow: 'visible', height: 50, }}
                                    key={index}
                                    coordinate={{ latitude: Number(item.lat), longitude: Number(item.long) }}
                                    title={item?.name}
                                    description="Marker Description">
                                    <Image source={item?.image} style={{ height: 40, width: 40, borderRadius: 100 }} />
                                    <View style={{
                                        height: 7, width: 7, backgroundColor: "blue", opacity: 0.5, borderRadius: 100, position: "absolute", alignSelf: "center", bottom: -1
                                    }} />
                                </Marker>
                            )
                            }
                        </MapView>

                        <TouchableOpacity onPress={() => { getLocation() }} style={{ borderRadius: 100, backgroundColor: color.white, alignItems: "center", justifyContent: "center", padding: 12, position: "absolute", right: 15, bottom: "25%", borderWidth: 2, borderColor: color.white }}>
                            <MaterialIcons name='my-location' size={22} color={color.blue} />
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{ transform: [{ translateY: animatioBottom }], position: "absolute", overflow: 'hidden', height: "22%", backgroundColor: color.white, width: "100%", bottom: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: 20 }}>
                        <View style={{ height: 3, width: 25, backgroundColor: color.border, borderRadius: 10, alignSelf: "center" }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                            <Text style={{ fontSize: 18, color: "black", fontWeight: '600' }}>Live Location Traker</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 10 }}> Your Live Lat :  <Text style={{ color: color.green, fontWeight: "bold" }}>{ListValue[0].lat}</Text> and long : <Text style={{ color: color.blue, fontWeight: "bold" }}>{ListValue[0].long}</Text></Text>
                        {/* <Text style={{ fontSize: 16, color: "black", marginTop: 5 }}>Live Longitude  :  {ListValue[0].long}</Text> */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", marginTop: 15 }}>
                            {!LiveButton && <TouchableOpacity onPress={() => { startLocationTracking() }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: color.blue, height: 33, borderRadius: 20, paddingHorizontal: 10, flexDirection: "row" }}>
                                <FontAwesome name='send' size={14} color={color.white} />
                                <Text style={{ fontSize: 14, color: color.white, marginLeft: 6 }}>Start</Text>
                            </TouchableOpacity>}
                            {LiveButton && <TouchableOpacity onPress={() => { stopLocationUpdates() }} style={{ alignItems: "center", justifyContent: "center", backgroundColor: color.pink, height: 33, borderRadius: 20, paddingHorizontal: 10, flexDirection: "row" }}>
                                <FontAwesome name='stop-circle' size={14} color={color.white} />
                                <Text style={{ fontSize: 14, color: color.white, marginLeft: 6 }}>Stop</Text>
                            </TouchableOpacity>}
                        </View>
                    </Animated.View>
                    {LiveButton && <View style={{ position: 'absolute', width: 60, height: 25, backgroundColor: "red", right: 10, top: 10, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Live</Text>
                        <MaterialIcons name='location-pin' size={12} style={{ marginLeft: 4 }} color={color.white} />
                    </View>}

                </>

            }

        </View>
    );
};

export default Map;