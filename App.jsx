import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, Platform, PermissionsAndroid, ToastAndroid, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import notifee from '@notifee/react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const netInfo = useNetInfo();
    // const [location, setLocation] = useState(null);
    const [ListValue, setListValue] = useState([
        { lat: "12.9219", long: "79.1325", name: "Iyappan" },
        { lat: "12.9219", long: "79.1325", name: "Suresh" },
        { lat: "12.9351", long: "79.1501", name: "Ajith" },
        { lat: "12.9422", long: "79.1860", name: "Santhosh" },
    ]);
    const watchId = useRef(null);
    const [Loading, setLoading] = useState(true);
    const [LiveButton, setLiveButton] = useState(false);

    notifee.registerForegroundService(() => {
        return new Promise(() => {
            // Long running task...
            notifee.onBackgroundEvent((({ type, detail }) => {
                console.log('Received background event:', detail.notification.body);

                return Promise.resolve();
            }))
        });
    });


    useEffect(() => {


        getLocation();


    }, []);

    const startLocationTracking = async () => {
        await getLocation();
        getLocationUpdates();
        startForegroundService();
        setLiveButton(true)

        await AsyncStorage.setItem('Live', JSON.stringify(true));


    };




    const hasLocationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

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
                            return { lat: position.coords.latitude, long: position.coords.longitude, name: marker.name };
                        }
                        return marker;
                    });
                });
                setLoading(false)
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

    const getLocationUpdates = () => {
        watchId.current = Geolocation.watchPosition(
            position => {
                // setLocation(position);
                setListValue((prevMarkers) => {
                    return prevMarkers.map((marker, index) => {
                        if (index == 0) {
                            // Update the specific marker's properties
                            return { lat: position.coords.latitude, long: position.coords.longitude, name: marker.name };
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
                interval: 20000,
                fastestInterval: 2000,
            }
        );
    };

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
                                latitudeDelta: 1.0922,
                                longitudeDelta: 1.0421,

                            }}
                        >
                            {ListValue.map((item, index) =>

                                <Marker

                                    key={index}
                                    coordinate={{ latitude: Number(item.lat), longitude: Number(item.long) }}
                                    title={item?.name}
                                    description="Marker Description"


                                />
                            )
                            }
                        </MapView>
                    </View>
                    <View style={{ position: "absolute", borderWidth: 1, borderColor: "#CAD6DA", overflow: 'hidden', height: "25%", backgroundColor: "rgba(0,0,0, 0.6)", width: "100%", bottom: 0, borderTopRightRadius: 25, borderTopLeftRadius: 25, padding: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 18, color: "white", fontWeight: '600' }}>Live Location Traker</Text>
                            <TouchableOpacity onPress={() => { getLocation() }} style={{ borderRadius: 100, backgroundColor: "#CAD6DA", alignItems: "center", justifyContent: "center", padding: 10 }}>
                                <Image source={require("./src/images/gps.png")} style={{ height: 20, width: 20, resizeMode: "cover" }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16, color: "white", marginTop: 10 }}>Live Latitude     :  {ListValue[0].lat}</Text>
                        <Text style={{ fontSize: 16, color: "white", marginTop: 5 }}>Live Longitude  :  {ListValue[0].long}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                            {!LiveButton && <TouchableOpacity onPress={() => { startLocationTracking() }} style={{ alignItems: "center", justifyContent: "center", width: "100%", backgroundColor: "#CAD6DA", height: 35, borderRadius: 5, }}>
                                <Text style={{ fontSize: 16, color: "black", }}>Start</Text>
                            </TouchableOpacity>}
                            {LiveButton && <TouchableOpacity onPress={() => { stopLocationUpdates() }} style={{ alignItems: "center", justifyContent: "center", width: "100%", backgroundColor: "#CAA8DA", height: 35, borderRadius: 5 }}>
                                <Text style={{ fontSize: 16, color: "black", }}>End</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                    {LiveButton && <View style={{ position: 'absolute', width: 60, height: 25, backgroundColor: "red", right: 10, top: 10, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Live</Text>
                        <View style={{ height: 6, width: 6, backgroundColor: "white", borderRadius: 100, marginLeft: 5 }} />
                    </View>}

                </>

            }

        </View>
    );
};

export default App;