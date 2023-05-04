import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 999,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#123456'
  },
  listView: {
    backgroundColor: 'white',
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    backgroundColor: '#e4e4e4',
    height: 1,
  },
  map: {
    flex: 1,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 20
  },
});

const GooglePlacesInput = () => {

  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [coordinatesLoading, setCoordinatesLoading] = useState(false);
  const ref = useRef();

  const [origin, setOrigin] = useState({
    latitude: 25.672577,
    longitude: -108.242637,
  });

  const [destination, setDestination] = useState({
    latitude: 25.702571,
    longitude: -108.313530,
  });

  const handleOriginSelect = (data, details) => {
    setOrigin({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleDestinationSelect = (data, details) => {
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  return (
    <View style={{flex: 1,backgroundColor: '#123456'}}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Selecciona el Origen"
          fetchDetails={true}
          onPress={handleOriginSelect}
          query={{
            key: 'Tu_key_de_Google_api',
            language: 'en',
          }}
          styles={{
            listView: styles.listView,
          }}
          renderRow={(rowData) => (
            <View style={styles.row}>
              <Text>{rowData.description}</Text>
            </View>
          )}
          renderSeparator={() => <View style={styles.separator} />}
        />
         <GooglePlacesAutocomplete
          placeholder="Selecciona el Destino"
          fetchDetails={true}
          onPress={handleDestinationSelect}
          query={{
            key: 'Tu_key_de_Google_api',
            language: 'en',
          }}
          styles={{
            listView: styles.listView,
          }}
          renderRow={(rowData) => (
            <View style={styles.row}>
              <Text>{rowData.description}</Text>
            </View>
          )}
          renderSeparator={() => <View style={styles.separator} />}
        />

<MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          longitudeDelta: 0.04,
          latitudeDelta: 0.09,
        }}
      >

        <Marker
          draggable={true}
          coordinate={origin}
          onDragEnd={(direction) =>
            setOrigin(direction.nativeEvent.coordinate)
          }
        />
        <Marker
          draggable={true}
          coordinate={destination}
          onDragEnd={(direction) =>
            setDestination(direction.nativeEvent.coordinate)
          }
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey='Tu_key_de_Google_api'
          strokeColor='#008db9'
          strokeWidth={5}
        />
      </MapView>
      </View>
    </View>
  );
};

export default GooglePlacesInput;
