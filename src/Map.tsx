import MapView, { Marker, Callout } from 'react-native-maps';
import React,{useRef, useEffect} from "react"
import { StyleSheet, View, Text } from 'react-native';
import { Branch, branchAddress } from './Branch';

type Prop = {
  closest: Branch[] | undefined;
};


export default function Map({ closest }: { closest: Branch[] | undefined })
{
  const mapRef = useRef();
  useEffect(() =>
  {
    if (mapRef.current) {

      mapRef.current.fitToSuppliedMarkers(
        closest?.map(({ Identification }) => Identification),
      );
    }
  },[closest])


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 55.77,
          latitudeDelta: 11.03,
          longitude: -2.82,
          longitudeDelta: 11.35,
        }}
        zoomEnabled={true}
        showsScale={true}>
        {closest?.map(
          (closestBranch, idx) =>
            closestBranch &&
            closestBranch.PostalAddress.GeoLocation && (
              <Marker
                key={closestBranch.Identification}
                identifier={closestBranch.Identification}
                title={closestBranch.Name}
                description={branchAddress(closestBranch)}
                coordinate={{
                  latitude: parseFloat(
                    closestBranch.PostalAddress.GeoLocation
                      .GeographicCoordinates.Latitude,
                  ),
                  longitude: parseFloat(
                    closestBranch.PostalAddress.GeoLocation
                      .GeographicCoordinates.Longitude,
                  ),
                }}>
                <Callout tooltip>
                  <View style={styles.callout}>
                    <Text style={styles.calloutHeader}>
                      {closestBranch.Name || closestBranch.Identification}
                    </Text>
                    <Text style={styles.calloutText}>
                      {branchAddress(closestBranch)}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ),
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: StyleSheet.absoluteFillObject,
  callout: {
    padding: 5,
    backgroundColor: '#ffffffa0',
    borderRadius: 4,
  },
  calloutHeader: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
  },
  calloutText: {
   // fontFamily: 'textRegular',
    color: 'black',
    fontSize: 10,
  },
});
