
    const [forceLocation, setForceLocation] = useState(true);
    const [highAccuracy, setHighAccuracy] = useState(true);
    const [locationDialog, setLocationDialog] = useState(true);
    const [significantChanges, setSignificantChanges] = useState(false);
    const [observing, setObserving] = useState(false);
    const [useLocationManager, setUseLocationManager] = useState(false);
    const [location, setLocation] = useState(null);


const watchId = useRef(null);

const stopLocationUpdates = () => {
    if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
        setObserving(false);
    }
};

useEffect(() => {
    return () => {
        stopLocationUpdates();
    };
}, []);

const hasPermissionIOS = async () => {
    const openSetting = () => {
        Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
        });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
        return true;
    }

    if (status === 'denied') {
        Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
        Alert.alert(
            `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
            '',
            [
                { text: 'Go to Settings', onPress: openSetting },
                { text: "Don't Use Location", onPress: () => { } },
            ],
        );
    }

    return false;
};

const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
        );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
        );
    }

    return false;
};

const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
        return;
    }
    Geolocation.getCurrentPosition(
        position => {
            setLocation(position);
            // console.log(`latitude : ${position.coords.latitude} | longitude : ${position.coords.longitude}`);
        },
        error => {
            Alert.alert(`Code ${error.code}`, error.message);
            setLocation(null);
            // console.log(error);
        },
        {
            accuracy: {
                android: 'high',
                ios: 'best',
            },
            enableHighAccuracy: highAccuracy,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: forceLocation,
            forceLocationManager: useLocationManager,
            showLocationDialog: locationDialog,
        },
    );
};
const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
        return;
    }
    setObserving(true);
    watchId.current = Geolocation.watchPosition(
        position => {
            setLocation(position);
            // console.log(`latitude : ${position.coords.latitude} | longitude : ${position.coords.longitude}`);
        },
        error => {
            setLocation(null);
            console.log(error);
        },
        {
            accuracy: {
                android: 'high',
                ios: 'best',
            },
            enableHighAccuracy: highAccuracy,
            distanceFilter: 0,
            interval: 5000,
            fastestInterval: 2000,
            forceRequestLocation: forceLocation,
            forceLocationManager: useLocationManager,
            showLocationDialog: locationDialog,
            useSignificantChanges: significantChanges,
        },
    );
};

useEffect(() => {
    const startLocationTracking = async () => {
        await getLocation();
        getLocationUpdates();
    };
    startLocationTracking();
    return () => {
        stopLocationUpdates();
    };
}, []);

notifee.registerForegroundService(() => {
    return new Promise(() => {
        // Long running task...
        notifee.onBackgroundEvent((({ type, detail }) => {
            console.log('Received background event:', detail.notification.body );
            
            return Promise.resolve();
        }))
    });
});

const showNotification = async () => {
    try {
        await notifee.displayNotification({
            title: 'Lokasi Anda',
            body: `Latitude: ${location?.coords?.latitude || 'kosong'}, Longitude: ${location?.coords?.longitude || 'kosong'}`,

        });
    } catch (error) {
        console.error('Error displaying notification:', error);
    }
};

useEffect(() => {
    const startLocationTracking = async () => {
        await getLocation();
        getLocationUpdates();
    };

    const startForegroundService = async () => {
        try {
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            await notifee.displayNotification({
                title: 'Aplikasi Berjalan',
                body: `Latitude: ${location?.coords?.latitude || ''}, Longitude: ${location?.coords?.longitude || ''}`,
                android: { channelId, asForegroundService: true },
            });
        } catch (error) {
            console.error('Error starting foreground service:', error);
        }
    };

    startLocationTracking();
    startForegroundService();

    return () => {
        stopLocationUpdates();
    };
}, []);

useEffect(() => {
    if (location?.coords?.latitude || location?.coords?.longitude !== null) {
        showNotification();
    }
}, [location]);
return (
    <View >
        <Text style={{ color: 'black' }}>Latitude: {location?.coords?.latitude || 'kosong'}</Text>
        <Text style={{ color: 'black' }}>Longitude: {location?.coords?.longitude || 'kosong'}</Text>

    </View>
);